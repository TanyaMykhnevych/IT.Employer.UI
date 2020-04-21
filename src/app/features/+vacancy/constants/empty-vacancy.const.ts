import { Vacancy, Profession, Position, Technology } from '../../../models';

export const EmptyVacancy: Vacancy = {
    name: null,
    description: null,

    profession: Profession.None,
    position: Position.None,
    primaryTechnology: Technology.None,
    experienceYears: null,
};
