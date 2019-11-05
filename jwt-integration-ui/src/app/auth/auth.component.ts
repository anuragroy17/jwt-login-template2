import { Component, OnInit } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";
import { AuthService } from "./auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  status: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
  }
  

  onSignUp(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email: string = form.value.email;
    const fullName: string = form.value.fullName;
    const username: string = form.value.username;
    const password: string = form.value.password;

    this.authService.signup(email, fullName, username, password).subscribe(
      resData => {
        this.toastr.success("Sign Up", "Successfull");
        this.changeClass();
      },
      error => {
        this.toastr.error("Error Occurred!")
        console.log(JSON.stringify(error));
      }
    );

    form.reset();
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const username: string = form.value.username;
    const password: string = form.value.password;

    this.authService.login(username, password).subscribe(
      resData => {
        this.toastr.success("Login", "Successfull");
        this.router.navigate(["/"])
      },
      error => {
        this.toastr.error("Error Occurred!")
        console.log(JSON.stringify(error));
      }
    );

    form.reset();
  }

  changeClass(){
    this.status = !this.status;       
  }

}
