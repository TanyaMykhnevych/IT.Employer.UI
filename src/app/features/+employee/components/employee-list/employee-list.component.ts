import { Component, Input } from '@angular/core';
import { Employee } from '../../../../models';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
    private _employees: Employee[] = [];

    @Input()
    public set employees(_employees: Employee[]) {
        this._employees = _employees;
        if (this._employees) {
            this.isLoading = false;
        }
    }

    public get employees() {
        return this._employees;
    }

    @Input() public editable: boolean;

    public isLoading: boolean = true;
}
