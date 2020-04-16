import { BaseEntity } from '../base';

export interface Characteristic extends BaseEntity {
    employeeId: string;
    author: string;
    text: string;
}
