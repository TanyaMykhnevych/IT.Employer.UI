import { Technology } from '../employee';

export interface TeamSearchItem  {
    name?: string;
    description?: string;
    companyName?: string;
    numberOfMembers?: number;
    createdOn?: string;
    technologies?: Technology[];
}
