import { Routes } from '@angular/router';

import { SavedPage } from './pages/saved-page/saved-page';
import { SavedAddPage } from './pages/saved-add-page/saved-add-page';
import { SavedDetailPage } from './pages/saved-detail-page/saved-detail-page';
import { HistoryPage } from './pages/history-page/history-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'saved',
    pathMatch: 'full',
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
    redirectTo: 'saved',
  },
];
