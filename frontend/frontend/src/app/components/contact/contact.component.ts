import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumePreviewComponent } from '../resume-preview/resume-preview.component';
import { resumeUrl, triggerResumeDownload } from '../resume-preview/resume-utils';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ResumePreviewComponent],
  template: `
    <section id="contact">
      <div class="container">
        <p class="section-label">// reach out</p>
        <h2 class="section-title">Contact Eakas</h2>
        <p class="section-subtitle">Three ways to connect — pick whatever works best for you.</p>

        <div class="contact-grid">
          <!-- Option 1: AI Agent -->
          <div class="contact-card card primary-card">
            <div class="contact-icon">🤖</div>
            <h3>Talk to the AI Agent</h3>
            <p>Ask anything about Eakas or share a job opportunity. The agent collects role details and notifies Eakas instantly.</p>
            <button class="btn btn-primary" (click)="openChat()">Open AI Agent →</button>
            <div class="card-tag">Responds in seconds</div>
          </div>

          <!-- Option 2: Resume Download -->
          <div class="contact-card card">
            <div class="contact-icon">📄</div>
            <h3>Download Resume</h3>
            <p>Get Eakas's full resume as a PDF — includes all projects, experience, and skills in recruiter-friendly format.</p>
            <button class="btn btn-ghost" (click)="downloadAndPreview()">↓ Download PDF</button>
            <div class="card-tag">Updated 2024</div>
          </div>

          <!-- Option 3: Book a Call -->
          <div class="contact-card card">
            <div class="contact-icon">📅</div>
            <h3>Book a 15-min Call</h3>
            <p>Schedule a quick intro call directly in Eakas's calendar. No back-and-forth emails needed.</p>
            <a href="https://calendly.com/eakas000" target="_blank" class="btn btn-ghost">Schedule on Calendly →</a>
            <div class="card-tag">Usually available within 2 days</div>
          </div>
        </div>

        <app-resume-preview
          [visible]="showResumePreview"
          [resumeUrl]="resumeUrl"
          (close)="closeResume()"
        ></app-resume-preview>

        <!-- Direct contact info -->
        <div class="direct-contact">
          <div class="contact-item">
            <span class="ci-icon">✉️</span>
           <a href="mailto:eakas000&#64;gmail.com">eakas000&#64;gmail.com</a>
          </div>
          <div class="contact-item">
            <span class="ci-icon">📞</span>
            <a href="tel:+919767438298">+91 9767 438 298</a>
          </div>
          <div class="contact-item">
            <span class="ci-icon">💼</span>
            <a href="https://linkedin.com/in/eakas" target="_blank">linkedin.com/in/eakas</a>
          </div>
          <div class="contact-item">
            <span class="ci-icon">📍</span>
            <span>Hyderabad · Pune · Mumbai · Gurgaon · Bangalore</span>
          </div>
        </div>

        <div class="response-time">
          <span class="rt-dot"></span>
          Expected response time: <strong>within 24 hours</strong>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <p>Built with ❤️ using <strong>Spring Boot</strong> + <strong>Angular</strong> + <strong>Claude AI</strong></p>
      <p style="margin-top:6px;font-size:12px;color:var(--text-dim)">© 2024 Eakas Arora</p>
    </footer>
  `,
  styles: [`
    .section-label { font-family: 'JetBrains Mono', monospace; color: var(--primary); font-size: 13px; margin-bottom: 8px; }
    .contact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 48px; }
    .contact-card {
      padding: 32px; display: flex; flex-direction: column; gap: 14px;
      position: relative; overflow: hidden;
    }
    .primary-card { border-color: rgba(99,102,241,0.3); background: rgba(99,102,241,0.06); }
    .contact-icon { font-size: 36px; }
    .contact-card h3 { font-size: 20px; font-weight: 700; }
    .contact-card p { font-size: 14px; color: var(--text-muted); line-height: 1.6; flex: 1; }
    .card-tag {
      font-size: 11px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace;
      padding-top: 12px; border-top: 1px solid var(--border);
    }
    .direct-contact {
      display: flex; flex-wrap: wrap; gap: 24px;
      padding: 24px 28px; border-radius: 12px;
      background: var(--bg-card); border: 1px solid var(--border);
      margin-bottom: 24px;
    }
    .contact-item { display: flex; align-items: center; gap: 10px; }
    .ci-icon { font-size: 18px; }
    .contact-item a, .contact-item span { font-size: 14px; color: var(--text-muted); text-decoration: none; }
    .contact-item a:hover { color: var(--primary-light); }
    .response-time {
      display: flex; align-items: center; gap: 10px;
      font-size: 14px; color: var(--text-muted);
    }
    .rt-dot {
      width: 10px; height: 10px; border-radius: 50%; background: var(--accent);
      animation: pulse-glow 2s infinite; flex-shrink: 0;
    }
    footer {
      text-align: center; padding: 40px 24px;
      border-top: 1px solid var(--border);
      font-size: 14px; color: var(--text-muted);
    }
    @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
  `]
})
export class ContactComponent {
  resumeUrl = '/assets/Eakas_Arora_Resume.pdf';
  showResumePreview = false;

  openChat() {
    // Signal to chat agent to open
    const btn = document.querySelector('.chat-fab') as HTMLElement;
    btn?.click();
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
  }

  downloadAndPreview() {
    this.showResumePreview = true;
    triggerResumeDownload();
  }

  closeResume() {
    this.showResumePreview = false;
  }
}
