import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuegosPage } from './juegos.page';

describe('JuegosPage', () => {
  let component: JuegosPage;
  let fixture: ComponentFixture<JuegosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JuegosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
