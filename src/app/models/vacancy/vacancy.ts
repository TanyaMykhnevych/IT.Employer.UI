import { BaseEntity } from '../base';
import { Company } from '../company';
import { Position, Profession, Technology } from '../employee';

export interface Vacancy extends BaseEntity {
    name?: string;
    description?: string;

    profession: Profession;
    position: Position;
    primaryTechnology: Technology;
    experienceYears: number;

    image?: string;

    companyId?: string;

    company?: Company;
}
