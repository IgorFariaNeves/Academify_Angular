import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlunoService } from '../../service/Aluno.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {
  formAluno: FormGroup;
  mensagemErro: string = '';
  alunoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alunoService: AlunoService,
    private router: Router
  ) {
    // Inicialização do formulário sem o campo 'curso'
    this.formAluno = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      matricula: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      nascimento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Obter o ID do aluno da rota
    this.alunoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.alunoId) {
      // Carregar os dados do aluno pelo ID
      this.alunoService.buscarAlunoPorId(this.alunoId).subscribe(
        (aluno) => {
          this.formAluno.patchValue({
            nome: aluno.nome,
            matricula: aluno.matricula,
            nascimento: aluno.nascimento, // Verifique o formato da data
          });
        },
        (erro) => {
          this.mensagemErro = 'Erro ao carregar dados do aluno.';
        }
      );
    }
  }

  onSubmit(): void {
    if (this.formAluno.valid && this.alunoId !== null) {
      // Pegando os dados do formulário e adicionando o ID
      const aluno = {
        ...this.formAluno.value,
        id: this.alunoId, // Inclui o ID no JSON enviado
      };
  
      this.alunoService.atualizarAluno(aluno).subscribe(
        () => {
          alert('Aluno atualizado com sucesso!');
          this.router.navigate(['/alunos']); // Redireciona após sucesso
        },
        (erro) => {
          console.error('Erro ao atualizar o aluno:', erro);
          this.mensagemErro = 'Erro ao atualizar o aluno.';
        }
      );
    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente.';
    }
  }
  
}
