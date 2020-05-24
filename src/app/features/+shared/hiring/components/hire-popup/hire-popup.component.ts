import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Hire } from '../../../../../models/hiring/hire';
import { Employee, Team } from '../../../../../models';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrentUserService } from '../../../../../core/permission/services';
import { MatDialogRef } from '@angular/material/dialog';
import { Validate } from '../../../../../core/form/decorators';
import { PricePolicyService } from '../../../services/price-policy/price-policy.service';

@Component({
    selector: 'app-hire-popup',
    templateUrl: './hire-popup.component.html',
})
export class HirePopupComponent implements OnInit {
    @Input() public empoyee: Employee;
    @Input() public team: Team;

    public hireCreated: EventEmitter<Hire> = new EventEmitter<Hire>();

    public form: FormGroup;
    public totalHourRate: number;
    public totalPrice: number;

    constructor (
        private formBuilder: FormBuilder,
        private currentUserService: CurrentUserService,
        private dialogRef: MatDialogRef<HirePopupComponent>,
        private pricePolicyService: PricePolicyService) { }

    public ngOnInit(): void {
        this.form = this.formBuilder.group({
            hiredFrom: new FormControl(null, [Validators.required]),
            hiredTo: new FormControl(null, [Validators.required]),
            hireMessage: new FormControl('', [Validators.min(3), Validators.max(5000)])
        });

        this.totalHourRate = this.team
            ? this.pricePolicyService.calculateTeamHiringHourRate(this.team.members.map(e => e.hourRate))
            : this.pricePolicyService.calculateHiringHourRate(this.empoyee.hourRate, 1);
    }

    public get title(): string {
        const name = this.team?.name || `${this.empoyee?.firstName} ${this.empoyee?.lastName}`;
        const companyName = this.team?.company?.name || this.empoyee?.company?.name;

        return `Hiring of ${name} from ${companyName} - $${this.totalHourRate}/hour`;
    }

    public onDateChanged(): void {
        let hiredFrom: Date = this.form.controls.hiredFrom.value;
        let hiredTo: Date = this.form.controls.hiredTo.value;

        if (hiredFrom && hiredTo) {
            hiredFrom = new Date(hiredFrom);
            hiredTo = new Date(hiredTo);

            let count = 0;

            for (; hiredFrom.getTime() < hiredTo.getTime(); hiredFrom.setDate(hiredFrom.getDate() + 1)) {
                if (hiredFrom.getDay() > 0 && hiredFrom.getDay() < 6) {
                    count++;
                }
            }

            this.totalPrice = count * 8 * this.totalHourRate;
        }
    }

    @Validate()
    public createHire(): void {
        const hire: Hire = this.form.value;

        hire.employeeId = this.empoyee?.id;
        hire.teamId = this.team?.id;
        hire.companyId = this.team?.companyId || this.empoyee?.companyId;
        hire.hiringCompanyId = this.currentUserService.userInfo.companyId;

        this.hireCreated.emit(hire);
        this.close();
    }

    public close(): void {
        this.dialogRef.close();
    }
}
