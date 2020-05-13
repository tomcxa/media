export default class TextCard {
    constructor(content) {
        this.content = content;
    }

    cardHTML() {
        return `
        <div class="timeline-card ${this.content.category}">
            <div class="time">${this.content.date}</div>
            <div class="card-text">
                <p>${this.content.data}</p>
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
