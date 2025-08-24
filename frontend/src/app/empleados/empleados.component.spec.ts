import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosComponent } from './empleados.component';

describe('EmpleadosComponent', () => {
  let component: EmpleadosComponent;
  let fixture: ComponentFixture<EmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
