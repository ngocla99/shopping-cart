import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBillComponent } from './modal-bill.component';

describe('ModalBillComponent', () => {
  let component: ModalBillComponent;
  let fixture: ComponentFixture<ModalBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
