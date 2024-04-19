import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaPage } from './tarjeta.page';

describe('TarjetaPage', () => {
  let component: TarjetaPage;
  let fixture: ComponentFixture<TarjetaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TarjetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
