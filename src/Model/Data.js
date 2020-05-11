import Event from './Event';

export default class DataModel {
    constructor() {
        const state = [];
        
        this.getAllTicketsEvent = new Event();
        this.addTicketEvent = new Event();
        this.updateTicketEvent = new Event();
        this.deleteTicketEvent = new Event();
        this.ticketStatusUpdateEvent = new Event();
    }

    async getAllTickets() {
        const response = await fetch('https://ticket-server-test.herokuapp.com/tickets', {
            method: 'GET',
        });

        const result = await response.json();
        this.getAllTicketsEvent.notify(result);
    }


}
