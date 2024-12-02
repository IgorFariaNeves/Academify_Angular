import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../model/Aluno';
import { AlunoService } from '../../service/Aluno.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listagem-alunos',
  templateUrl: './listagem-alunos.component.html',
  styleUrl: './listagem-alunos.component.scss'
})
export class ListagemAlunosComponent implements OnInit {

  Alunos: Aluno[] = [];

  constructor(private AlunoService: AlunoService, private router: Router) { }

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
    this.router.navigate(['novo']);
  }

  editarAluno(Aluno: Aluno): void {
    this.router.navigate([`/editar`]);
  }


}





