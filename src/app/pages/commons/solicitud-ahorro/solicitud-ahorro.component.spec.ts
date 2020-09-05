import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAhorroComponent } from './solicitud-ahorro.component';

describe('SolicitudAhorroComponent', () => {
  let component: SolicitudAhorroComponent;
  let fixture: ComponentFixture<SolicitudAhorroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudAhorroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudAhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
