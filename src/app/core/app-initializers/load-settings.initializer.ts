import { SettingsService } from '../settings/services/settings.service';

export function loadSettings(settingsService: SettingsService) {
    return () => settingsService.loadSettingsToStore();
}
