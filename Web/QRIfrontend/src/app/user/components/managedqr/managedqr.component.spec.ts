import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedqrComponent } from './managedqr.component';

describe('ManagedqrComponent', () => {
  let component: ManagedqrComponent;
  let fixture: ComponentFixture<ManagedqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagedqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagedqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
