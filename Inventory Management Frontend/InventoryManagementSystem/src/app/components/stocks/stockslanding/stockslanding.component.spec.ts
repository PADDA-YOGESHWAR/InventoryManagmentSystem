import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockslandingComponent } from './stockslanding.component';

describe('StockslandingComponent', () => {
  let component: StockslandingComponent;
  let fixture: ComponentFixture<StockslandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockslandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockslandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
