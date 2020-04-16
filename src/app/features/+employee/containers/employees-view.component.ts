import { Component } from '@angular/core';
import { Employee, EmployeeSearchParameter, ISearchResponse } from '../../../models';
import { EmployeeService } from '../services/employee.service';


@Component({
    selector: 'app-employees-view',
    templateUrl: './projects-view.employees.html',
})
export class EmployeesViewComponent {
    public pageSize: number = 10;
    public employees: Employee[];
    public totalCount: number;
    public searchParameters: EmployeeSearchParameter = null;


    constructor(private _employeeService: EmployeeService) {
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
