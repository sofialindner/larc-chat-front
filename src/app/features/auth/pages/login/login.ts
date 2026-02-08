import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthStore, User, UserLogin } from 'core/auth';
import { NgxMaskDirective } from "ngx-mask";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authStore: AuthStore,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      id: new FormControl<string>('', Validators.required),
      password: new FormControl<string>('', Validators.required),
    });
  }

  onLogin() {
    const id = Number(this.form.get('id')?.value)
    this.authService.login({ ...this.form.value, id } as UserLogin).subscribe({
      next: (user: User) => {
        this.authStore.setCurrentUser(user);
        this.router.navigate(['chats']);
      },
    });
  }
}
