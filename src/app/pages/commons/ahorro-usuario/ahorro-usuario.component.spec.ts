import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroUsuarioComponent } from './ahorro-usuario.component';

describe('ReporteAhorroComponent', () => {
  let component: AhorroUsuarioComponent;
  let fixture: ComponentFixture<AhorroUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhorroUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorroUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
