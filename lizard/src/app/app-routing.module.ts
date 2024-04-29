import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
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
  },  {
    path: 'modalpass',
    loadChildren: () => import('./modalpass/modalpass.module').then( m => m.ModalpassPageModule)
  },
  {
    path: 'modal-crear-libro',
    loadChildren: () => import('./modal-crear-libro/modal-crear-libro.module').then( m => m.ModalCrearLibroPageModule)
  },
  {
    path: 'modal-crear-figura',
    loadChildren: () => import('./modal-crear-figura/modal-crear-figura.module').then( m => m.ModalCrearFiguraPageModule)
  },
  {
    path: 'modal-crear-arma',
    loadChildren: () => import('./modal-crear-arma/modal-crear-arma.module').then( m => m.ModalCrearArmaPageModule)
  },
  {
    path: 'modal-crear-carta',
    loadChildren: () => import('./modal-crear-carta/modal-crear-carta.module').then( m => m.ModalCrearCartaPageModule)
  },
  {
    path: 'modal-crear-videojuego',
    loadChildren: () => import('./modal-crear-videojuego/modal-crear-videojuego.module').then( m => m.ModalCrearVideojuegoPageModule)
  },
  {
    path: 'modal-tarjeta',
    loadChildren: () => import('./modal-tarjeta/modal-tarjeta.module').then( m => m.ModalTarjetaPageModule)
  },
  {
    path: 'libros',
    loadChildren: () => import('./libros/libros.module').then( m => m.LibrosPageModule)
  },
  {
    path: 'figuras',
    loadChildren: () => import('./figuras/figuras.module').then( m => m.FigurasPageModule)
  },
  {
    path: 'replicasdearmas',
    loadChildren: () => import('./replicasdearmas/replicasdearmas.module').then( m => m.ReplicasdearmasPageModule)
  },
  {
    path: 'cartas',
    loadChildren: () => import('./cartas/cartas.module').then( m => m.CartasPageModule)
  },
  {
    path: 'juegos',
    loadChildren: () => import('./juegos/juegos.module').then( m => m.JuegosPageModule)
  },
  {
    path: 'itemlibro',
    loadChildren: () => import('./itemlibro/itemlibro.module').then( m => m.ItemlibroPageModule)
  },
  {
    path: 'itemfigura',
    loadChildren: () => import('./itemfigura/itemfigura.module').then( m => m.ItemfiguraPageModule)
  },
  {
    path: 'itemreplica',
    loadChildren: () => import('./itemreplica/itemreplica.module').then( m => m.ItemreplicaPageModule)
  },
  {
    path: 'itemcarta',
    loadChildren: () => import('./itemcarta/itemcarta.module').then( m => m.ItemcartaPageModule)
  },
  {
    path: 'itemjuego',
    loadChildren: () => import('./itemjuego/itemjuego.module').then( m => m.ItemjuegoPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
