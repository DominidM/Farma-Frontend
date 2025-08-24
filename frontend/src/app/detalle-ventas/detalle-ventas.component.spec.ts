import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVentasComponent } from './detalle-ventas.component';

describe('DetalleVentasComponent', () => {
  let component: DetalleVentasComponent;
  let fixture: ComponentFixture<DetalleVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleVentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
