import { ISearchQueryParameter } from '../base';

export interface TeamSearchParameter extends ISearchQueryParameter {
    companyId?: string;
    minNumberOfMembers?: number;
    maxNumberOfMembers?: number;
    searchTerm?: string;
}
