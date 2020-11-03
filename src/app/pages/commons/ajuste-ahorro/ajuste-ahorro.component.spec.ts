import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjusteAhorroComponent } from './ajuste-ahorro.component';

describe('AjusteAhorroComponent', () => {
  let component: AjusteAhorroComponent;
  let fixture: ComponentFixture<AjusteAhorroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjusteAhorroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjusteAhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
