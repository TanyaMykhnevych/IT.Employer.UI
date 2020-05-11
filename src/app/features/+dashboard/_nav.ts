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
    url: '/company/my-company',
    icon: 'icon-puzzle',
  },
  {
    name: 'My Employees',
    url: '',
    icon: 'icon-user',
  },
  {
    name: 'My Offers',
    url: '',
    icon: 'icon-layers',
  },
  {
    name: 'My Vacancies',
    url: '/vacancy/my',
    icon: 'icon-screen-desktop',
  },
  {
    name: 'My Teams',
    url: '',
    icon: 'icon-settings',
  },
  {
    title: true,
    name: 'Activities'
  },
  {
    name: 'IT Companies',
    url: '/company',
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
        url: '',
        icon: 'icon-cursor'
      },
      {
        name: 'Search',
        url: '',
        icon: 'icon-graph'
      },
    ]
  },
  {
    name: 'Employees',
    url: '/employees',
    icon: 'icon-people',
    children: [
      {
        name: 'Register',
        url: '/employees/register',
        icon: 'icon-user-follow',
      },
      {
        name: 'Search',
        url: '/employees/search',
        icon: 'icon-graph'
      },
    ]
  },
  {
    name: 'Vacancies',
    url: '',
    icon: 'icon-bell',
    children: [
      {
        name: 'Create',
        url: '/vacancy/create',
        icon: 'icon-pencil'
      },
      {
        name: 'Search',
        url: '/vacancy/search',
        icon: 'icon-graph'
      },
    ]
  },
];
