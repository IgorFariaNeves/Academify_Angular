import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlunoService } from '../../service/Aluno.service';
import { Aluno } from '../../../model/Aluno';

@Component({
  selector: 'app-visualizar-aluno',
  templateUrl: './visualizar-aluno.component.html',
  styleUrls: ['./visualizar-aluno.component.scss']
})
export class VisualizarAlunoComponent implements OnInit {

  aluno: Aluno | undefined;

  constructor(
    private route: ActivatedRoute, 
    private alunoService: AlunoService
  ) { }

  ngOnInit(): void {
    const alunoId = Number(this.route.snapshot.paramMap.get('id'));
    if (alunoId) {
      this.alunoService.buscarAlunoPorId(alunoId).subscribe(
        aluno => this.aluno = aluno,
        error => console.error('Erro ao carregar o aluno:', error)
      );
    }
  }
}
