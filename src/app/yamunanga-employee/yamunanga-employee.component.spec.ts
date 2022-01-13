import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YamunangaEmployeeComponent } from './yamunanga-employee.component';

describe('YamunangaEmployeeComponent', () => {
  let component: YamunangaEmployeeComponent;
  let fixture: ComponentFixture<YamunangaEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YamunangaEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YamunangaEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
