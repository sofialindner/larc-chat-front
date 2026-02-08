import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMedia } from './user-media';

describe('UserMedia', () => {
  let component: UserMedia;
  let fixture: ComponentFixture<UserMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMedia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
