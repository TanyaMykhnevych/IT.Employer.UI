import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { EmployeeSearchParameter, Technology, Position, Profession } from '../../../../models';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmployeeDefaultSearchParameter } from '../../constants/employee-default-search.const';
import { KeyValue } from '@angular/common';
import { PositionOptionDescriptions } from '../../../../core/constants/positions-option-descriptions.const';
import { ProfessionOptionDescriptions } from '../../../../core/constants/profession-option-descriptions.const';
import { TechnologyOptionDescriptions } from '../../../../core/constants/technology-option-descriptions.const';

@Component({
    selector: 'app-employee-search-form',
    templateUrl: './employee-search-form.component.html',
    styleUrls: ['./employee-search-form.component.scss']
})
export class EmployeeSearchFormComponent implements OnInit, OnDestroy {
    @Output() public valueChanges: EventEmitter<EmployeeSearchParameter> = new EventEmitter<EmployeeSearchParameter>();
    @Input() public totalCount: number = 0;
    public searchForm: FormGroup;
    @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

    public professions: KeyValue<Profession, string>[] = ProfessionOptionDescriptions;
    public positions: KeyValue<Position, string>[] = PositionOptionDescriptions;
    public technologies: KeyValue<Technology, string>[] = TechnologyOptionDescriptions;

    private _searchParameters: EmployeeSearchParameter = EmployeeDefaultSearchParameter;
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(private _builder: FormBuilder) { }

    public ngOnInit(): void {
        this.searchForm = this._builder.group({
            profession: new FormControl(this._searchParameters.profession ? Number(this._searchParameters.profession) : ''),
            position: new FormControl(this._searchParameters.position ? Number(this._searchParameters.position) : ''),
            primaryTechnology: new FormControl(this._searchParameters.primaryTechnology ? Number(this._searchParameters.primaryTechnology) : ''),
            experienceFrom: new FormControl(this._searchParameters.experienceFrom ? Number(this._searchParameters.experienceFrom) : ''),
            experienceTo: new FormControl(this._searchParameters.experienceTo ? Number(this._searchParameters.experienceTo) : ''),
            minHourRate: new FormControl(this._searchParameters.minHiringHourRate ? Number(this._searchParameters.minHiringHourRate) : ''),
            maxHourRate: new FormControl(this._searchParameters.maxHiringHourRate ? Number(this._searchParameters.maxHiringHourRate) : '')
        });
        this._setPagination();

        this._emit(this.searchForm.value);
        this._subscribeControlValuesChages();
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    @Input()
    public set searchParameters(parameters: EmployeeSearchParameter) {
        this._searchParameters = { ...EmployeeDefaultSearchParameter, ...parameters };
        if (this.searchForm) {
            this.searchForm.patchValue({
                profession: this._searchParameters.profession ? Number(this._searchParameters.profession) : '',
                position: this._searchParameters.position ? Number(this._searchParameters.position) : '',
                primaryTechnology: this._searchParameters.primaryTechnology ? Number(this._searchParameters.primaryTechnology) : '',
                experienceFrom: this._searchParameters.experienceFrom ? Number(this._searchParameters.experienceFrom) : '',
                experienceTo: this._searchParameters.experienceTo ? Number(this._searchParameters.experienceTo) : '',
                minHourRate: this._searchParameters.minHiringHourRate ? Number(this._searchParameters.minHiringHourRate) : '',
                maxHourRate: this._searchParameters.maxHiringHourRate ? Number(this._searchParameters.maxHiringHourRate) : '',
            }, { emitEvent: false });
        }
        this._setPagination();
    }

    public get searchParameters(): EmployeeSearchParameter {
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

    public filter(value: EmployeeSearchParameter): void {
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

    private _setupSearchParameters(param: EmployeeSearchParameter): void {
        this._searchParameters = {
            page: this.page,
            perPage: this.pageSize,
            primaryTechnology: param.primaryTechnology,
            position: param.position,
            profession: param.profession,
            experienceFrom: param.experienceFrom,
            experienceTo: param.experienceTo,
            minHiringHourRate: param.minHiringHourRate,
            maxHiringHourRate: param.maxHiringHourRate
        };
    }

    private _emit(value: EmployeeSearchParameter): void {
        this._setupSearchParameters(value);
        this.valueChanges.emit({ ...this._searchParameters });
    }

    private _subscribeControlValuesChages(): void {
        this.searchForm.controls.profession.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: Profession) => {
            this.page = 0;
            this.filter({ profession: value });
        });
        this.searchForm.controls.position.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: Position) => {
            this.page = 0;
            this.filter({ position: value });
        });
        this.searchForm.controls.primaryTechnology.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: Technology) => {
            this.page = 0;
            this.filter({ primaryTechnology: value });
        });
        this.searchForm.controls.experienceFrom.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: number) => {
            this.page = 0;
            this.filter({ experienceFrom: value });
        });
        this.searchForm.controls.experienceTo.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: number) => {
            this.page = 0;
            this.filter({ experienceTo: value });
        });
        this.searchForm.controls.minHourRate.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: number) => {
            this.page = 0;
            this.filter({ minHiringHourRate: value });
        });
        this.searchForm.controls.maxHourRate.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: number) => {
            this.page = 0;
            this.filter({ maxHiringHourRate: value });
        });
    }
}
