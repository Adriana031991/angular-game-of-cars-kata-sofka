import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: 'home',
    home: true,
    link: '/layout/home',
    // selected: true
  },
  {
    title: 'Start Game',
    icon: 'play-circle-outline',
    link: '/layout/game/new-game',

  },
  {
    title: 'Circuits',
    icon: 'people-outline',
    link: '/layout/game/table-circuit',

  },
  {
    title: 'Podium',
    icon: 'people-outline',
    link: '/layout/podium',

  },
  {
    title: 'Podium All Winners',
    icon: 'people-outline',
    link: '/layout/game/all-winners',

  },
];
