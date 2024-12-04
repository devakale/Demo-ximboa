import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittrainerComponent } from './edittrainer.component';

describe('EdittrainerComponent', () => {
  let component: EdittrainerComponent;
  let fixture: ComponentFixture<EdittrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdittrainerComponent]
    });
    fixture = TestBed.createComponent(EdittrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
