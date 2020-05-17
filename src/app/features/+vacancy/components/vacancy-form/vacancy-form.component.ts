import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PositionOptionDescriptions } from '../../../../core/constants/positions-option-descriptions.const';
import { ProfessionOptionDescriptions } from '../../../../core/constants/profession-option-descriptions.const';
import { TechnologyOptionDescriptions } from '../../../../core/constants/technology-option-descriptions.const';
import { Validate } from '../../../../core/form/decorators';
import { Vacancy } from '../../../../models';
import { EmptyVacancy } from '../../constants/empty-vacancy.const';

@Component({
    selector: 'app-vacancy-form-component',
    templateUrl: './vacancy-form.component.html',
})
export class VacancyFormComponent implements OnInit {
    @Input() public vacancy: Vacancy = EmptyVacancy;
    @Output() public submit: EventEmitter<Vacancy> = new EventEmitter<Vacancy>();
    public form: FormGroup;
    public submitted = false;

    public readonly professions = ProfessionOptionDescriptions;
    public readonly positions = PositionOptionDescriptions;
    public readonly technologies = TechnologyOptionDescriptions;

    constructor(private _builder: FormBuilder) { }

    public ngOnInit(): void {
        this.form = this._builder.group({
            name: new FormControl(this.vacancy.name, [Validators.required, Validators.maxLength(128)]),
            description: new FormControl(this.vacancy.description, [Validators.maxLength(2056)]),
            image: new FormControl(this.vacancy.image, [Validators.maxLength(2056)]),
            profession: new FormControl(this.vacancy.profession, [Validators.required]),
            position: new FormControl(this.vacancy.position, [Validators.required]),
            primaryTechnology: new FormControl(this.vacancy.primaryTechnology, [Validators.required]),
            experienceYears: new FormControl(this.vacancy.experienceYears, [Validators.required]),
        });
    }

    public done(e: Event): void {
        e.stopPropagation();
        this.submitted = true;

        this._submit();
    }

    @Validate()
    private _submit(): void {
        const result = { ...this.vacancy, ...this.form.value };
        result.position = +result.position;
        result.profession = +result.profession;
        result.primaryTechnology = +result.primaryTechnology;

        this.submit.emit(result);
    }
}
