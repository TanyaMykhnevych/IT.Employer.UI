import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';


@Component({
    selector: 'app-employee-register',
    templateUrl: './employee-register.component.html',
})
export class EmployeeRegisterComponent implements OnInit {


    constructor(private _employeeService: EmployeeService) {
    }

    public ngOnInit(): void {
    }
}
