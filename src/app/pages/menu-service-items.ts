import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home',
    home: true,
    link: '/layout/home',
    selected: true
  },
  {
    title: 'Start Game',
    icon: 'play-circle-outline',
    link: '/layout/new-game',

  },
  {
    title: 'Podium',
    icon: 'people-outline',
    link: '/layout/podium',

  },
];
