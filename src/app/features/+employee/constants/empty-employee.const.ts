import { Employee, Position, Technology, Profession } from '../../../models';

export const EmptyEmployee: Employee = {
    experienceYears: null,
    firstName: null,
    lastName: null,

    availableUntil: null,
    hourRate: null,
    inactive: false,

    position: Position.None,
    primaryTechnology: Technology.None,
    profession: Profession.None
};
