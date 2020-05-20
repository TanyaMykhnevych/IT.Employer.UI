import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeSearchParameter, ISearchResponse } from '../../../../models';
import { EmployeeDefaultSearchParameter } from '../../constants/employee-default-search.const';
import { EmployeeService } from '../../services/employee.service';
import { AbstractSearchListView } from '../../../../core/search';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-employees-view',
    templateUrl: './employees-view.component.html',
})
export class EmployeesViewComponent extends AbstractSearchListView<EmployeeSearchParameter> implements OnInit {
    public pageSize: number = 10;
    public employees: Employee[];
    public totalCount: number;
    public searchParameters: EmployeeSearchParameter = EmployeeDefaultSearchParameter;

    constructor(
        private _employeeService: EmployeeService,
        protected router: Router,
        protected route: ActivatedRoute) {
        super();
    }

    public onSearch(searchParameters: EmployeeSearchParameter): void {
        super.onSearch(searchParameters);
    }

    protected loadData(): void {
        this._employeeService
            .getActiveSeparateEmployees(this.searchParameters)
            .subscribe((result: ISearchResponse<Employee>) => {
                this.employees = result.items;
                this.totalCount = result.totalCount;
            });
    }
}
