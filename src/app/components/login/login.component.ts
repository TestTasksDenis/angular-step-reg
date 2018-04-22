import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  steps = 3;
  percentages = '33%';
  stepToShow = 1;
  loginForm: FormGroup;
  currentUser: object;
  currentYear = new Date().getFullYear();
  is18: boolean;

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        firstStep: new FormGroup({
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
          confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
        }),
        secondStep: new FormGroup({
          date: new FormGroup({
            dd: new FormControl('', [Validators.required, Validators.min(1), Validators.max(31)]),
            mm: new FormControl('', [Validators.required, Validators.min(1), Validators.max(12)]),
            yy: new FormControl('', [Validators.required, Validators.min(1900)]),
          }),
          gender: new FormControl('male'),
          hear: new FormControl('Internet')
        }),
      }
    );
  }

  newStep(step) {
    return this.percentages = Math.round((100 / this.steps) * step) + '%';
  }

  switchStep(step) {
    this.stepToShow = step;
    this.newStep(step);
  }

  nextStep(form, step) {
    if (form.valid) {
      this.stepToShow = step;
      this.newStep(step);
    }

    if (form.valid && step === 3) {
      this.is18 = (this.currentYear - this.loginForm.get('secondStep.date.yy').value) > 18;

      if (this.is18) {
        this.currentUser = Object.assign(this.loginForm.value.firstStep, this.loginForm.value.secondStep);
        window.localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
    }
  }
}
