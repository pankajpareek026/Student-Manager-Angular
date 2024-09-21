import { Component, OnInit } from '@angular/core';
import { last, map } from 'rxjs';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllStudents()
  }

  studentList: Student[] = [];

  studentObj: Student = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  }

  id: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  mobile: string = '';



  logout() {
    this.auth.logout()
  }

  getAllStudents() {
    this.data.getAllStudents().subscribe((res: any) => {
      this.studentList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
    })
  }


  addStudent() {
    if (this.firstName == '' || this.lastName == '' || this.email == '' || this.mobile == '') {
      alert("fill the all input field")
      return;
    }
    this.studentObj.firstName = this.firstName;
    this.studentObj.lastName = this.lastName;
    this.studentObj.email = this.email;
    this.studentObj.mobile = this.mobile;

    this.data.addStudent(this.studentObj)


  }


  deleteStudent(student: Student) {
    if (window.confirm("Are you sure ?"))
      this.data.deleteStudent(student)


  }
}
