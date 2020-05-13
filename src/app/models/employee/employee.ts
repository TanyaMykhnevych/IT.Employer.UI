import { BaseEntity } from '../base';
import { Company } from '../company';
import { Team } from '../team';
import { Characteristic } from './characteristic';
import { Profession } from './profession.enum';
import { Technology } from './technology.enum';
import { Position } from './position.enum';

export interface Employee extends BaseEntity {
    firstName: string;
    lastName: string;
    description?: string;
    birthDate?: Date;
    imageUrl?: string;

    profession: Profession;
    position: Position;
    primaryTechnology: Technology;
    experienceYears: number;
    characteristics?: Characteristic[];

    hourRate: number;
    hiringHourRate?: number;
    availableUntil: boolean;
    inactive: boolean;

    email?: string;
    skype?: string;
    linkedIn?: string;

    companyId?: string;
    teamId?: string;

    company?: Company;
    team?: Team;
}
