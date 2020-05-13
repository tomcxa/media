export default class VideoCard {
    constructor(content) {
        this.content = content;
    }

    cardHTML() {
        return `
        <div class="timeline-card ${this.content.category}">
            <div class="time">${this.content.date}</div>
            <div class="card-audio">
                <video controls="controls" src=${this.content.data}></video>
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
