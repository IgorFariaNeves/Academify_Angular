import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  filteredAlunos: MatTableDataSource<Aluno> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nome', 'matricula', 'nascimento', 'dataHoraCadastro', 'actions'];
  searchQuery: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private AlunoService: AlunoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos(): void {
    this.AlunoService.listarAlunos().subscribe(
      data => {
        this.Alunos = data;
        this.filteredAlunos = new MatTableDataSource<Aluno>(this.Alunos);
        this.filteredAlunos.paginator = this.paginator;
        this.filteredAlunos.filterPredicate = (data: Aluno, filter: string) => {
          const searchTerms = filter.split(' ');
          return searchTerms.every(term => 
            (data.nome?.toLowerCase().includes(term) || '') ||
            (data.matricula?.toString().includes(term) || '') ||
            (data.id?.toString().includes(term) || '')
          );
        };
      },
      error => console.error('Erro ao carregar Alunos:', error)
    );
  }

  excluirAluno(id: number | undefined): void {
    if (id !== undefined) {
      if (confirm('Tem certeza que deseja excluir este Aluno?')) {
        this.AlunoService.excluirAluno(id).subscribe(
          () => this.carregarAlunos(),
          error => console.error('Erro ao excluir Aluno:', error)
        );
      }
    }
  }

  novoAluno(): void {
    this.router.navigate(['novo']);
  }

  editarAluno(aluno: Aluno): void {
    this.router.navigate([`/editar-aluno/${aluno.id}`]);
  }

  verAluno(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate([`/visualizar-aluno/${id}`]);
    }
  }

  applyFilter(): void {
    const filterValue = this.searchQuery.trim().toLowerCase();
    this.filteredAlunos.filter = filterValue;
  }
}
