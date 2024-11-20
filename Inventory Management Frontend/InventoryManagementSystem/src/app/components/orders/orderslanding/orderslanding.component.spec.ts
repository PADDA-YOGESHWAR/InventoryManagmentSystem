import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderslandingComponent } from './orderslanding.component';

describe('OrderslandingComponent', () => {
  let component: OrderslandingComponent;
  let fixture: ComponentFixture<OrderslandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderslandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderslandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
