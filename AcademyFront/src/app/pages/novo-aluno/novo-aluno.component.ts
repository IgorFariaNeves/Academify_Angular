import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlunoService } from '../../service/Aluno.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs'; // Importando firstValueFrom

@Component({
  selector: 'app-novo-aluno',
  templateUrl: './novo-aluno.component.html',
  styleUrls: ['./novo-aluno.component.scss']
})
export class NovoAlunoComponent {
  formAluno: FormGroup;
  mensagemErro: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private router: Router
  ) {
    // Inicialização do formulário com validações
    this.formAluno = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      matricula: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      nascimento: ['', [Validators.required]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.formAluno.valid) {
      try {
        const aluno = this.formAluno.value;

        if (aluno.nascimento instanceof Date) {
          aluno.nascimento = aluno.nascimento.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
        }        
  
        // Verifica se a data de nascimento é uma string ou Date e converte para o formato Date
        if (typeof aluno.nascimento === 'string') {
          aluno.nascimento = new Date(aluno.nascimento); // Converte para Date, se for string
        }

        // Fazendo a requisição para cadastrar o aluno usando firstValueFrom
        await firstValueFrom(this.alunoService.salvarAluno(aluno));
        alert('Aluno cadastrado com sucesso!');
        this.router.navigate(['/alunos']); // Redireciona após o sucesso
      } catch (erro: any) {
        this.mensagemErro =
          erro.error?.message || 'Erro ao cadastrar aluno. Tente novamente.';
      }
    } else {
      // Caso o formulário seja inválido, exibe erros nos campos
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente.';
      Object.keys(this.formAluno.controls).forEach((campo) => {
        const controle = this.formAluno.get(campo);
        if (controle?.invalid) {
          controle.markAsTouched();
        }
      });
    }
  }
}
