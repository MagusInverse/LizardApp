import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosPage } from './libros.page';

describe('LibrosPage', () => {
  let component: LibrosPage;
  let fixture: ComponentFixture<LibrosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LibrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
