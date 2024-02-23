import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/interface/api-response';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  studentForm!: FormGroup;
  isRegistered: boolean = false; // Variable to track registration status
  response:string = '';
  countdownTime!: number;
  constructor(private studentService: ServiceService) {}

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      'fullName': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'aboutYourSelf': new FormControl('', [Validators.required])
    });

    // Calculate remaining time until webinar starts (in milliseconds)
    const webinarStartTime = new Date('2024-03-02T19:00:00').getTime();
    const currentTime = new Date().getTime();
    this.countdownTime = webinarStartTime - currentTime;

    // Update countdown timer every second
    setInterval(() => {
      this.countdownTime -= 1000; // Decrease countdown time by 1 second
    }, 1000);
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.studentService.saveStudentData(this.studentForm.value).subscribe({
        next: (response: ApiResponse) => {
          this.response = response.message;
          this.isRegistered = true; // Set isRegistered to true after successful registration
        },
        error: (error) => {
          this.response = error.error.message;
          alert(this.response);
        }
      });
    } else {
      alert('Form is invalid. Please check the fields.');
    }
  }
  formatCountdownTime(): string {
    // Format remaining time into hours, minutes, and seconds
    const hours = Math.floor(this.countdownTime / (1000 * 60 * 60));
    const minutes = Math.floor((this.countdownTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((this.countdownTime % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
