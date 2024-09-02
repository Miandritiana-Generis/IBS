import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Presence',
  },
  {
    displayName: 'Programme',
    iconName: 'calendar',
    route: '/programme',
  },
  {
    displayName: 'Fiche de presence',
    iconName: 'list',
    route: '/fiche-presence',
  },
  {
    navCap: 'PAT',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'Liste Absence',
    iconName: 'user-x',
    route: '/liste-absence',
  },
];
