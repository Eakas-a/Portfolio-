import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumePreviewComponent } from '../resume-preview/resume-preview.component';
import { resumeUrl, triggerResumeDownload } from '../resume-preview/resume-utils';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, ResumePreviewComponent],
  template: `
    <nav [class.scrolled]="scrolled">
      <div class="nav-inner">
        <a href="#" class="logo">
          <span class="logo-bracket">&lt;</span>EA<span class="logo-bracket">/&gt;</span>
        </a>
        <div class="nav-links">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>
        <button class="btn btn-primary" style="padding:8px 18px;font-size:13px;" (click)="downloadAndPreview()">
          View Resume
        </button>

        <app-resume-preview
          [visible]="showResumePreview"
          [resumeUrl]="resumeUrl"
          (close)="closeResume()"
        ></app-resume-preview>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      padding: 20px 0;
      transition: all 0.3s ease;
    }
    nav.scrolled {
      padding: 12px 0;
      background: rgba(10, 10, 15, 0.9);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
    }
    .nav-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      font-size: 20px;
      font-weight: 800;
      text-decoration: none;
      color: var(--text);
      font-family: 'JetBrains Mono', monospace;
    }
    .logo-bracket { color: var(--primary); }
    .nav-links {
      display: flex;
      gap: 32px;
    }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--text); }
    @media (max-width: 640px) { .nav-links { display: none; } }
  `]
})
export class NavComponent {
  scrolled = false;
  showResumePreview = false;
  resumeUrl = '/assets/Eakas_Arora_Resume.pdf';

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 50;
  }

  downloadAndPreview() {
    this.showResumePreview = true;
    triggerResumeDownload();
  }

  closeResume() {
    this.showResumePreview = false;
  }
}
