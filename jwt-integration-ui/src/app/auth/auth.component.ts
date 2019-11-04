import { Component, OnInit } from "@angular/core";
import { NgForm, FormsModule } from "@angular/forms";
import { AuthService } from "./auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  status: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

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
        this.changeClass();
      },
      error => {
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
          this.router.navigate(["/"])
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );

    form.reset();
  }

  changeClass(){
    this.status = !this.status;       
  }

}
