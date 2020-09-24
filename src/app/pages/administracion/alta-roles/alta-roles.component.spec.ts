import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaRolesComponent } from './alta-roles.component';

describe('AltaRolesComponent', () => {
  let component: AltaRolesComponent;
  let fixture: ComponentFixture<AltaRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
