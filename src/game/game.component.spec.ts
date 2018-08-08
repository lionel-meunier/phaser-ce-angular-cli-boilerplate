import { TestBed, async } from '@angular/core/testing';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent
      ]
    }).compileComponents();
  }));
  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(GameComponent);
    const app = fixture.debugElement.componentInstance;
    console.log('create component',app);
    expect(app).toBeTruthy();

  }));
});
