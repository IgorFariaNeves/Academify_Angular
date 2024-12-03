import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../model/Aluno';
import { AlunoService } from '../../service/Aluno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-alunos',
  templateUrl: './listagem-alunos.component.html',
  styleUrls: ['./listagem-alunos.component.scss']
})
export class ListagemAlunosComponent implements OnInit {

  Alunos: Aluno[] = [];
  filteredAlunos: Aluno[] = [];  // Lista filtrada
  displayedColumns: string[] = ['id', 'nome', 'matricula', 'nascimento', 'dataHoraCadastro', 'actions'];
  searchQuery: string = ''; // A query de pesquisa

  constructor(private AlunoService: AlunoService, private router: Router) { }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.AlunoService.listarAlunos()
      .subscribe(
        data => {
          this.Alunos = data;
          this.filteredAlunos = [...data]; // Inicializa a lista filtrada com todos os alunos
        },
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
    this.router.navigate([`/editar-aluno/${Aluno.id}`]);
  }

  // Método para visualizar o aluno
  verAluno(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate([`/visualizar-aluno/${id}`]);
    }
  }

  // Método para filtrar os alunos
  applyFilter(): void {
    const filterValue = this.searchQuery.trim().toLowerCase(); // Remove espaços extras e converte para minúsculas
    if (filterValue) {
      this.filteredAlunos = this.Alunos.filter(aluno => 
        aluno.nome.toLowerCase().includes(filterValue) || 
        aluno.matricula.includes(filterValue) || 
        aluno.nascimento.toLocaleDateString().includes(filterValue) ||  
        aluno.dataHoraCadastro.toLocaleDateString().includes(filterValue)
      );
    } else {
      this.filteredAlunos = [...this.Alunos]; // Se não houver pesquisa, mostra todos os alunos
    }
  }
}
