import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FigurasPage } from './figuras.page';

describe('FigurasPage', () => {
  let component: FigurasPage;
  let fixture: ComponentFixture<FigurasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FigurasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
