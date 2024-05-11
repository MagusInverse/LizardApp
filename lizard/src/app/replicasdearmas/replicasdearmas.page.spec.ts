import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplicasdearmasPage } from './replicasdearmas.page';

describe('ReplicasdearmasPage', () => {
  let component: ReplicasdearmasPage;
  let fixture: ComponentFixture<ReplicasdearmasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReplicasdearmasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
