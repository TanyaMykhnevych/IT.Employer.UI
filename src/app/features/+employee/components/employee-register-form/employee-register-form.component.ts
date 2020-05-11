import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Employee } from '../../../../models';
import { EmptyEmployee } from '../../constants/empty-employee.const';
import { Validate } from '../../../../core/form/decorators';
import { ProfessionOptionDescriptions } from '../../../../core/constants/profession-option-descriptions.const';
import { TechnologyOptionDescriptions } from '../../../../core/constants/technology-option-descriptions.const';
import { PositionOptionDescriptions } from '../../../../core/constants/positions-option-descriptions.const';

@Component({
    selector: 'app-employee-register-form',
    templateUrl: './employee-register-form.component.html',
})
export class EmployeeRegisterFormComponent implements OnInit {
    public readonly professions = ProfessionOptionDescriptions;
    public readonly positions = PositionOptionDescriptions;
    public readonly technologies = TechnologyOptionDescriptions;

    @Input() public employee: Employee = EmptyEmployee;
    public form: FormGroup;

    @Output() public employeeRegister: EventEmitter<Employee> = new EventEmitter<Employee>();

    constructor(private formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.form = this.formBuilder.group({
            firstName: new FormControl(this.employee.firstName, [Validators.required, Validators.maxLength(30)]),
            lastName: new FormControl(this.employee.lastName, [Validators.required, Validators.maxLength(50)]),
            birthDate: new FormControl(this.employee.birthDate, [Validators.required]),
            description: new FormControl(this.employee.description),
            imageUrl: new FormControl(this.employee.imageUrl),
            profession: new FormControl(this.employee.profession, [Validators.required]),
            position: new FormControl(this.employee.position, [Validators.required]),
            primaryTechnology: new FormControl(this.employee.primaryTechnology, [Validators.required]),
            hourRate: new FormControl(this.employee.hourRate, [Validators.required, Validators.min(1), Validators.max(200)]),
            availableUntil: new FormControl(this.employee.availableUntil, [Validators.required]),
            email: new FormControl(this.employee.email, [Validators.required, Validators.maxLength(50)]),
            skype: new FormControl(this.employee.skype, [Validators.required, Validators.maxLength(50)]),
            linkedIn: new FormControl(this.employee.linkedIn, [Validators.required, Validators.maxLength(50)]),
            experienceYears: new FormControl(this.employee.experienceYears, [Validators.required]),
            characteristics: this.createCharacteristicsFormArray()
        });
    }

    @Validate()
    public registerEmployee(event: Event): void {
        event.stopPropagation();

        const result: Employee = { ...this.employee, ...this.form.value };
        result.position = +result.position;
        result.profession = +result.profession;
        result.primaryTechnology = +result.primaryTechnology;

        this.employeeRegister.emit(result);
    }

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

    private createCharacteristicsFormArray(): FormArray {
        let formGroups: FormGroup[];

        if (this.employee.characteristics) {
            formGroups = this.employee.characteristics.map(characteristic => new FormGroup({
                author: new FormControl(characteristic.author, [Validators.required, Validators.maxLength(50)]),
                text: new FormControl(characteristic.text, [Validators.required, Validators.maxLength(2000)]),
            }));
        } else {
            formGroups = [];
        }

        return this.formBuilder.array(formGroups);
    }
}
