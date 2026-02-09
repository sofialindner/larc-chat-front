import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushNotification } from './push-notification';

describe('PushNotification', () => {
  let component: PushNotification;
  let fixture: ComponentFixture<PushNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PushNotification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushNotification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
