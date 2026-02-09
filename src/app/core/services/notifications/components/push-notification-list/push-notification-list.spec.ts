import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushNotificationList } from './push-notification-list';

describe('PushNotificationList', () => {
  let component: PushNotificationList;
  let fixture: ComponentFixture<PushNotificationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PushNotificationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PushNotificationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
