import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAlunoComponent } from './visualizar-aluno.component';

describe('VisualizarAlunoComponent', () => {
  let component: VisualizarAlunoComponent;
  let fixture: ComponentFixture<VisualizarAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizarAlunoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
