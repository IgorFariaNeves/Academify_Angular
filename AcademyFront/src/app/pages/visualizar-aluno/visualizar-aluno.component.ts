import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Aluno } from '../../../model/Aluno';

@Component({
  selector: 'app-visualizar-aluno',
  templateUrl: './visualizar-aluno.component.html',
  styleUrls: ['./visualizar-aluno.component.scss']
})
export class VisualizarAlunoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public aluno: Aluno) { }
}
