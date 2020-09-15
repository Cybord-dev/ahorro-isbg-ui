import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitesAhorroComponent } from './tramites-ahorro.component';

describe('TramitesAhorroComponent', () => {
  let component: TramitesAhorroComponent;
  let fixture: ComponentFixture<TramitesAhorroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitesAhorroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitesAhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
