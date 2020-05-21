import { Component, OnInit } from '@angular/core';
import { Employee, Profession, Technology, Position } from '../../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { switchMap } from 'rxjs/operators';
import { PositionOptionDescriptions } from '../../../../core/constants/positions-option-descriptions.const';
import { ProfessionOptionDescriptions } from '../../../../core/constants/profession-option-descriptions.const';
import { KeyValue } from '@angular/common';
import { TechnologyOptionDescriptions } from '../../../../core/constants/technology-option-descriptions.const';
import { CurrentUserService } from '../../../../core/permission/services';
import { IUserInfo } from '../../../../core/auth';

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
    private professions: KeyValue<Profession, string>[] = ProfessionOptionDescriptions;
    private positions: KeyValue<Position, string>[] = PositionOptionDescriptions;
    private tecnologies: KeyValue<Technology, string>[] = TechnologyOptionDescriptions;

    private currentUserInfo: IUserInfo;

    public employee: Employee;

    constructor(
        private employeeService: EmployeeService,
        protected router: Router,
        protected route: ActivatedRoute,
        private currentUserService: CurrentUserService) { }

    public ngOnInit(): void {
        this.route.params.pipe(
            switchMap(params => {
                const employeeId = params['id'];
                return this.employeeService.getEmployee(employeeId);
            })
        ).subscribe(employee => {
            this.employee = employee;
        });

        if (this.currentUserService.userInfo) {
            this.currentUserInfo = this.currentUserService.userInfo;
        } else {
            this.currentUserService.userInfoChanged.subscribe(_ => this.currentUserInfo = this.currentUserService.userInfo);
        }
    }

    public get profession(): string {
        return this.professions.find(p => p.key === this.employee.profession).value;
    }

    public get position(): string {
        return this.positions.find(p => p.key === this.employee.position).value;
    }

    public get technology(): string {
        return this.tecnologies.find(p => p.key === this.employee.primaryTechnology).value;
    }

    public get imageUrl(): string {
        const url = this.employee?.imageUrl || '../../../../../assets/favicon.ico';

        return `url(${url})`;
    }

    public get relatesToCurrentCompany(): boolean {
        return this.currentUserInfo && this.currentUserInfo.companyId === this.employee.companyId;
    }
}
