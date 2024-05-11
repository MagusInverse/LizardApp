import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCrearArmaPage } from './modal-crear-arma.page';

describe('ModalCrearArmaPage', () => {
  let component: ModalCrearArmaPage;
  let fixture: ComponentFixture<ModalCrearArmaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalCrearArmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
