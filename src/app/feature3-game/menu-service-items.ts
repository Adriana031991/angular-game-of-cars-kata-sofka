import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Home',
    icon: {icon:'fa-home', pack:'font-awesome'} ,
    home: true,
    link: '/layout/home',
  },
  {
    title: 'Start Game',
    icon: {icon:'fa-gamepad', pack:'font-awesome'},
    link: '/layout/game/new-game',

  },
  {
    title: 'Circuits',
    icon: {icon:'fa-road', pack:'font-awesome'},
    link: '/layout/game/table-circuit',

  },
  {
    title: 'Podium',
    icon: {icon:'fa-ranking-star', pack:'font-awesome'},
    link: '/layout/podium',

  },
  {
    title: 'Podium All Winners',
    icon: {icon:'fa-trophy', pack:'font-awesome'},
    link: '/layout/game/all-winners',

  },
];
