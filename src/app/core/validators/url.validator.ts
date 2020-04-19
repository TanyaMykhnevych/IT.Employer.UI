import { AbstractControl } from '@angular/forms';

export class UrlValidator {

    public static validate(url: AbstractControl): Object {
        const URL_REGEXP = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

        if (url.value && (url.value.lenght > 2083 || !URL_REGEXP.test(url.value))) {
            return {
                invalidUrl: true,
            };
        }

        return null;
    }
}
