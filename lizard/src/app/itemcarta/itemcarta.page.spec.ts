import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemcartaPage } from './itemcarta.page';

describe('ItemcartaPage', () => {
  let component: ItemcartaPage;
  let fixture: ComponentFixture<ItemcartaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ItemcartaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
