import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../../../models';
import { CompanyService } from '../../services/company.service';


@Component({
    selector: 'app-company-register',
    templateUrl: './company-register.component.html',
})
export class CompanyRegisterComponent implements OnInit {


    constructor(private _companyService: CompanyService, 
        private _router: Router) {
    }

    public ngOnInit(): void {
    }

    public onCompanySubmit(company: Company): void {
        const observ = company.id ?
            this._companyService.update(company) :
            this._companyService.create(company);

        observ.subscribe(_ => {
            this._router.navigate(['/company/search']);
        });
    }
}
