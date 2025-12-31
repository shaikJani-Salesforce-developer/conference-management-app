import { LightningElement, api, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SPEAKER_SELECTED from '@salesforce/messageChannel/SpeakerSelected__c';

export default class SpeakerList extends LightningElement {

    @api speakers = [];

    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email__c' },
        { label: 'Speciality', fieldName: 'Speciality__c' },
        {
            type: 'button',
            typeAttributes: {
                label: 'Book Session',
                name: 'book',
                variant: 'brand'
            }
        }
    ];

    @wire(MessageContext)
    messageContext;

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'book') {
            publish(this.messageContext, SPEAKER_SELECTED, {
                speaker: row
            });
        }
    }
}
