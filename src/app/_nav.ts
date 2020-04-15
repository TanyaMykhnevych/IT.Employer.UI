import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Profile'
  },
  {
    name: 'My Company',
    url: '/mycompany',
    icon: 'icon-puzzle',
  },
  {
    name: 'My Employees',
    url: '/myemployees',
    icon: 'icon-user',
  },
  {
    name: 'My Offers',
    url: '/myoffers',
    icon: 'icon-layers',
  },
  {
    name: 'My Vacancies',
    url: '/myvacancies',
    icon: 'icon-screen-desktop',
  },
  {
    name: 'My Teams',
    url: '/base',
    icon: 'icon-settings',
  },
  {
    title: true,
    name: 'Activities'
  },
  {
    name: 'IT Companies',
    url: '/base',
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Register',
        url: '/company/register',
        icon: 'icon-puzzle'
      },
      {
        name: 'Search',
        url: '/company/search',
        icon: 'icon-graph'
      },
    ]
  },
  {
    name: 'Teams',
    url: '/buttons',
    icon: 'icon-cursor',
    badge: {
      variant: 'success',
      text: 'NEW'
    },
    children: [
      {
        name: 'Register',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Search',
        url: '/buttons/dropdowns',
        icon: 'icon-graph'
      },
    ]
  },
  {
    name: 'Employees',
    url: '/icons',
    icon: 'icon-people',
    children: [
      {
        name: 'Register',
        url: '/icons/coreui-icons',
        icon: 'icon-user-follow',
      },
      {
        name: 'Search',
        url: '/icons/flags',
        icon: 'icon-graph'
      },
    ]
  },
  {
    name: 'Vacancies',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Create',
        url: '/notifications/alerts',
        icon: 'icon-pencil'
      },
      {
        name: 'Search',
        url: '/notifications/badges',
        icon: 'icon-graph'
      },
    ]
  },
];
