import { Technology } from '../../models';
import { KeyValue } from '@angular/common';

export const TechnologyOptionDescriptions: KeyValue<Technology, string>[] = [
    { key: Technology.None, value: 'None' },

    { key: Technology.Java, value: 'Java' },
    { key: Technology.Python, value: 'Python' },
    { key: Technology.Dotnet, value: '.Net' },
    { key: Technology.NodeJs, value: 'NodeJs' },
    { key: Technology.Angular, value: 'Angular' },
    { key: Technology.React, value: 'React' },
    { key: Technology.Javascript, value: 'Javascript' },
    { key: Technology.Ruby, value: 'Ruby' },
    { key: Technology.C, value: 'C' },
    { key: Technology.CPlusPlus, value: 'C++' },
    { key: Technology.SQL, value: 'SQL' },
    { key: Technology.Swift, value: 'Swift' },
    { key: Technology.ObjectiveC, value: 'ObjectiveC' },
    { key: Technology.HTML, value: 'HTML' },
    { key: Technology.CSS, value: 'CSS' },
    { key: Technology.VR, value: 'VR' },
    { key: Technology.BigData, value: 'Big Data' },
    { key: Technology.MachineLearning, value: 'Machine Learning' },

    { key: Technology.Other, value: 'Other' },
];