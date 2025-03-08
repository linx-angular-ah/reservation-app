import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
	selector: 'app-register',
  standalone: false,
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	errors: any = [];

	constructor(
		private authService: AuthService,
		private router: Router
	) {}
	
	ngOnInit() {}

	register(registerForm: any) {
		this.authService.register(registerForm.value).subscribe(
			(result) => {
				console.log('登録成功');
				this.router.navigate(['/login']);
			},
			(err: HttpErrorResponse) => {
				console.error('エラーが発生しました: ' + err);
				this.errors = err.error.errors;
			},
		);
	}

}
