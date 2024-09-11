import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurAccessComponent } from './utilisateur-access.component';

describe('UtilisateurAccessComponent', () => {
  let component: UtilisateurAccessComponent;
  let fixture: ComponentFixture<UtilisateurAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilisateurAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisateurAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
