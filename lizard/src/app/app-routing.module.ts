import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'resetpass',
    loadChildren: () => import('./resetpass/resetpass.module').then( m => m.ResetpassPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./categorias/categorias.module').then( m => m.CategoriasPageModule)
  },
  {
    path: 'coleccion',
    loadChildren: () => import('./coleccion/coleccion.module').then( m => m.ColeccionPageModule)
  },
  {
    path: 'elemento',
    loadChildren: () => import('./elemento/elemento.module').then( m => m.ElementoPageModule)
  },
  {
    path: 'tarjeta',
    loadChildren: () => import('./tarjeta/tarjeta.module').then( m => m.TarjetaPageModule)
  },
  {
    path: 'acercade',
    loadChildren: () => import('./acercade/acercade.module').then( m => m.AcercadePageModule)
  },
  {
    path: 'titulosylogros',
    loadChildren: () => import('./titulosylogros/titulosylogros.module').then( m => m.TitulosylogrosPageModule)
  },
  {
    path: 'top10',
    loadChildren: () => import('./top10/top10.module').then( m => m.Top10PageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
