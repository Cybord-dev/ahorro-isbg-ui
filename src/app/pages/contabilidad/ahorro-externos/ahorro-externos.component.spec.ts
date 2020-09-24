import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroExternosComponent } from './ahorro-externos.component';

describe('AhorroExternosComponent', () => {
  let component: AhorroExternosComponent;
  let fixture: ComponentFixture<AhorroExternosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhorroExternosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorroExternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
