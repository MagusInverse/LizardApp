import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemfiguraPage } from './itemfigura.page';

describe('ItemfiguraPage', () => {
  let component: ItemfiguraPage;
  let fixture: ComponentFixture<ItemfiguraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ItemfiguraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
