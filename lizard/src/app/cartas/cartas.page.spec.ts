import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartasPage } from './cartas.page';

describe('CartasPage', () => {
  let component: CartasPage;
  let fixture: ComponentFixture<CartasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CartasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
