import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../service/Aluno.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit {
  totalAlunos: number = 0;

  constructor(private alunoService: AlunoService, private router: Router) {}

  ngOnInit(): void {
    this.alunoService.contarAlunos().subscribe({
      next: (total) => {
        this.totalAlunos = total;
      },
      error: (erro) => {
        console.error('Erro ao buscar total de alunos', erro);
        this.totalAlunos = 0;
      }
    });
  }
  navigateToListagemAlunos() {
    this.router.navigate(['/alunos']);
  }
}

export default PrincipalComponent;