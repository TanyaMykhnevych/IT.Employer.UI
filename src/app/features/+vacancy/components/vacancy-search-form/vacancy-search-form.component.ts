import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs/';
import { EnumUtils } from '../../../../core/enum';
import { Position, Profession, Technology, VacancySearchParameter } from '../../../../models';
import { VacancyDefaultSearchParameter } from '../../constants/vacancy-default-search.const';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'app-vacancy-search-form',
    templateUrl: './vacancy-search-form.component.html',
    styleUrls: ['./vacancy-search-form.component.scss'],
})

export class VacancySearchFormComponent implements OnInit, OnDestroy {
    public Profession = Profession;
    public Position = Position;
    public Technology = Technology;
    public professions: number[] = [];
    public positions: number[] = [];
    public technologies: number[] = [];

    @Output() public valueChanges: EventEmitter<VacancySearchParameter> = new EventEmitter<VacancySearchParameter>();
    @Input() public totalCount: number = 0;
    public searchForm: FormGroup;
    @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

    private _searchParameters: VacancySearchParameter = VacancyDefaultSearchParameter;
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(private _builder: FormBuilder) { }

    public ngOnInit(): void {
        this.searchForm = this._builder.group({
            profession: new FormControl(this.searchParameters.profession),
            position: new FormControl(this.searchParameters.position),
            primaryTechnology: new FormControl(this.searchParameters.primaryTechnology),
        });
        this._setPagination();
        this._fillEnumValues();

        this._emit(this.searchForm.value);
        this._subscribeControlValuesChages();
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    @Input()
    public set searchParameters(parameters: VacancySearchParameter) {
        this._searchParameters = { ...VacancyDefaultSearchParameter, ...parameters };
        if (this.searchForm) {
            this.searchForm.patchValue({
                profession: this._searchParameters.profession ? Number(this._searchParameters.profession) : '',
                position: this._searchParameters.position ? Number(this._searchParameters.position) : '',
                primaryTechnology: this._searchParameters.primaryTechnology ? Number(this._searchParameters.primaryTechnology) : '',
            }, { emitEvent: false });
        }
        this._setPagination();
    }

    public get searchParameters(): VacancySearchParameter {
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

    public filter(value: VacancySearchParameter): void {
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

    private _setupSearchParameters(param: VacancySearchParameter): void {
        this._searchParameters = {
            page: this.page,
            perPage: this.pageSize,
            profession: param.profession,
            position: param.position,
            primaryTechnology: param.primaryTechnology,
        };
    }

    private _emit(value: VacancySearchParameter): void {
        this._setupSearchParameters(value);
        this.valueChanges.emit({ ...this._searchParameters });
    }

    private _subscribeControlValuesChages(): void {
        this.searchForm.controls.position.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: number) => {
            this.page = 0;
            this.filter({ position: value });
        });
        this.searchForm.controls.primaryTechnology.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: number) => {
            this.page = 0;
            this.filter({ primaryTechnology: value });
        });
        this.searchForm.controls.profession.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: number) => {
            this.page = 0;
            this.filter({ profession: value });
        });
    }

    private _fillEnumValues(): void {
        this.positions = EnumUtils.getValues(Position);
        this.professions = EnumUtils.getValues(Profession);
        this.technologies = EnumUtils.getValues(Technology);
    }
}
