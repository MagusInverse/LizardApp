import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitulosylogrosPage } from './titulosylogros.page';

describe('TitulosylogrosPage', () => {
  let component: TitulosylogrosPage;
  let fixture: ComponentFixture<TitulosylogrosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TitulosylogrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
