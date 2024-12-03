import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../model/Aluno';
import { AlunoService } from '../../service/Aluno.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VisualizarAlunoComponent } from '../visualizar-aluno/visualizar-aluno.component';  // Componente de Visualização

@Component({
  selector: 'app-listagem-alunos',
  templateUrl: './listagem-alunos.component.html',
  styleUrls: ['./listagem-alunos.component.scss']
})
export class ListagemAlunosComponent implements OnInit {

  Alunos: Aluno[] = [];
  displayedColumns: string[] = ['id', 'nome', 'matricula', 'nascimento', 'dataHoraCadastro', 'actions'];

  constructor(private AlunoService: AlunoService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.AlunoService.listarAlunos()
      .subscribe(
        data => this.Alunos = data,
        error => console.error('Erro ao carregar Alunos:', error)
      );
  }

  excluirAluno(id: number | undefined): void {
    if (id !== undefined) {
      if (confirm('Tem certeza que deseja excluir este Aluno?')) {
        this.AlunoService.excluirAluno(id)
          .subscribe(
            () => this.carregarAlunos(),
            error => console.error('Erro ao excluir Aluno:', error)
          );
      }
    }
  }

  novoAluno(): void {
    this.router.navigate(['/criar-conta']);
  }

  editarAluno(aluno: Aluno): void {
    this.router.navigate([`/editar-aluno/${aluno.id}`]);
  }

  visualizarAluno(aluno: Aluno): void {
    this.dialog.open(VisualizarAlunoComponent, {
      data: aluno
    });
  }
}
