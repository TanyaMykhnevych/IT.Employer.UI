import { KeyValue } from '@angular/common';
import { Profession } from '../../models';

export const ProfessionOptionDescriptions: KeyValue<Profession, string>[] = [
    { key: Profession.None, value: 'None' },

    { key: Profession.WebDeveloper, value: 'Web Developer' },
    { key: Profession.GameDeveloper, value: 'Game Developer' },
    { key: Profession.Developer, value: 'Developer' },
    { key: Profession.ITConsultant, value: 'IT Consultant' },
    { key: Profession.Architect, value: 'Architect' },
    { key: Profession.ProjectManager, value: 'Project Manager' },
    { key: Profession.DatabaseAdministrator, value: 'Database Administrator' },
    { key: Profession.QA, value: 'QA' },
    { key: Profession.InformationSecuritySpecialist, value: 'Information Security Specialist' },
    { key: Profession.BusinessAnalyst, value: 'Business Analyst' },
    { key: Profession.DataAnalyst, value: 'Data Analyst' },
    { key: Profession.Designer, value: 'Designer' },
    { key: Profession.SystemAdministrator, value: 'System Administrator' },
    { key: Profession.DevOps, value: 'DevOps' },

    { key: Profession.Other, value: 'Other' },
];