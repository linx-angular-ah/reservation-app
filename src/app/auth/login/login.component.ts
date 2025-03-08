import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../shared/auth.service';

@Component({
	selector: 'app-login',
  standalone: false,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	errors: any = [];

	constructor(
		private authService: AuthService,
		private router: Router
	) {}
	

	ngOnInit() {}

	login(loginForm: any) {
		this.authService.login(loginForm.value).subscribe(
			(token) => {
				this.router.navigate(['/products']);
			},
			(err: HttpErrorResponse) => {
				console.error('エラーが発生しました: ' + err);
				this.errors = err.error.errors;
			},
		);
	}
}
