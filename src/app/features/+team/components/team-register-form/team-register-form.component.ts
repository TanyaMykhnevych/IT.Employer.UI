import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Team, Employee } from '../../../../models';
import { EmptyTeam } from '../../constants/empty-team.const';
import { EmptyEmployee } from '../../../+employee/constants/empty-employee.const';

@Component({
    selector: 'app-team-register-form',
    templateUrl: './team-register-form.component.html'
})
export class TeamRegisterFormComponent implements OnInit {
    @Input() public team: Team = EmptyTeam;

    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.form = this.formBuilder.group({
            members: this.createEmployeesFormArray()
        });
    }

    public registerTeam(event: Event): void {
        event.preventDefault();
    }

    public addMember(): void {
        const newEmployeeFormGroup = this.createEmployeeFormGroup(EmptyEmployee);

        this.membersFormArray.push(newEmployeeFormGroup)
    }

    public get membersFormArray(): FormArray {
        return <FormArray>this.form.controls.members;
    }

    private createEmployeesFormArray(): FormArray {
        let formGroups: FormGroup[];

        if (this.team.members) {
            formGroups = this.team.members.map(employee => this.createEmployeeFormGroup(employee));
        } else {
            formGroups = [];
        }

        return this.formBuilder.array(formGroups);
    }

    private createEmployeeFormGroup(employee: Employee): FormGroup {
        return new FormGroup({
            firstName: new FormControl(employee.firstName, [Validators.required, Validators.maxLength(30)]),
            lastName: new FormControl(employee.lastName, [Validators.required, Validators.maxLength(50)]),
            birthDate: new FormControl(employee.birthDate, [Validators.required]),
            description: new FormControl(employee.description),
            imageUrl: new FormControl(employee.imageUrl),
            profession: new FormControl(employee.profession, [Validators.required]),
            position: new FormControl(employee.position, [Validators.required]),
            primaryTechnology: new FormControl(employee.primaryTechnology, [Validators.required]),
            hourRate: new FormControl(employee.hourRate, [Validators.required, Validators.min(1), Validators.max(200)]),
            email: new FormControl(employee.email, [Validators.required, Validators.maxLength(50)]),
            skype: new FormControl(employee.skype, [Validators.required, Validators.maxLength(50)]),
            linkedIn: new FormControl(employee.linkedIn, [Validators.required, Validators.maxLength(50)]),
            experienceYears: new FormControl(employee.experienceYears, [Validators.required]),
            characteristics: this.createCharacteristicsFormArray(employee)
        });
    }

    private createCharacteristicsFormArray(employee: Employee): FormArray {
        let formGroups: FormGroup[];

        if (employee.characteristics) {
            formGroups = employee.characteristics.map(characteristic => new FormGroup({
                author: new FormControl(characteristic.author, [Validators.required, Validators.maxLength(50)]),
                text: new FormControl(characteristic.text, [Validators.required, Validators.maxLength(2000)]),
            }));
        } else {
            formGroups = [];
        }

        return this.formBuilder.array(formGroups);
    }
}
