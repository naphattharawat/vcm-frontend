import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage: string = null;
  isError = false;

  constructor(private route: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  doLogin() {
    if (this.username && this.password) {
      this.loginService.doCustomerLogin(this.username, this.password)
        .subscribe((data: any) => {
          if (data.ok) {
            console.log(data.token);

            sessionStorage.setItem('token', data.token);
            this.route.navigate(['/admin/products']);
          } else {
            this.isError = true;
            this.errorMessage = data.error;
          }
        }, error => {
          this.isError = true;
          this.errorMessage = 'เกิดปัญหาในการเชื่อมต่อ';
        });

    }
  }

  enterLogin(e: any) {
    if (e.keyCode === 13) {
      this.doLogin();
    }

  }
}
