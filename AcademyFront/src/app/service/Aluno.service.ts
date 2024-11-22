import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../../model/Aluno';
@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiURL = 'http://localhost:8080/api/aluno'; 
  constructor(private http: HttpClient) { }
  listarAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiURL);
  }

  buscarAlunoPorId(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiURL}/${id}`);
  }

  salvarAluno(Aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiURL, Aluno);
  }

  atualizarAluno(id: number, Aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiURL}/${id}`, Aluno);
  }

  excluirAluno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}









