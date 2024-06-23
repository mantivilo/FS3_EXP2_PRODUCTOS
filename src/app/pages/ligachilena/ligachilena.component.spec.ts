import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigachilenaComponent } from './ligachilena.component';

describe('LigachilenaComponent', () => {
  let component: LigachilenaComponent;
  let fixture: ComponentFixture<LigachilenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigachilenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigachilenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
