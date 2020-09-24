import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionSolicitudComponent } from './validacion-solicitud.component';

describe('ValidacionSolicitudComponent', () => {
  let component: ValidacionSolicitudComponent;
  let fixture: ComponentFixture<ValidacionSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidacionSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidacionSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
