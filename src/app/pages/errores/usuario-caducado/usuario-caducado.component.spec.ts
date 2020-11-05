import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCaducadoComponent } from './usuario-caducado.component';

describe('UsuarioCaducadoComponent', () => {
  let component: UsuarioCaducadoComponent;
  let fixture: ComponentFixture<UsuarioCaducadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioCaducadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCaducadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
