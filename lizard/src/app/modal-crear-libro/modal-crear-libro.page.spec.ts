import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCrearLibroPage } from './modal-crear-libro.page';

describe('ModalCrearLibroPage', () => {
  let component: ModalCrearLibroPage;
  let fixture: ComponentFixture<ModalCrearLibroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCrearLibroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
