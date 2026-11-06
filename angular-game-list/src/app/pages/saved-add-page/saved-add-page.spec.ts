import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedAddPage } from './saved-add-page';

describe('SavedAddPage', () => {
  let component: SavedAddPage;
  let fixture: ComponentFixture<SavedAddPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedAddPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedAddPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
