import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemAlunosComponent } from './pages/listagem-alunos/listagem-alunos.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { NovoAlunoComponent } from './pages/novo-aluno/novo-aluno.component';
import { EditarComponent } from './pages/editar/editar.component';
import { VisualizarAlunoComponent } from './pages/visualizar-aluno/visualizar-aluno.component';

const routes: Routes = [
  {path: 'alunos', component: ListagemAlunosComponent},
  {path: 'editar-aluno/:id', component: EditarComponent},
  {path: 'visualizar-aluno/:id', component: VisualizarAlunoComponent},
  {path: '', component: PrincipalComponent},
  {path: 'criar-conta', component: NovoAlunoComponent},
  {path: 'editar', component: EditarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
