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
      padding: 22px 0;
      transition: all 0.25s ease;
    }
    nav.scrolled {
      padding: 12px 0;
      background: var(--paper);
      border-bottom: var(--bw) solid var(--line);
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
      font-weight: 700;
      text-decoration: none;
      color: var(--ink);
      font-family: 'Space Grotesk', sans-serif;
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 4px 10px;
      background: var(--yellow);
      border: var(--bw) solid var(--line);
      border-radius: var(--radius-sm);
      box-shadow: 3px 3px 0 var(--line);
      transform: rotate(-1.5deg);
    }
    .logo-bracket { color: var(--purple-deep); }
    .nav-links {
      display: flex;
      gap: 8px;
      background: var(--surface);
      border: var(--bw) solid var(--line);
      border-radius: 100px;
      padding: 6px;
      box-shadow: 3px 3px 0 var(--line);
    }
    .nav-links a {
      color: var(--ink);
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      font-family: 'Space Grotesk', sans-serif;
      padding: 8px 16px;
      border-radius: 100px;
      transition: background 0.2s;
    }
    .nav-links a:hover { background: var(--surface-alt); }
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
