import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  userId: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteUser() {
    // Trim user input and check if userId is not empty
    const trimmedUserId = this.userId.trim();
    if (trimmedUserId === '') {
      alert('Please enter a valid User ID');
      return;
    }
  
    // Send DELETE request to the backend
    this.http.delete(`http://localhost:5000/delete-employee/${trimmedUserId}`).subscribe(
      () => {
        console.log('User deleted successfully');
        this.router.navigate(['/']); // Redirect to the main page after deleting user
      },
      (error) => {
        console.error('Error deleting user:', error);
        alert('Error deleting user. Please try again.');
      }
    );
  }  
}
