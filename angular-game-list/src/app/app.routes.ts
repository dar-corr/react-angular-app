import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { GamesPage } from './pages/games-page/games-page';
import { GameDetailPage } from './pages/game-detail-page/game-detail-page';
import { AboutPage } from './pages/about-page/about-page';
import { SavedPage } from './pages/saved-page/saved-page';
import { SavedAddPage } from './pages/saved-add-page/saved-add-page';
import { SavedDetailPage } from './pages/saved-detail-page/saved-detail-page';
import { HistoryPage } from './pages/history-page/history-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    pathMatch: 'full',
  },
  {
    path: 'games',
    component: GamesPage,
  },
  {
    path: 'games/:id',
    component: GameDetailPage,
  },
  {
    path: 'about',
    component: AboutPage,
  },
  {
    path: 'saved',
    component: SavedPage,
  },
  {
    path: 'saved/add',
    component: SavedAddPage,
  },
  {
    path: 'saved/:id',
    component: SavedDetailPage,
  },
  {
    path: 'history',
    component: HistoryPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
