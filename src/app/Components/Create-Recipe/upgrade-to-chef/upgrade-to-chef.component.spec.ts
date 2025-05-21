import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeToChefComponent } from './upgrade-to-chef.component';

describe('UpgradeToChefComponent', () => {
  let component: UpgradeToChefComponent;
  let fixture: ComponentFixture<UpgradeToChefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpgradeToChefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpgradeToChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
