import { Position } from './position.enum';
import { Profession } from './profession.enum';
import { Technology } from './technology.enum';

export interface EmployeeSearchParameter {
    firstName?: string;
    lastName?: string;

    profession?: Profession;
    position?: Position;
    primaryTechnology?: Technology;


    experienceFrom?: number;
    experienceTo?: number;

    companyId?: string;
    teamId?: string;
}
