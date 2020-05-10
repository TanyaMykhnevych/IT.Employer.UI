import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Vacancy } from '../../../../models';
import { VacancyService } from '../../services/vacancy.service';


@Component({
    selector: 'app-create-vacancy',
    templateUrl: './create-vacancy.component.html',
})
export class CreateVacancyComponent implements OnInit {

    constructor(private _vacancyService: VacancyService,
        private _router: Router, private _toastr: ToastrService) {
    }

    public ngOnInit(): void { }

    public onVacancySubmit(vacancy: Vacancy): void {
        const observ = vacancy.id ?
            this._vacancyService.update(vacancy) :
            this._vacancyService.create(vacancy);

        observ.subscribe(_ => {
            this._toastr.success('Vacancy was created successfully');
            this._router.navigate(['/vacancy/search']);
        });
    }
}
