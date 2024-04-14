import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColeccionPage } from './coleccion.page';

describe('ColeccionPage', () => {
  let component: ColeccionPage;
  let fixture: ComponentFixture<ColeccionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ColeccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
