import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalpassPage } from './modalpass.page';

describe('ModalpassPage', () => {
  let component: ModalpassPage;
  let fixture: ComponentFixture<ModalpassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
