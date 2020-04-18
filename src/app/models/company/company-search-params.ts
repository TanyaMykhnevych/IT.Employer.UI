import { ISearchQueryParameter } from '../base';
import { CompanySize } from './company-size.enum';
import { CompanyType } from './company-type.enum';

export interface CompanySearchParameter extends ISearchQueryParameter{
    type?: CompanyType;
    size?: CompanySize;
}
