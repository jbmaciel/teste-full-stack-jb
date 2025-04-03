import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LayoutBaseComponent } from './components/layout-base/layout-base.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutBaseComponent,
    canActivate: [AuthGuard], //Protegendo as rotas
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // Lazy loading de módulos
      { path: 'entidades', loadChildren: () => import('./modules/entidades/entidades.module').then(m => m.EntidadesModule) }

    ],
  },
  { path: '**', redirectTo: '/login' },
];
