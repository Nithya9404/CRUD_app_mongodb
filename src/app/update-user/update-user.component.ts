// update-user.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  userId: any;
  user: any = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Get the user ID from the route parameters
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }
  updateUser() {
    this.userId = this.user.Emp_id;
    console.log(this.userId)
    this.http.put(`http://localhost:5000/update-employee/${this.userId}`, this.user).subscribe(() => {
      
      this.router.navigate(['/']); // Redirect to the main page after updating user
    });
  }
}
