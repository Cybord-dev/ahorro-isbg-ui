import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionAvalComponent } from './aprobacion-aval.component';

describe('AprobacionAvalComponent', () => {
  let component: AprobacionAvalComponent;
  let fixture: ComponentFixture<AprobacionAvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprobacionAvalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobacionAvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
