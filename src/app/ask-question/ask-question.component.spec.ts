import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AskQuestionComponent } from './ask-question.component'

describe('AskQuestionComponent', () => {
  let component: AskQuestionComponent;
  let fixture: ComponentFixture<AskQuestionComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AskQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
