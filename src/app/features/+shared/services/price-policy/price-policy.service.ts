import { Injectable } from '@angular/core';
import { SettingsStoreService } from '../../../../core/settings/services/settings-store.service';

@Injectable()
export class PricePolicyService {
    constructor (private settingsStore: SettingsStoreService) { }

    public calculateHiringHourRate(hourRate: number, teamSize: number): number {
        const extraChargeCoefficient = this.getExtraChargeCoefficient(teamSize);

        return this.getPriceWithExtraCharge(hourRate, extraChargeCoefficient);
    }

    public calculateTeamHiringHourRate(hourRates: number[]): number {
        const extraChargeCoefficient = this.getExtraChargeCoefficient(hourRates.length);
        const sumHourRate = hourRates.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        return this.getPriceWithExtraCharge(sumHourRate, extraChargeCoefficient);
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

    private getPriceWithExtraCharge(rate: number, extraChargeCoefficient: number): number {
        return Math.round(rate * (1 + extraChargeCoefficient));
    }
}
