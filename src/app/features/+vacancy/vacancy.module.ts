import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../layout/material.module';
import { VacancyListComponent } from './components/vacancy-list/vacancy-list.component';
import { VacancySearchFormComponent } from './components/vacancy-search-form/vacancy-search-form.component';
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
