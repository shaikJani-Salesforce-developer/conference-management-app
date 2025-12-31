import { LightningElement, wire, track } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import SPEAKER_SELECTED from '@salesforce/messageChannel/SpeakerSelected__c';
import checkAvailability from '@salesforce/apex/SpeakerAssignmentController.checkAvailability';
import createAssignment from '@salesforce/apex/SpeakerAssignmentController.createAssignment';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class BookSession extends LightningElement {

    @track speaker;
    @track selectedDate;
    @track canBook = false;
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            SPEAKER_SELECTED,
            (message) => {
                this.speaker = message.speaker;
                this.selectedDate = null;
                this.canBook = false;
            }
        );
    }

    get isButtonDisabled() {
        return !this.canBook;
    }

    handleDateChange(event) {
        this.selectedDate = event.target.value;
        if (!this.selectedDate) return;

        checkAvailability({
            speakerId: this.speaker.Id,
            sessionDate: this.selectedDate
        })
        .then(result => {
            this.canBook = result;

            if (!result) {
                this.showToast(
                    'Error',
                    'Slot is already booked, try another date',
                    'error'
                );
            }
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
    }

    createAssignment() {
        createAssignment({
            speakerId: this.speaker.Id,
            sessionDate: this.selectedDate
        })
        .then(() => {
            this.showToast(
                'Success',
                'Session assigned successfully',
                'success'
            );
            this.selectedDate = null;
            this.canBook = false;
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({ title, message, variant })
        );
    }
}
