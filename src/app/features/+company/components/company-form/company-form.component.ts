import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnumUtils } from '../../../../core/enum';
import { Validate } from '../../../../core/form/decorators';
import { UrlValidator } from '../../../../core/validators';
import { Company, CompanySize, CompanyType } from '../../../../models';
import { CompanySizeDescriptions } from '../../constants/compnay-size-descriptions.const';
import { EmptyCompany } from '../../constants/empty-company.const';

@Component({
    selector: 'app-company-form-component',
    templateUrl: './company-form.component.html',
})
export class CompanyFormComponent implements OnInit {
    @Input() public company: Company = EmptyCompany;
    @Input() public editable: boolean = true;
    @Output() public submit: EventEmitter<Company> = new EventEmitter<Company>();
    public form: FormGroup;
    public submitted = false;

    public CompanyType = CompanyType;
    public sizes: KeyValue<CompanySize, string>[] = CompanySizeDescriptions;
    public types: number[] = [];

    constructor(private _builder: FormBuilder) { }

    public ngOnInit(): void {
        this.form = this._builder.group({
            name: new FormControl(this.company.name, [Validators.required, Validators.maxLength(64)]),
            description: new FormControl(this.company.description, [Validators.maxLength(2056)]),
            address: new FormControl(this.company.address, [Validators.required, Validators.maxLength(256)]),
            phone: new FormControl(this.company.phone, [Validators.required, Validators.maxLength(16)]),
            email: new FormControl(this.company.email, [Validators.required, Validators.email]),
            website: new FormControl(this.company.website, [UrlValidator.validate]),
            type: new FormControl(this.company.type, [Validators.required]),
            size: new FormControl(this.company.size, [Validators.required]),
        });
        this._fillEnumValues();
        if (!this.editable) {
            this.form.disable();
        }
    }

    public done(e: Event): void {
        e.stopPropagation();
        this.submitted = true;

        this._submit();
    }

    public edit(): void {
        this.form.enable();
        this.editable = true;
    }

    @Validate()
    private _submit(): void {
        this._setNullForEmptyFields();

        const result = { ...this.company, ...this.form.value };
        result.type = +result.type;
        result.size = +result.size;

        this.submit.emit(result);
    }

    private _setNullForEmptyFields(): void {
        Object.keys(this.form.controls).forEach(key => {
            const control = this.form.get(key);
            if (control.value === '') {
                control.setValue(null);
            }
        });
    }

    private _fillEnumValues(): void {
        this.types = EnumUtils.getValues(CompanyType);
    }
}
