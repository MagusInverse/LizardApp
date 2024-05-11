import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemjuegoPage } from './itemjuego.page';

describe('ItemjuegoPage', () => {
  let component: ItemjuegoPage;
  let fixture: ComponentFixture<ItemjuegoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ItemjuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
