import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalTarjetaPage } from './modal-tarjeta.page';

describe('ModalTarjetaPage', () => {
  let component: ModalTarjetaPage;
  let fixture: ComponentFixture<ModalTarjetaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalTarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
