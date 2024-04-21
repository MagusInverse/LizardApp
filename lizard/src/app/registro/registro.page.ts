import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  clave: string = "";
  correo: string = "";
  username: string = "";
  url: string = "";

  constructor() { }

  ngOnInit() {
  }

}
