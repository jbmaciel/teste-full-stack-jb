import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesViewComponent } from './entidades-view.component';

describe('EntidadesViewComponent', () => {
  let component: EntidadesViewComponent;
  let fixture: ComponentFixture<EntidadesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntidadesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
