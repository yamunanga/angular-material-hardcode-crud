import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YamunangaLayoutComponent } from './yamunanga-layout.component';

describe('YamunangaLayoutComponent', () => {
  let component: YamunangaLayoutComponent;
  let fixture: ComponentFixture<YamunangaLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YamunangaLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YamunangaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
