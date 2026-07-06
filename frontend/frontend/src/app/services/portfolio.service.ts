import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  reply: string;
  intakeStarted: boolean;
  intakeComplete: boolean;
  jobData: any;
}

@Injectable({ providedIn: 'root' })
export class ApiControllerService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  chat(messages: ChatMessage[]): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.baseUrl}/chat`, { messages });
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/portfolio/projects`);
  }

  getExperience(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/portfolio/experience`);
  }

  getSkills(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/portfolio/skills`);
  }
}
