import { BehaviorSubject } from 'rxjs';
import { Settings } from '../models/settings';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsStoreService {
    public settings$ = new BehaviorSubject<Settings>(null);

    public saveSettings(appSettings: Settings): void {
        this.settings$.next(appSettings);
    }
}
