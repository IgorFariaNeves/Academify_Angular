import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListagemAlunosComponent } from './pages/listagem-alunos/listagem-alunos.component';
import { RouterModule } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { NovoAlunoComponent } from './pages/novo-aluno/novo-aluno.component';
import { EditarComponent } from './pages/editar/editar.component';
import { MenuComponent } from './pages/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { VisualizarAlunoComponent } from './pages/visualizar-aluno/visualizar-aluno.component';

@NgModule({
  declarations: [
    AppComponent,
    ListagemAlunosComponent,
    PrincipalComponent,
    NovoAlunoComponent,
    EditarComponent,
    MenuComponent,
    VisualizarAlunoComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule, // Adicione aqui em imports
  ],
  providers: [ provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
