import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemreplicaPage } from './itemreplica.page';

describe('ItemreplicaPage', () => {
  let component: ItemreplicaPage;
  let fixture: ComponentFixture<ItemreplicaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ItemreplicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
