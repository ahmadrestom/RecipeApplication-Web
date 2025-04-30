import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSettlerComponent } from './new-settler.component';

describe('NewSettlerComponent', () => {
  let component: NewSettlerComponent;
  let fixture: ComponentFixture<NewSettlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSettlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSettlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
