import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YogaFitness } from './yoga-fitness';

describe('YogaFitness', () => {
  let component: YogaFitness;
  let fixture: ComponentFixture<YogaFitness>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YogaFitness]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YogaFitness);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
