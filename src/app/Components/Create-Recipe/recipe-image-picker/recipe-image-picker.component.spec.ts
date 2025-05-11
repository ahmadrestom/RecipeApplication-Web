import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeImagePickerComponent } from './recipe-image-picker.component';

describe('RecipeImagePickerComponent', () => {
  let component: RecipeImagePickerComponent;
  let fixture: ComponentFixture<RecipeImagePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeImagePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeImagePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
