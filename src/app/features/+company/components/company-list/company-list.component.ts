import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CurrentUserService } from '../../../../core/permission/services';
import { Company, CompanySize, CompanyType } from '../../../../models';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss'],
})

export class CompanyListComponent implements OnInit {
    public CompanySize = CompanySize;
    public CompanyType = CompanyType;
    public isAdmin: boolean = false;

    @Input()
    public set companies(companies: Company[]) {
        this._companies = companies;
        if (this._companies) {
            this.dataSource = new MatTableDataSource(this._companies);
            this.selection = new SelectionModel<Company>(true, []);
            this.isLoading = false;
        }
        this._clearSelection();
    }

    public get companies() {
        return this._companies;
    }

    public dataSource: MatTableDataSource<Company>;
    public displayedColumns = ['select', 'name', 'createdOn', 'email', 'phone', 'size', 'type', 'website', 'actions'];
    public selection: SelectionModel<Company> = new SelectionModel<Company>(true, []);
    public isLoading: boolean = true;
    @Output() public selectCompany: EventEmitter<Company[]> = new EventEmitter<Company[]>();
    private _companies: Company[] = [];
    private _selectedCompanies: Company[] = [];

    constructor(private _currentUserService: CurrentUserService) {
        this.isAdmin = this._currentUserService.isAdmin;
    }

    public ngOnInit(): void { }

    public get selectedCompany(): Company {
        if (this._selectedCompanies.length === 1) {
            return this._selectedCompanies[0];
        } else {
            return null;
        }
    }

    public isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;

        return numSelected === numRows;
    }

    public toggle(row: Company): void {
        if (this._selectedCompanies.some((project: Company) => project.id === row.id)) {
            const indexOfRow = this._selectedCompanies.indexOf(row);
            this._selectedCompanies.splice(indexOfRow, 1);
        } else {
            this._selectedCompanies.push(row);
        }

        this.selection.toggle(row);

        this.selectCompany.emit(this._selectedCompanies);
    }

    public masterToggle(): void {
        this.isAllSelected() ?
            this._clearSelection() :
            this._selectAll();

        this.selectCompany.emit(this._selectedCompanies);
    }

    public selectSingle(row: Company): void {
        if (this.selectedCompany === row || (this._selectedCompanies.length > 1)
            && this._selectedCompanies.some((company: Company) => company.id === row.id)) {
            this._clearSelection();

            return;
        }

        this._clearSelection();
        this.toggle(row);
    }

    private _clearSelection(): void {
        this.selection.clear();
        this._selectedCompanies = [];
    }

    private _selectAll(): void {
        this.dataSource.data.forEach(row => this.selection.select(row));
        this._selectedCompanies = [];
        this.dataSource.data.forEach(row => this._selectedCompanies.push(row));
    }
}
