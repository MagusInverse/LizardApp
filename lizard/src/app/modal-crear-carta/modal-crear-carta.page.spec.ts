import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCrearCartaPage } from './modal-crear-carta.page';

describe('ModalCrearCartaPage', () => {
  let component: ModalCrearCartaPage;
  let fixture: ComponentFixture<ModalCrearCartaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCrearCartaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
