/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import TextCard from '../UI/TextCard';
import AudioCard from '../UI/AudioCard';
import VideoCard from '../UI/VideoCard';
import {
    getGeolocation, validGeolocation, validInput, secToMMSSFormat,
} from '../helpers/helpers';

export default class Presenter {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.addListeners();

        this.model.addCardEvent.attach(this.addCard.bind(this));
    }

    addListeners() {
        let content = {};
        // add av
        this.view.addEventListener('click', async (event) => {
            const isAudioBtn = event.target.classList.contains('record-audio');
            const isVideoBtn = event.target.classList.contains('record-video');
            const isSaveBtn = event.target.classList.contains('record-save');
            const isCancleBtn = event.target.classList.contains('record-cancle');
            if (isAudioBtn) {
                await this.initRecord('audio', 15000);
                // this.startRecord(15000);
            }

            if (isVideoBtn) {
                await this.initRecord('video', 15000);
                // this.startRecord(15000);
            }

            if (isSaveBtn) {
                this.stopRecord();
                const geo = await getGeolocation();
                this.recordContent.coords = geo;
                if (geo === 'error') {
                    this.showForm(this.forms.geolocationAlert);
                }
                // this.clearRecords();
            }

            if (isCancleBtn) {
                this.stopRecord();
                this.clearRecords();
            }
        });

        // add text card
        this.view.addEventListener('keyup', async (event) => {
            const isInput = event.target.classList.contains('timeline-input');
            if (isInput && event.key === 'Enter') {
                const { value } = event.target;
                if (!validInput(value)) {
                    return;
                }
                const geo = await getGeolocation();
                content.coords = geo;
                if (geo === 'error') {
                    this.showForm(this.forms.geolocationAlert);
                }
                content.category = 'text';
                content.date = new Date().toLocaleString();
                content.data = value;
                event.target.value = '';
            }
        });

        // forms handle
        this.forms.geolocationAlert.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target.classList.contains('cancle-btn')) {
                content = {};
                this.hideForm(event.currentTarget);
            }

            if (event.target.classList.contains('success-btn')) {
                const input = event.currentTarget.querySelector('.timeline-input');
                const { value } = input;
                if (validGeolocation(value)) {
                    content.coords = value;
                    if (this.recordContent) this.recordContent.coords = value;
                    this.model.addCard(this.recordContent || content);
                    this.hideForm(event.currentTarget);
                    this.clearRecords();
                } else {
                    const helperText = event.currentTarget.querySelector('.helper-text');
                    helperText.textContent = 'Неверный формат';
                    helperText.classList.add('invalid');
                }
            }
        });

        this.forms.videoAlert.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target.classList.contains('cancle-btn')) {
                this.hideForm(event.currentTarget);
            }
        });

        this.forms.audioAlert.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target.classList.contains('cancle-btn')) {
                this.hideForm(event.currentTarget);
            }
        });
    }

    get forms() {
        return {
            geolocationAlert: document.querySelector('.geolocation-alert'),
            videoAlert: document.querySelector('.video-alert'),
            audioAlert: document.querySelector('.audio-alert'),
        };
    }

    addCard(content) {
        let card;
        switch (content.category) {
        case 'text':
            card = new TextCard(content);
            break;
        case 'audio':
            card = new AudioCard(content);
            break;
        case 'video':
            card = new VideoCard(content);
            break;
        default:
            break;
        }
        const messagesField = this.view.querySelector('.timeline-messages');
        messagesField.insertAdjacentHTML('beforeend', card.cardHTML());
    }

    showForm(formEl) {
        formEl.classList.remove('hidden');
    }

    hideForm(formEl) {
        const helperText = formEl.querySelector('.helper-text');
        const input = formEl.querySelector('.timeline-input');
        if (helperText) {
            helperText.classList.remove('invalid');
            helperText.textContent = 'Формат типа 51.50851,−0.12572';
            input.value = '';
        }
        formEl.classList.add('hidden');
    }

    async initRecord(type, limit) {
        const video = (type === 'video');
        if (!navigator.mediaDevices) {
            const typeForm = (video)
                ? this.showForm(this.forms.videoAlert)
                : this.showForm(this.forms.audioAlert);
            return;
        }
        try {
            // Record:
            if (!window.MediaRecorder) {
                const typeForm = (video)
                    ? this.showForm(this.forms.videoAlert)
                    : this.showForm(this.forms.audioAlert);
                return;
            }

            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video });
            const { stream } = this;
            this.recorder = new MediaRecorder(stream);
            const { recorder } = this;

            const chunks = [];
            recorder.addEventListener('dataavailable', (evt) => {
                chunks.push(evt.data);
            });

            recorder.addEventListener('stop', async (evt) => {
                const blob = new Blob(chunks);
                const src = URL.createObjectURL(blob);
                this.recordContent = {
                    category: type,
                    date: new Date().toLocaleString(),
                    data: src,
                };
            });
            this.startRecord(limit);
        } catch (e) {
            const typeForm = (video)
                ? this.showForm(this.forms.videoAlert)
                : this.showForm(this.forms.audioAlert);
        }
    }

    startRecord(limit) {
        this.toggleAvPanels();
        this.recorder.start();
        this.startTimer();
        this.recordsLimit = setTimeout(() => {
            this.stopRecord();
        }, limit);
    }

    startTimer() {
        let count = 0;
        const timerEl = this.view.querySelector('.timer');
        this.timer = setInterval(() => {
            count++;
            const mmss = secToMMSSFormat(count);
            timerEl.textContent = mmss;
        }, 1000);
    }

    stopRecord() {
        this.toggleAvPanels();
        clearTimeout(this.recordsLimit);
        clearInterval(this.timer);
        const timerEl = this.view.querySelector('.timer');
        timerEl.textContent = '00:00';
        this.recorder.stop();
        this.stream.getTracks().forEach((track) => track.stop());
    }

    clearRecords() {
        this.recorder = null;
        this.stream = null;
        this.recordContent = null;
    }

    toggleAvPanels() {
        const initPanel = this.view.querySelector('.init-panel');
        const recordingPanel = this.view.querySelector('.recording-panel');
        [initPanel, recordingPanel].forEach((panel) => {
            panel.classList.toggle('hidden');
        });
    }
}
