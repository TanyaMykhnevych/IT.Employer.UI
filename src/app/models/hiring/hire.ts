import { Company } from '../company';
import { Team } from '../team';
import { Employee } from '../employee';
import { BaseEntity } from '..';
import { HireStatus } from './hire-status';

export interface Hire extends BaseEntity {
    hiredFrom: Date;
    hiredTo: Date;

    totalHiringRate?: number;
    hireMessage: string;

    status?: HireStatus;
    approveDate?: Date;

    hiringCompanyId: string;
    companyId?: string;
    teamId?: string;
    employeeId?: string;

    hiringCompany?: Company;
    company?: Company;
    team?: Team;
    employee?: Employee;
}
