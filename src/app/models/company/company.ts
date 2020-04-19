import { BaseEntity } from '../base';
import { CompanySize } from './company-size.enum';
import { CompanyType } from './company-type.enum';

export interface Company extends BaseEntity {
    name: string;
    description?: string;
    email?: string;
    website?: string;
    phone?: string;
    address?: string;
    type: CompanyType;
    size: CompanySize;
}
