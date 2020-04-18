import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeSearchParameter, ISearchResponse } from '../../../../models';
import { EmployeeDefaultSearchParameter } from '../../constants/employee-default-search.const';
import { EmployeeService } from '../../services/employee.service';


@Component({
    selector: 'app-employees-view',
    templateUrl: './employees-view.component.html',
})
export class EmployeesViewComponent implements OnInit {
    public pageSize: number = 10;
    public employees: Employee[];
    public totalCount: number;
    public searchParameters: EmployeeSearchParameter = EmployeeDefaultSearchParameter;


    constructor(private _employeeService: EmployeeService) {
    }

    public ngOnInit(): void {
        this._loadData();
    }

    public reloadEmployees(): void {
        this._loadData();
    }

    public onSearch(searchParameters: EmployeeSearchParameter): void {

    }

    private _loadData(): void {
        this._employeeService
            .getEmployees(this.searchParameters)
            .subscribe((result: ISearchResponse<Employee>) => {
                this.employees = result.items;
                this.totalCount = result.totalCount;
            });
    }
}
