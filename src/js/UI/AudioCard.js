export default class AudioCard {
    constructor(content) {
        this.content = content;
    }

    cardHTML() {
        return `
        <div class="timeline-card ${this.content.category}">
            <div class="time">${this.content.date}</div>
            <div class="card-audio">
                <audio controls="controls" src=${this.content.data}></audio>
            </div>
            <div class="geolocation">
                <span>${this.content.coords}</span>
                <i class="material-icons">
                    pin_drop
                </i>
            </div>
        </div>`;
    }
}
