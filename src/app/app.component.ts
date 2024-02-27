import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angulardemo';
  employee: any;
  constructor (public http: HttpClient){

    this.http.get('http://localhost:5000/employee'). subscribe(data => {
      this.employee = data;
      console.log(this.employee);
    });
  }
}
