import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleComprasComponent } from './detalle-compras.component';

describe('DetalleComprasComponent', () => {
  let component: DetalleComprasComponent;
  let fixture: ComponentFixture<DetalleComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleComprasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
