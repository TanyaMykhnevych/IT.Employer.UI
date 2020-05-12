import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProfessionOptionDescriptions } from '../../../../core/constants/profession-option-descriptions.const';
import { PositionOptionDescriptions } from '../../../../core/constants/positions-option-descriptions.const';
import { TechnologyOptionDescriptions } from '../../../../core/constants/technology-option-descriptions.const';
import { PricePolicyService } from '../../services/price-policy/price-policy.service';

@Component({
    selector: 'app-single-employee-register-form',
    templateUrl: './single-employee-register-form.component.html'
})
export class SingleEmployeeRegisterFormComponent {
    public readonly professions = ProfessionOptionDescriptions;
    public readonly positions = PositionOptionDescriptions;
    public readonly technologies = TechnologyOptionDescriptions;

    @Input() public form: FormGroup;
    @Input() public teamSize: number = 1;

    constructor(private pricePolicyService: PricePolicyService) { }

    public addCharacteristic(): void {
        this.characteristicsArray.push(new FormGroup({
            author: new FormControl('', [Validators.required, Validators.maxLength(50)]),
            text: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
        }));
    }

    public removeCharacteristic(index: number): void {
        this.characteristicsArray.removeAt(index);
    }

    public get characteristicsArray(): FormArray {
        return <FormArray>this.form.controls.characteristics;
    }

    public get availableUntilFieldNeeded(): boolean {
        return !!this.form.controls.availableUntil;
    }

    public get hiringHourRateInformation(): string {
        const hourRate = this.form.controls.hourRate.value;

        if (hourRate) {
            const extraChargeCoefficient = this.pricePolicyService.getExtraChargeCoefficient(this.teamSize);
            const extraChargePercents = extraChargeCoefficient * 100;

            const hiringHourRate = this.pricePolicyService.calculateHiringHourRate(hourRate, this.teamSize);

            return `(Extra charge: ${extraChargePercents}%. Hiring hour rate: ${hiringHourRate})`;
        }

        return '';
    }
}
