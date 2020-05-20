import { Component, Input } from '@angular/core';
import { Employee, Profession, Position, Technology } from '../../../../models';
import { ProfessionOptionDescriptions } from '../../../../core/constants/profession-option-descriptions.const';
import { KeyValue } from '@angular/common';
import { PositionOptionDescriptions } from '../../../../core/constants/positions-option-descriptions.const';
import { TechnologyOptionDescriptions } from '../../../../core/constants/technology-option-descriptions.const';

@Component({
    selector: 'app-employee-list-item',
    templateUrl: './employee-list-item.component.html',
    styleUrls: ['./employee-list-item.component.scss']
})
export class EmployeeListItemComponent {
    @Input() public employee: Employee;
    @Input() public editable: boolean;

    private professions: KeyValue<Profession, string>[] = ProfessionOptionDescriptions;
    private positions: KeyValue<Position, string>[] = PositionOptionDescriptions;
    private tecnologies: KeyValue<Technology, string>[] = TechnologyOptionDescriptions;

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
}
