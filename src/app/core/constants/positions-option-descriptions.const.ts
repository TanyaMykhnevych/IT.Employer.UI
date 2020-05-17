import { KeyValue } from '@angular/common';
import { Position } from '../../models';

export const PositionOptionDescriptions: KeyValue<Position, string>[] = [
    { key: Position.None, value: 'None' },

    { key: Position.Trainee, value: 'Trainee' },
    { key: Position.Junior, value: 'Junior' },
    { key: Position.Middle, value: 'Middle' },
    { key: Position.Senior, value: 'Senior' },

    { key: Position.Other, value: 'Other' },
];
