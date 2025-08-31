import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  userProfile: any = null;
  userHistory: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    
    this.apiService.getProfile().subscribe({
      next: (data) => this.userProfile = data,
      error: () => this.apiService.logout()
    });

    this.apiService.getHistory().subscribe({
      next: (data) => this.userHistory = data,
      error: (err) => console.error('Erro ao buscar histórico', err)
    });
  }

  logout() {
    this.apiService.logout();
  }
}