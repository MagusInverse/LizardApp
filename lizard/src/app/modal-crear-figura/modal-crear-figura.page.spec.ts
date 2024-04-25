import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCrearFiguraPage } from './modal-crear-figura.page';

describe('ModalCrearFiguraPage', () => {
  let component: ModalCrearFiguraPage;
  let fixture: ComponentFixture<ModalCrearFiguraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCrearFiguraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
