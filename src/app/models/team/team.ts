import { BaseEntity } from '../base';
import { Company } from '../company';

export interface Team extends BaseEntity {
    name?: string;
    companyId: string;

    company: Company;
}
