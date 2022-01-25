import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
  },  {
    path: 'popup',
    loadChildren: () => import('./popup/popup.module').then( m => m.PopupPageModule)
  },
  {
    path: 'popup',
    loadChildren: () => import('./popup/popup.module').then( m => m.PopupPageModule)
  },
  {
    path: 'testjokoa',
    loadChildren: () => import('./testjokoa/testjokoa.module').then( m => m.TestjokoaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
