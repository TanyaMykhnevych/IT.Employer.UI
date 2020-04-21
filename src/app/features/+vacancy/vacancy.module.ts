import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../layout/material.module';
import { VacancyFormComponent } from './components/vacancy-form/vacancy-form.component';
import { VacancyListComponent } from './components/vacancy-list/vacancy-list.component';
import { VacancySearchFormComponent } from './components/vacancy-search-form/vacancy-search-form.component';
import { CreateVacancyComponent } from './containers/create/create-vacancy.component';
import { VacanciesViewComponent } from './containers/view/vacancies-view.component';
import { VacancyRoutingModule } from './routes/vacancy-routing.module';
import { VacancyService } from './services/vacancy.service';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        VacancyRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        VacanciesViewComponent,
        VacancySearchFormComponent,
        VacancyListComponent,
        CreateVacancyComponent,
        VacancyFormComponent,
    ],
    entryComponents: [
    ],
})
export class VacancyModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: VacancyModule,
            providers: [VacancyService],
        };
    }
}
