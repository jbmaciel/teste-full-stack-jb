import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-base',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout-base.component.html',
  styleUrl: './layout-base.component.css'
})
export class LayoutBaseComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
