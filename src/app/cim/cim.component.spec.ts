import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CimComponent } from './cim.component';

describe('CimComponent', () => {
  let component: CimComponent;
  let fixture: ComponentFixture<CimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
