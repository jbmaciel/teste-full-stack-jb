import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  formSubmited = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.formSubmited = true;

    if (this.loginForm.valid) {
      this.errorMessage = null;
      console.log('Enviando credenciais:', this.loginForm.value);

      // Simulação de autenticação
      const { email, password } = this.loginForm.value;
      if (email === 'usuario@email.com' && password === '123456') {
        console.log('Login bem-sucedido!');
        return;
      } else {
        this.errorMessage = 'Email ou senha inválidos.';
      }
    }
    else {
      this.errorMessage = 'Por favor, corrija os erros no formulário.';
    }
  }
}
