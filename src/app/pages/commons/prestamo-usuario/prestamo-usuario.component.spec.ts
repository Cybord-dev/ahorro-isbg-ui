import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoUsuarioComponent } from './prestamo-usuario.component';

describe('PrestamosUsuarioComponent', () => {
  let component: PrestamoUsuarioComponent;
  let fixture: ComponentFixture<PrestamoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
