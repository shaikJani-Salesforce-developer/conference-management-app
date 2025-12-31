trigger SpeakerAssignmentTrigger on Speaker_Assignment__c (before insert,before update) {
    /*Logic:
When a Speaker is assigned to a Session, check all other sessions they are assigned to
for that same day.
If the new session's time slot overlaps with an existing assignment, return an error:
"Speaker is already booked for this time.*/
    
    if(Trigger.isBefore && (Trigger.isInsert || Trigger.isUpdate)){
        //collect parent speakerIds and load into set collection
        //collect parent sessionIds and load into set collection
        set<id> speakerIds = new set<id>();
        set<id> sessionIds = new set<id>();
        for(Speaker_Assignment__c sa :Trigger.new){
            if(sa.speaker__c !=null && sa.Session__c !=null){
                speakerIds.add(sa.Speaker__c);
                sessionIds.add(sa.Session__c);
            }
        }
        
        //Fetch session details for new assignments
        Map<id,Session__c> sessionsMap = new Map<id,Session__c>([select id,Session_Date__c,Start_time__c,End_time__c
                                                                  from Session__c where Id IN:sessionIds]);
        
        // Fetch existing assignments for those speakers
         
        list<Speaker_Assignment__c> existingAssignments = new list<Speaker_Assignment__c>([
                           select id,Speaker__c,Session__r.Session_Date__c,Session__r.Start_Time__c,
                         Session__r.End_Time__c from Speaker_Assignment__c  where Speaker__c IN :speakerIds]);
        
        //Compare new assignments with existing ones
        for(Speaker_Assignment__c newSa :trigger.new){
          Session__c  newSession  = sessionsMap.get(newSa.Session__c);
         
            for(Speaker_Assignment__c oldSa :existingAssignments){
                // Check only same speaker and different records
                if(newSa.Speaker__c == oldSa.Speaker__c && newSa.Id !=oldSa.id){
                    //Check if the session date is the same
                    if(newSession.Session_Date__c == oldSa.session__r.Session_Date__c){
                        //check if time overlap
                        if(newSession.Start_Time__c < oldSa.Session__r.End_Time__c && oldSa.Session__r.Start_Time__c < newSession.End_Time__c){
                            newSa.addError('Speaker is already booked for this time.');
                        }
                    }
                }
            }
        }
        
       }
         
    }