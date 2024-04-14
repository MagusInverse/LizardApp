import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcercadePage } from './acercade.page';

describe('AcercadePage', () => {
  let component: AcercadePage;
  let fixture: ComponentFixture<AcercadePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AcercadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
