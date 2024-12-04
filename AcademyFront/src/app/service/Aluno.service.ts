import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../../model/Aluno';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiURL = 'http://localhost:8080/api/aluno'; 
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  listarAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiURL);
  }

  buscarAlunoPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiURL}/${id}`);
  }

  salvarAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiURL, aluno, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error('Erro ao salvar aluno:', error);
        return throwError(() => new Error(error.error?.message || 'Erro desconhecido'));
      })
    );
  }
  

  atualizarAluno(aluno: any): Observable<any> {
    return this.http.put('http://localhost:8080/api/aluno', aluno);
  }
  

  excluirAluno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }
  contarAlunos(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/total`);
  }
  private handleError(error: any) {
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Algo deu errado!'));
  }
}
