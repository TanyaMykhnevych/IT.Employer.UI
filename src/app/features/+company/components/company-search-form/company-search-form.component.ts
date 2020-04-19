import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EnumUtils } from '../../../../core/enum';
import { CompanySearchParameter, CompanySize, CompanyType } from '../../../../models';
import { CompanyDefaultSearchParameter } from '../../constants/company-default-search.const';


@Component({
    selector: 'app-company-search-form',
    templateUrl: './company-search-form.component.html',
    styleUrls: ['./company-search-form.component.scss'],
})

export class CompanySearchFormComponent implements OnInit {
    public CompanySize = CompanySize;
    public CompanyType = CompanyType;
    public sizes: number[] = [];
    public types: number[] = [];

    @Output() public valueChanges: EventEmitter<CompanySearchParameter> = new EventEmitter<CompanySearchParameter>();
    @Input() public totalCount: number = 0;
    public searchForm: FormGroup;
    @ViewChild(MatPaginator , { static: true }) public paginator: MatPaginator;

    private _searchParameters: CompanySearchParameter = CompanyDefaultSearchParameter;

    constructor(private _builder: FormBuilder) { }

    public ngOnInit(): void {
        this.searchForm = this._builder.group({
            type: new FormControl(this.searchParameters.type),
            searchTerm: new FormControl(this.searchParameters.searchTerm),
            size: new FormControl(this.searchParameters.size),
        });
        this._setPagination();
        this._fillEnumValues();

        this._emit(this.searchForm.value);
        this._subscribeControlValuesChages();
    }

    @Input()
    public set searchParameters(parameters: CompanySearchParameter) {
        this._searchParameters = { ...CompanyDefaultSearchParameter, ...parameters };
        if (this.searchForm) {
            this.searchForm.patchValue({
                type: this._searchParameters.type ? Number(this._searchParameters.type) : '',
                searchTerm: this._searchParameters.searchTerm ?
                    this._searchParameters.searchTerm : CompanyDefaultSearchParameter.searchTerm,
                size: this._searchParameters.size ? Number(this._searchParameters.size) : '',
            }, { emitEvent: false });
        }
        this._setPagination();
    }

    public get searchParameters(): CompanySearchParameter {
        return this._searchParameters;
    }

    public get page(): number {
        return parseInt(this._searchParameters.page.toString(), 10);
    }

    public set page(value: number) {
        this._searchParameters.page = parseInt(value.toString(), 10) + 1;
    }

    public get pageSize(): number {
        return parseInt(this._searchParameters.perPage.toString(), 10);
    }

    public set pageSize(value: number) {
        this._searchParameters.perPage = parseInt(value.toString(), 10);
    }

    public filter(value: CompanySearchParameter): void {
        this._emit({ ...this.searchForm.value, ...value });
    }

    public onPaginateChange(event: PageEvent): void {
        this.page = event.pageIndex;
        this.pageSize = event.pageSize;
        this._emit(this.searchForm.value);
    }

    private _setPagination(): void {
        this.paginator.pageSize = this.pageSize;
        this.paginator.pageIndex = this.page - 1;
    }

    private _setupSearchParameters({ size, type, searchTerm }: CompanySearchParameter): void {
        this._searchParameters = {
            page: this.page,
            perPage: this.pageSize,
            size,
            type,
            searchTerm,
        };
    }

    private _emit(value: CompanySearchParameter): void {
        this._setupSearchParameters(value);
        this.valueChanges.emit({ ...this._searchParameters });
    }

    private _subscribeControlValuesChages(): void {
        this.searchForm.controls.size.valueChanges.subscribe((value: CompanySize) => {
            this.page = 0;
            this.filter({ size: value });
        });
        this.searchForm.controls.type.valueChanges.subscribe((value: number) => {
            this.page = 0;
            this.filter({ type: value });
        });
        this.searchForm.controls.searchTerm.valueChanges.subscribe((value: string) => {
            this.page = 0;
            if (value.length < 1) {
                this.filter({ searchTerm: null });
            } else {
                this.filter({ searchTerm: value });
            }
        });
    }

    private _fillEnumValues(): void {
        this.sizes = EnumUtils.getValues(CompanySize);
        this.types = EnumUtils.getValues(CompanyType);
    }
}
