// File: src/app/Services/Speaking/speaking.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development'; // Chỉnh lại path nếu cần

// Định nghĩa Interface cho kết quả trả về
export interface SpeakingScoringResult {
  transcript: string;
  savedAudioUrl: string;
  overallScore: number;
  pronunciationScore: number;
  accuracyScore: number;
  fluencyScore: number;
  completenessScore: number;
  grammarScore: number;
  vocabularyScore: number;
  contentScore: number;
}

@Injectable({
  providedIn: 'root',
})
export class SpeakingService {
  private apiUrl = `${environment.apiUrl}/Speaking`; // Lấy URL API từ environment

  constructor(private http: HttpClient) {}

  submitSpeakingAnswer(
    audioBlob: Blob,
    questionId: number
  ): Observable<SpeakingScoringResult> {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'user-recording.wav');
    formData.append('questionId', questionId.toString());

    return this.http.post<SpeakingScoringResult>(
      `${this.apiUrl}/submit-answer`,
      formData
    );
  }
}
