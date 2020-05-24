import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrentUserService } from '../../../../core/permission/services';


@Component({
    selector: 'app-employee-register',
    templateUrl: './employee-register.component.html',
})
export class EmployeeRegisterComponent implements OnInit {

    constructor(
        private employeeService: EmployeeService,
        private router: Router,
        private toastr: ToastrService,
        private currentUserService: CurrentUserService) { }

    public ngOnInit(): void {
    }

    public registerEmployee(employee: Employee): void {
        employee.companyId = this.currentUserService.userInfo.companyId;

        const observable = employee.id
            ? this.employeeService.update(employee)
            : this.employeeService.create(employee);

        observable.subscribe(_ => {
            this.toastr.success('Employee was successfully registered');
            this.router.navigate(['/employees/my-employees']);
        });
    }
}
