import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Top10Page } from './top10.page';

describe('Top10Page', () => {
  let component: Top10Page;
  let fixture: ComponentFixture<Top10Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Top10Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
