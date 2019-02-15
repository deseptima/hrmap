import { Component } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import * as emailjs from 'emailjs-com'
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.less']
})
export class AskQuestionComponent {
  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    // console.log(value);
  };


  constructor(private fb: FormBuilder,
    private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      sender: ['', [Validators.required]],
      topic: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      description1: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  send() {
    var user_id = 'user_o4uC1vQCe4ApaSpQSJEH4'
    var service_id = 'gmail';
    var template_id = 'test';
    var template_params = {
      topic: this.validateForm.controls.topic.value,
      sender: this.validateForm.controls.sender.value,
      content: this.validateForm.controls.description1.value,
      email: this.validateForm.controls.email.value
    };
    emailjs.init(user_id)
    emailjs.send(service_id, template_id, template_params).then(
      res => {
        this.createNotification('success')
      },
      error => {
        this.createNotification('error')
      }
    );
  }

  createNotification(type: string): void {
    this.notification.create(type, 'Success',
      'อีเมลของคุณได้ถูกส่งเรียบร้อยแล้ว.');
  }
}
