import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemlibroPage } from './itemlibro.page';

describe('ItemlibroPage', () => {
  let component: ItemlibroPage;
  let fixture: ComponentFixture<ItemlibroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ItemlibroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
