import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeSearchParameter, ISearchResponse } from '../../../../models';
import { EmployeeDefaultSearchParameter } from '../../constants/employee-default-search.const';
import { EmployeeService } from '../../services/employee.service';
import { AbstractSearchListView } from '../../../../core/search';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from '../../../../core/permission/services';
import { first, switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-my-employees',
    templateUrl: './my-employees.component.html',
})
export class MyEmployeesComponent extends AbstractSearchListView<EmployeeSearchParameter> implements OnInit {
    public pageSize: number = 10;
    public employees: Employee[];
    public totalCount: number;
    public searchParameters: EmployeeSearchParameter = EmployeeDefaultSearchParameter;

    constructor(
        private _employeeService: EmployeeService,
        protected router: Router,
        protected route: ActivatedRoute,
        private currentUserService: CurrentUserService) {
        super();
    }

    public onSearch(searchParameters: EmployeeSearchParameter): void {
        super.onSearch(searchParameters);
    }

    public get companyName(): string {
        return this.currentUserService.userInfo?.companyName;
    }

    protected loadData(): void {
        if (this.currentUserService.userInfo) {
            this._employeeService
                .getActiveSeparateEmployees({ ...this.searchParameters, companyId: this.currentUserService.userInfo.companyId })
                .subscribe((result: ISearchResponse<Employee>) => {
                    this.employees = result.items;
                    this.totalCount = result.totalCount;
                });
        } else {
            this.currentUserService.userInfoChanged.pipe(
                first(),
                switchMap(_ => this._employeeService.getActiveSeparateEmployees({
                    ...this.searchParameters,
                    myEmployees: true,
                    companyId: this.currentUserService.userInfo.companyId
                }))
            ).subscribe((result: ISearchResponse<Employee>) => {
                this.employees = result.items;
                this.totalCount = result.totalCount;
            });
        }
    }
}
