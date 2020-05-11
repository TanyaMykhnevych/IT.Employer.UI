import { BaseEntity } from '../base';
import { Company } from '../company';
import { Employee } from '../employee';

export interface Team extends BaseEntity {
    name?: string;
    companyId: string;

    company: Company;
    members: Employee[];
}
