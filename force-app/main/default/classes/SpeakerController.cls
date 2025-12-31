public with sharing class SpeakerController {

    @AuraEnabled(cacheable=true)
    public static List<Speaker__c> getSpeakers(String nameKey, String speciality) {

        String query = 'SELECT Id, Name, Email__c, Bio__c, Speciality__c FROM Speaker__c WHERE Id != null';

        if(String.isNotBlank(nameKey)){
            query += ' AND Name LIKE \'%' + String.escapeSingleQuotes(nameKey) + '%\'';
        }

        if(String.isNotBlank(speciality)){
            query += ' AND Speciality__c = \'' + String.escapeSingleQuotes(speciality) + '\'';
        }

        query += ' ORDER BY Name';

        return Database.query(query);
    }
}
