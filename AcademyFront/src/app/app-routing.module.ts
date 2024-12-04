import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemAlunosComponent } from './pages/listagem-alunos/listagem-alunos.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { NovoAlunoComponent } from './pages/novo-aluno/novo-aluno.component';
import { EditarComponent } from './pages/editar/editar.component';
import { VisualizarAlunoComponent } from './pages/visualizar-aluno/visualizar-aluno.component';

const routes: Routes = [
  {path: '', redirectTo: 'pagina-principal', pathMatch: 'full'},
  {path: 'alunos', component: ListagemAlunosComponent, title: 'Listagem de Alunos'},
  {path: 'editar-aluno/:id', component: EditarComponent, title: 'Editar Aluno'},
  {path: 'visualizar-aluno/:id', component: VisualizarAlunoComponent, title: 'Ver Aluno' },
  {path: 'pagina-principal', component: PrincipalComponent, title: 'Pagina Principal'},
  {path: 'criar-conta', component: NovoAlunoComponent, title:'Criar Conta'},
  {path: 'editar', component: EditarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
