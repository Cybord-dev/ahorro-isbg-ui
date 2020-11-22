import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesPrestamoComponent } from './tramites-prestamo.component';

describe('TramitesPrestamoComponent', () => {
  let component: TramitesPrestamoComponent;
  let fixture: ComponentFixture<TramitesPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesPrestamoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
