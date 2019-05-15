import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailQrComponent } from './detail-qr.component';
import {} from 'jasmine';

describe('DetailQrComponent', () => {
  let component: DetailQrComponent;
  let fixture: ComponentFixture<DetailQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
