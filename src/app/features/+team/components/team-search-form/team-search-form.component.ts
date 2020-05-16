import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs/';
import { takeUntil } from 'rxjs/operators';
import { TeamSearchParameter, VacancySearchParameter } from '../../../../models';
import { TeamDefaultSearchParameter } from '../../constants/team-default-search.const';


@Component({
    selector: 'app-team-search-form',
    templateUrl: './team-search-form.component.html',
    styleUrls: ['./team-search-form.component.scss'],
})

export class TeamSearchFormComponent implements OnInit, OnDestroy {
    @Output() public valueChanges: EventEmitter<TeamSearchParameter> = new EventEmitter<TeamSearchParameter>();
    @Input() public totalCount: number = 0;
    public searchForm: FormGroup;
    @ViewChild(MatPaginator, { static: true }) public paginator: MatPaginator;

    private _searchParameters: TeamSearchParameter = TeamDefaultSearchParameter;
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(private _builder: FormBuilder) { }

    public ngOnInit(): void {
        this.searchForm = this._builder.group({
            searchTerm: new FormControl(this.searchParameters.searchTerm),
            maxNumberOfMembers: new FormControl(this.searchParameters.maxNumberOfMembers),
            minNumberOfMembers: new FormControl(this.searchParameters.minNumberOfMembers),
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
    public set searchParameters(parameters: TeamSearchParameter) {
        this._searchParameters = { ...TeamDefaultSearchParameter, ...parameters };
        if (this.searchForm) {
            this.searchForm.patchValue({
                searchTerm: this._searchParameters.searchTerm ? this._searchParameters.searchTerm : '',
                maxNumberOfMembers: this._searchParameters.maxNumberOfMembers ? Number(this._searchParameters.maxNumberOfMembers) : '',
                minNumberOfMembers: this._searchParameters.minNumberOfMembers ? Number(this._searchParameters.minNumberOfMembers) : '',
            }, { emitEvent: false });
        }
        this._setPagination();
    }

    public get searchParameters(): TeamSearchParameter {
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

    public filter(value: TeamSearchParameter): void {
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

    private _setupSearchParameters(param: TeamSearchParameter): void {
        this._searchParameters = {
            page: this.page,
            perPage: this.pageSize,
            minNumberOfMembers: param.minNumberOfMembers,
            maxNumberOfMembers: param.maxNumberOfMembers,
            searchTerm: param.searchTerm,
            companyId: param.companyId,
        };
    }

    private _emit(value: VacancySearchParameter): void {
        this._setupSearchParameters(value);
        this.valueChanges.emit({ ...this._searchParameters });
    }

    private _subscribeControlValuesChages(): void {
        this.searchForm.controls.minNumberOfMembers.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: number) => {
            this.page = 0;
            this.filter({ minNumberOfMembers: value });
        });
        this.searchForm.controls.maxNumberOfMembers.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: number) => {
            this.page = 0;
            this.filter({ maxNumberOfMembers: value });
        });
        this.searchForm.controls.searchTerm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe((value: string) => {
            this.page = 0;
            this.filter({ searchTerm: value });
        });
    }
}
