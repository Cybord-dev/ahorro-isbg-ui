import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosUsuarioComponent } from './prestamos-usuario.component';

describe('PrestamosUsuarioComponent', () => {
  let component: PrestamosUsuarioComponent;
  let fixture: ComponentFixture<PrestamosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamosUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
