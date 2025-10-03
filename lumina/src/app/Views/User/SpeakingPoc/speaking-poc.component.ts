import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-speaking-poc',
  templateUrl: './speaking-poc.component.html',
  styleUrls: ['./speaking-poc.component.scss']
})
export class SpeakingPocComponent {
  isRecording = false;
  isSubmitting = false;
  audioURL: SafeUrl | null = null;
  result: any = null;

  private audioBlob: Blob | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  startRecording(): void {
    this.isRecording = true;
    this.audioURL = null;
    this.audioBlob = null;
    this.result = null;
    this.audioChunks = [];

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.mediaRecorder.ondataavailable = event => {
          this.audioChunks.push(event.data);
        };
      }).catch(err => {
        console.error("Error accessing microphone:", err);
        this.isRecording = false;
      });
  }

  stopRecording(): void {
    if (this.mediaRecorder) {
      this.mediaRecorder.onstop = () => {
        this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(this.audioBlob);
        this.audioURL = this.sanitizer.bypassSecurityTrustUrl(url); // Sử dụng DomSanitizer để an toàn
        this.isRecording = false;
      };
      this.mediaRecorder.stop();
    }
  }

  submitForScoring(): void {
    if (!this.audioBlob) return;

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('audio', this.audioBlob, 'user-recording.wav');
    formData.append('questionId', '123'); // ID câu hỏi giả lập

    // Thay thế bằng URL API thật của bạn
    this.http.post<any>('http://localhost:5000/api/speaking/submit-answer', formData)
      .subscribe({
        next: (response) => {
          this.result = response;
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Error submitting audio:', err);
          this.isSubmitting = false;
          alert('An error occurred while submitting. Please try again.');
        }
      });
  }
}