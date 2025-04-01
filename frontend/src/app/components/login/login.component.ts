import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  submitted = false; // Indica se o usuário já tentou enviar o formulário
  loading = false; // Indica se o formulário está sendo enviado | Usaremos para exibir um indicador de carregamento.
  showPassword = false; // Indica se a senha deve ser exibida em texto claro ou não
  loginFailed = false; // Flag para erro de login


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verifica se o usuário já está autenticado
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']); // Redireciona para o dashboard
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.submitted = true; // Marca que o formulário foi enviado ao menos uma vez
    this.loginFailed = false; // Resetando erro de login antes da tentativa

    if (this.loginForm.valid) {
      this.loading = true; // Inicia o carregamento
      this.errorMessage = null;

      // Simulação de autenticação
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          console.log('Login bem-sucedido!');
          this.loading = false; // Finaliza o carregamento
          this.authService.loadUser();
          this.router.navigate(['/dashboard']); // Redireciona para a página inicial após o login
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.loading = false;
          this.loginFailed = true; // Marca erro para exibir feedback nos campos
        }
      });
    }
    else {
      this.errorMessage = 'Dados incorretos. Por favor, revise seus dados e tente novamente.';
    }
  }
}
