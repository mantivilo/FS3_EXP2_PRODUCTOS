import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaChilenaComponent } from './ligachilena.component';

describe('LigachilenaComponent', () => {
  let component: LigaChilenaComponent;
  let fixture: ComponentFixture<LigaChilenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LigaChilenaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LigaChilenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
