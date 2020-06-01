import { KeyValue } from '@angular/common';
import { CompanySize } from '../../../models';

export const CompanySizeDescriptions: KeyValue<CompanySize, string>[] = [
    { key: CompanySize.Small, value: 'Up to 50 employees' },
    { key: CompanySize.Medium, value: 'Up to 200 employees' },
    { key: CompanySize.Big, value: 'Up to 500 employees' },
    { key: CompanySize.Large, value: 'More than 500 employees' },
];
