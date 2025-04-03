import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout-base',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout-base.component.html',
  styleUrl: './layout-base.component.css'
})
export class LayoutBaseComponent {
  user: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.authService.user$.subscribe(user => {
          this.user = user;
      });
  }

  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
