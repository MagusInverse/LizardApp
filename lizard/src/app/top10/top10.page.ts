import { Component, OnInit } from '@angular/core';
import { Usuario } from '../services/usuario';

  interface Categoria {
    nombreCategoria: string;
    cantidad_items: number;
  }

  interface UsuarioTop10 {
    username: string;
    ultimo_titulo: string;
    cantidad_logros: number;
    cantidad_titulos: number;
    cantidad_items_totales: number;
    url_foto: string;
    fecha_registro: string;
    lista_categorias: Categoria[];
  }

@Component({
  selector: 'app-top10',
  templateUrl: './top10.page.html',
  styleUrls: ['./top10.page.scss'],

})


export class Top10Page implements OnInit {
  // lista de usuarios a mostrar en la tabla por cada fila
  listaUsuariosTop10: UsuarioTop10[] = [] // usar endpoint de obtener top 10 para obtener esta lista

  constructor() { }

  ngOnInit() {
    // ejemplo de como se puede llenar la lista de usuarios
    this.listaUsuariosTop10 = [
      {"username": "prueba1", "ultimo_titulo": "novato", "cantidad_logros": 2, "cantidad_titulos": 1, "cantidad_items_totales": 20, "url_foto": "https://www.google.com", "fecha_registro": "2024-04-23", "lista_categorias": [{"nombreCategoria": "libros", "cantidad_items": 20}]},

      {"username": "prueba2", "ultimo_titulo": "novato", "cantidad_logros": 2, "cantidad_titulos": 1, "cantidad_items_totales": 5, "url_foto": "https://www.google.com", "fecha_registro": "2024-04-23", "lista_categorias": [{"nombreCategoria": "libros", "cantidad_items": 5}]}
    ]
  }

}

