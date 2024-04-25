import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../services/main-service.service';

interface UsuarioTop10 {
  username: string;
  ultimo_titulo: string;
  cantidad_logros: number;
  cantidad_titulos: number;
  cantidad_items_totales: number;
}

@Component({
  selector: 'app-top10',
  templateUrl: './top10.page.html',
  styleUrls: ['./top10.page.scss'],
})
export class Top10Page implements OnInit {
  listaUsuariosTop10: UsuarioTop10[] = [];

  constructor(private mainService: MainServiceService) {}

  ngOnInit() {
    this.obtenerTop10Usuarios();
  }

  obtenerTop10Usuarios() {
    this.mainService.obtenerTop10Usuarios().subscribe(
      (data: any[]) => {
        this.listaUsuariosTop10 = data;
      },
      (error) => {
        console.error('Error al obtener top 10 usuarios:', error);
      }
    );
  }
}