import { Injectable } from '@angular/core';
import { SettingsStoreService } from '../../../../core/settings/services/settings-store.service';

@Injectable()
export class PricePolicyService {
    constructor (private settingsStore: SettingsStoreService) { }

    public calculateHiringHourRate(hourRate: number, teamSize: number) {
        const extraChargeCoefficient = this.getExtraChargeCoefficient(teamSize);

        return Math.round(hourRate * (1 + extraChargeCoefficient));
    }

    public getExtraChargeCoefficient(teamSize: number): number {
        const appSettings =  this.settingsStore.settings$.value;

        if (appSettings) {
            const sortedPolicies = appSettings.pricePolicies.sort((a, b) => b.minMembersNumber - a.minMembersNumber);

            for (const pricePolicy of sortedPolicies) {
                if (teamSize >= pricePolicy.minMembersNumber) {
                    return pricePolicy.extraChargeCoefficient;
                }
            }
        }

        return 0;
    }
}
