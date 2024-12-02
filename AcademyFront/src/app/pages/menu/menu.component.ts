import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isUsuarioLogado: boolean = false;

  constructor() {
    // Simulação de autenticação
    const token = localStorage.getItem('authToken');
    this.isUsuarioLogado = !!token;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isUsuarioLogado = false;
    alert('Logout realizado com sucesso!');
  }
}
