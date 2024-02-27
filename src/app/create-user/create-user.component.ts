// create-user.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  newUser: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  createUser() {
    this.http.post('http://localhost:5000/add-employee', this.newUser).subscribe(() => {
      this.router.navigate(['/']); 
    });
  }
}
