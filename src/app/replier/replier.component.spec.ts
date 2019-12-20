import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplierComponent } from './replier.component';

describe('ReplierComponent', () => {
  let component: ReplierComponent;
  let fixture: ComponentFixture<ReplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
