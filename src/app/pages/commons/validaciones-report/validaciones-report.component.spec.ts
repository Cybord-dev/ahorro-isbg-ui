import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionesReportComponent } from './validaciones-report.component';

describe('ValidacionesReportComponent', () => {
  let component: ValidacionesReportComponent;
  let fixture: ComponentFixture<ValidacionesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidacionesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
