export function geolocationValid() {

}

export function getGeolocation() {
    return new Promise((resolve) => {
        // let result = '';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve(`${latitude} - ${longitude}`);
                }, () => {
                    resolve('error');
                },
            );
        }
    });
}

export function validGeolocation(coord) {
    const isValid = coord
        .search(/^(\[?-?)((\d|[0-8]\d?|90)\.\d{4,}), ?(-|−)?((\d|\d\d|1[0-7][0-9]|180)\.\d{4,})(\]?)$/)
        !== -1;
    return isValid;
}

export function validInput(value) {
    return value.trim();
}

export function secToMMSSFormat(seconds) {
    const minutes = Math.floor(seconds / 60);
    const newSeconds = (seconds - (minutes * 60));
    const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const ss = newSeconds < 10 ? `0${newSeconds}` : `${newSeconds}`;

    return `${mm}:${ss}`;
}
