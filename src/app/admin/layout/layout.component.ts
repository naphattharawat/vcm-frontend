import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  collapsible = true;
  collapse = true;
  fullname: any;
  public jwtHelper: JwtHelper = new JwtHelper();
  constructor(
    private route: Router
  ) {
    const token = sessionStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.fullname = decodedToken.fullname;

  }

  ngOnInit() {
  }

  logout() {
    sessionStorage.removeItem('token');
    this.route.navigate(['/']);
  }
}
