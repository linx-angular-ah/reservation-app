import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './shared/auth.service';

const routes: Routes = [
  // {
  //   path: 'auth', component: AuthComponent,
  //   children: [
  //     { path: 'login', component: LoginComponent },
  //     { path: 'register', component: RegisterComponent },
  //   ]
  // }
  // 下記にした場合はauth.component関係は不要となる
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthService
  ],
})
export class AuthModule { }
