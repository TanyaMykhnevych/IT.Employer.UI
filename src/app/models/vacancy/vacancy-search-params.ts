import { ISearchQueryParameter } from '../base';
import { Profession, Technology, Position } from '../employee';

export interface VacancySearchParameter extends ISearchQueryParameter{
    profession?: Profession;
    position?: Position;
    primaryTechnology?: Technology;

    myVacancies?: boolean;

    experienceFrom?: number;
    experienceTo?: number;
}
