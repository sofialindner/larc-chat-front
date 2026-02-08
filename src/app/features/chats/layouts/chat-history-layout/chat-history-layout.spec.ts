import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHistoryLayout } from './chat-history-layout';

describe('ChatHistoryLayout', () => {
  let component: ChatHistoryLayout;
  let fixture: ComponentFixture<ChatHistoryLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatHistoryLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatHistoryLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
