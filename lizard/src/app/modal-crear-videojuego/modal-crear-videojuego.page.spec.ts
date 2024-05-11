import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCrearVideojuegoPage } from './modal-crear-videojuego.page';

describe('ModalCrearVideojuegoPage', () => {
  let component: ModalCrearVideojuegoPage;
  let fixture: ComponentFixture<ModalCrearVideojuegoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCrearVideojuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
