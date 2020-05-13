import Event from './Event';

export default class DataModel {
    constructor() {
        this.addCardEvent = new Event();
    }

    addCard(content) {
        this.addCardEvent.notify(content);
    }
}
