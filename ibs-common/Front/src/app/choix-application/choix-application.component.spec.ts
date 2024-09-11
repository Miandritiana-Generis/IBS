import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixApplicationComponent } from './choix-application.component';

describe('ChoixApplicationComponent', () => {
  let component: ChoixApplicationComponent;
  let fixture: ComponentFixture<ChoixApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoixApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoixApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
