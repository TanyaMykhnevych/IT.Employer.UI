import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrentUserService } from '../../../../core/permission/services';
import { Company } from '../../../../models';
import { CompanyService } from '../../services/company.service';


@Component({
    selector: 'app-my-company',
    templateUrl: './my-company.component.html',
    styleUrls: ['./my-company.component.scss'],
})
export class MyCompanyComponent implements OnInit {
    public company: Company;

    constructor(private _companyService: CompanyService,
        private _router: Router, private _toastr: ToastrService,
        private _currentUserService: CurrentUserService) {
    }

    public ngOnInit(): void {
        this._loadCompany();
    }

    public onCompanySubmit(company: Company): void {
        const observ = this._companyService.update(company.id, company);

        observ.subscribe(_ => {
            this._toastr.success('Company was updated successfully');
        });
    }

    public register(): void {
        this._router.navigate(['/company/register']);
    }

    private _loadCompany(): void {
        const userInfo = this._currentUserService.userInfo;
        if (userInfo && userInfo.companyId) {
            this._companyService.getCompany(userInfo.companyId).subscribe(_ => {
                this.company = _;
            });
        }

    }
}
