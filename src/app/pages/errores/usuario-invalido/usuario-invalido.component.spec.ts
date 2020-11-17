import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInvalidoComponent } from './usuario-invalido.component';

describe('UsuarioInvalidoComponent', () => {
  let component: UsuarioInvalidoComponent;
  let fixture: ComponentFixture<UsuarioInvalidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioInvalidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioInvalidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
