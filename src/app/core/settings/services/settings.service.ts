import { Injectable } from '@angular/core';
import { SettingsStoreService } from './settings-store.service';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../settings';
import { Settings } from '../models/settings';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor (
        private settingsStore: SettingsStoreService,
        private httpClient: HttpClient) { }

    public loadSettingsToStore(): void {
        this.httpClient.get<Settings>(`${AppSettings.apiHost}/settings`).subscribe(
            settings => this.settingsStore.saveSettings(settings)
        );
    }
}
