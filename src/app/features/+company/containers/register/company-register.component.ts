import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';


@Component({
    selector: 'app-company-register',
    templateUrl: './company-register.component.html',
})
export class CompanyRegisterComponent implements OnInit {


    constructor(private _companyService: CompanyService) {
    }

    public ngOnInit(): void {
    }
}
