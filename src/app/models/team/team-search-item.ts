import { Technology } from '../employee';

export interface TeamSearchItem  {
    id?: string;
    name?: string;
    description?: string;
    companyName?: string;
    companyId?: string;
    numberOfMembers?: number;
    createdOn?: string;
    technologies?: Technology[];
    hourHiringRate: number;
}
