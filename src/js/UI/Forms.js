/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
export default class Forms {
    constructor(initiatorType) {
        this.initiatorType = initiatorType;
    }

    destroy() {
        this.removeListener();
        this.formBoxEl.remove();
    }

    addListener(handler) {
        this.handler = handler;
        this.formBoxEl.addEventListener('click', this.handler);
    }

    removeListener() {
        this.formBoxEl.removeEventListener('click', this.handler);
    }

    bindToDOM() {
        if (this.container) {
            this.container.insertAdjacentHTML('beforeend', this._createFormHTML());
        }
    }

    get formBoxEl() {
        return this.container.querySelector('.form-box');
    }

    _createFormHTML() {
        return `
        <div class="form-box">
            <form class="modal-form">
                <h2>Что-то пошло не так!</h2>
                <div class="button-container">
                    <button
                        class="button button-with-text"
                        data-type-btn="save">
                    Подтвердить</button>        
                </div>
            </form>
        </div>`;
    }
}
