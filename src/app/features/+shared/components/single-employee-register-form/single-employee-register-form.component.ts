import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProfessionOptionDescriptions } from '../../../../core/constants/profession-option-descriptions.const';
import { PositionOptionDescriptions } from '../../../../core/constants/positions-option-descriptions.const';
import { TechnologyOptionDescriptions } from '../../../../core/constants/technology-option-descriptions.const';

@Component({
    selector: 'app-single-employee-register-form',
    templateUrl: './single-employee-register-form.component.html'
})
export class SingleEmployeeRegisterFormComponent {
    public readonly professions = ProfessionOptionDescriptions;
    public readonly positions = PositionOptionDescriptions;
    public readonly technologies = TechnologyOptionDescriptions;

    @Input() public form: FormGroup;

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
}
