import {
    validGeolocation, validInput, secToMMSSFormat,
} from '../helpers/helpers';

describe('Test helpers funcs for', () => {
    test('validGeolocation', () => {
        let geoposition = '51.50851, −0.12572';
        expect(validGeolocation(geoposition)).toBeTruthy();
        geoposition = '51.50851,−0.12572';
        expect(validGeolocation(geoposition)).toBeTruthy();
        geoposition = '[51.50851, −0.12572]';
        expect(validGeolocation(geoposition)).toBeTruthy();
        geoposition = 'abracadabra';
        expect(validGeolocation(geoposition)).toBeFalsy();
    });

    test('validInput', () => {
        let input = '51.50851, −0.12572';
        expect(validInput(input)).toBeTruthy();
        input = ' 51.50851,−0.12572 ';
        expect(validInput(input)).toBeTruthy();
        input = '   ';
        expect(validInput(input)).toBeFalsy();
        input = '';
        expect(validInput(input)).toBeFalsy();
    });

    test('secToMMSSFormat', () => {
        let input = 120;
        expect(secToMMSSFormat(input)).toBe('02:00');
        input = 0;
        expect(secToMMSSFormat(input)).toBe('00:00');
        input = 11;
        expect(secToMMSSFormat(input)).toBe('00:11');
        input = 2;
        expect(secToMMSSFormat(input)).toBe('00:02');
    });
});
