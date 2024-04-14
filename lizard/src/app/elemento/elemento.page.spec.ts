import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementoPage } from './elemento.page';

describe('ElementoPage', () => {
  let component: ElementoPage;
  let fixture: ComponentFixture<ElementoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ElementoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
