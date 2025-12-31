import { LightningElement, track } from 'lwc';
import getSpeakers from '@salesforce/apex/SpeakerController.getSpeakers';

export default class SpeakerSearch extends LightningElement {

    @track speakers = [];
    nameKey = '';
    speciality = '';

    specialityOptions = [
        { label: 'Apex', value: 'Apex' },
        { label: 'LWC', value: 'LWC' },
        { label: 'Integrations', value: 'Integrations' },
        { label: 'Architecture', value: 'Architecture' }
    ];

    handleNameChange(event) {
        this.nameKey = event.target.value;
        this.searchSpeakers();
    }

    handleSpecialityChange(event) {
        this.speciality = event.detail.value;
        this.searchSpeakers();
    }

    searchSpeakers() {
        getSpeakers({
            nameKey: this.nameKey,
            speciality: this.speciality
        })
        .then(result => {
            this.speakers = result;
        })
        .catch(error => {
            console.error(error);
        });
    }

    handleSpeakerSelect(event) {
        const selectedSpeaker = event.detail;
        // Fire a global custom event for bookSession to listen
        const speakerEvent = new CustomEvent('speakerselected', { detail: selectedSpeaker });
        this.dispatchEvent(speakerEvent);
    }
}
