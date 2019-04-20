import { AlertService } from './../../alert.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users = [];
  modalAddUser = false;
  modalEditUser = false;
  prename: any = '';
  fname: any;
  lname: any;
  username: any;
  password: any;
  status: any;
  isUpdate = false;
  userId: any;
  constructor(
    private usersService: UsersService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  addUser() {
    this.prename = '';
    this.fname = '';
    this.lname = '';
    this.username = '';
    this.password = '';
    this.status = '';
    this.modalAddUser = true;
  }

  edit(u) {
    this.userId = u.user_id;
    this.isUpdate = true;
    this.prename = u.prename;
    this.fname = u.name;
    this.lname = u.lname;
    this.username = u.username;
    this.password = '';
    this.status = u.status;
    this.modalEditUser = true;
  }

  async save() {
    try {
      const obj: any = {
        prename: this.prename,
        name: this.fname,
        lname: this.lname,
        username: this.username,
        password: this.password,
        status: this.status
      };
      await this.usersService.save(obj);
      await this.getUser();
      this.modalAddUser = false;
      this.alertService.success();
    } catch (error) {
      this.modalAddUser = false;
      console.log(error);
      this.alertService.serverError();
    }
  }

  async update(u) {
    try {
      const obj: any = {
        prename: this.prename,
        name: this.fname,
        lname: this.lname,
        username: this.username,
        status: this.status
      };
      if (this.password && this.password === '') {
        obj.password = this.password;
      }
      await this.usersService.update(this.userId, obj);
      await this.getUser();
      this.modalEditUser = false;
      this.alertService.success();
    } catch (error) {
      this.modalEditUser = false;
      console.log(error);
      this.alertService.serverError();
    }
  }

  async remove(u) {
    try {
      this.alertService.confirm('คุณต้องการที่จะลบ ใช่หรือไม่?').then(async (result) => {
        if (result.value) {
          await this.usersService.remove(u.user_id);
          await this.getUser();
          this.alertService.success();
        }
      });
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }

  async getUser() {
    try {
      const rs: any = await this.usersService.list();
      if (rs.ok) {
        this.users = rs.rows;
      }
    } catch (error) {
      console.log(error);
      this.alertService.serverError();
    }
  }


}
