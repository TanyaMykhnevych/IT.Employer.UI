import { BaseEntity } from '../base';
import { Company } from '../company';
import { Profession, Technology } from '../employee';

export interface Vacancy extends BaseEntity {
    name?: string;
    description?: string;

    profession: Profession;
    position: Position;
    primaryTechnology: Technology;
    experienceYears: number;

    companyId: string;

    company: Company;
}
