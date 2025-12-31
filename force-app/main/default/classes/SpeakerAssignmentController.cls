public with sharing class SpeakerAssignmentController {

    // Check if speaker is available on a given date
    @AuraEnabled(cacheable=true)
    public static Boolean checkAvailability(Id speakerId, Date sessionDate) {
        List<Speaker_Assignment__c> assignments = [
            SELECT Id, Session__r.Session_Date__c
            FROM Speaker_Assignment__c
            WHERE Speaker__c = :speakerId
              AND Session__r.Session_Date__c = :sessionDate
        ];
        return assignments.isEmpty();
    }

    // Create a new Speaker_Assignment__c record
    @AuraEnabled
    public static void createAssignment(Id speakerId, Date sessionDate) {
        // Find any existing sessions for the date
        List<Session__c> sessions = [
            SELECT Id
            FROM Session__c
            WHERE Session_Date__c = :sessionDate
            LIMIT 1
        ];
        if (sessions.isEmpty()) {
            throw new AuraHandledException('No session available on this date.');
        }

        Speaker_Assignment__c sa = new Speaker_Assignment__c(
            Speaker__c = speakerId,
            Session__c = sessions[0].Id
        );
        insert sa;
    }
}
