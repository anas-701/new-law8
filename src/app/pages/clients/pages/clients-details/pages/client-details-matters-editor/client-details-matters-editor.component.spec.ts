import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsMattersEditorComponent } from './client-details-matters-editor.component';

describe('ClientDetailsMattersEditorComponent', () => {
  let component: ClientDetailsMattersEditorComponent;
  let fixture: ComponentFixture<ClientDetailsMattersEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDetailsMattersEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDetailsMattersEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
