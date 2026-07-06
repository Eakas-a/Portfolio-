import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumePreviewComponent } from '../resume-preview/resume-preview.component';
import { resumeUrl, triggerResumeDownload } from '../resume-preview/resume-utils';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ResumePreviewComponent],
  template: `
    <section id="home" class="hero">
      <div class="container">
        <div class="hero-content animate-in">
          <div class="availability-badge">
            <span class="dot"></span> Open to opportunities
          </div>
          <h1 class="hero-title">
            Hi, I'm <span class="gradient-text">Eakas Arora</span>
          </h1>
          <p class="hero-role">Full-Stack Developer · Spring Boot · Angular · Microservices · AI</p>
          <p class="hero-desc">
            3–4 years building scalable backend systems and enterprise platforms. 
            Led an automation framework adopted across 6+ BFSI projects internationally — 
            reducing manual testing by 78%.
          </p>
          <div class="hero-stack">
            <span class="badge" *ngFor="let t of topTech">{{ t }}</span>
          </div>
          <div class="hero-cta">
            <a href="#contact" class="btn btn-primary">Talk to my AI Agent →</a>
            <a href="#projects" class="btn btn-ghost">View Projects</a>
            <button class="btn btn-ghost" (click)="downloadAndPreview()">↓ Resume</button>
          </div>
          <app-resume-preview
            [visible]="showResumePreview"
            [resumeUrl]="resumeUrl"
            (close)="closeResume()"
          ></app-resume-preview>
          <div class="hero-stats">
            <div class="stat" *ngFor="let s of stats">
              <span class="stat-value gradient-text">{{ s.value }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="code-card">
            <div class="code-header">
              <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
              <span class="filename">eakas.config.ts</span>
            </div>
            <pre class="code-body"><code><span class="kw">const</span> <span class="var">eakas</span> <span class="op">=</span> &#123;
  <span class="key">role</span>: <span class="str">"Full-Stack Engineer"</span>,
  <span class="key">stack</span>: [
    <span class="str">"Spring Boot"</span>, <span class="str">"Angular"</span>,
    <span class="str">"Microservices"</span>, <span class="str">"Kafka"</span>,
    <span class="str">"Docker"</span>, <span class="str">"Kubernetes"</span>
  ],
  <span class="key">ai</span>: [<span class="str">"LangChain"</span>, <span class="str">"LLM APIs"</span>],
  <span class="key">impact</span>: <span class="str">"78% test reduction"</span>,
  <span class="key">available</span>: <span class="bool">true</span>
&#125;;</code></pre>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 100px;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
      top: -200px; right: -200px;
      pointer-events: none;
    }
    .container { display: flex; gap: 60px; align-items: center; }
    .hero-content { flex: 1; }
    .hero-visual { flex: 1; display: flex; justify-content: center; }
    .availability-badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 6px 14px; border-radius: 20px;
      background: rgba(16,185,129,0.1); color: var(--accent-light);
      border: 1px solid rgba(16,185,129,0.2);
      font-size: 13px; font-weight: 500; margin-bottom: 24px;
    }
    .dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent); animation: pulse-glow 2s infinite;
    }
    .hero-title {
      font-size: clamp(36px, 5vw, 64px);
      font-weight: 900; line-height: 1.1; margin-bottom: 12px;
    }
    .hero-role {
      font-size: 16px; color: var(--text-muted);
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 20px;
    }
    .hero-desc {
      font-size: 16px; color: var(--text-muted); line-height: 1.7;
      max-width: 520px; margin-bottom: 24px;
    }
    .hero-stack { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
    .hero-cta { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
    .hero-stats {
      display: flex; gap: 40px;
      padding-top: 32px; border-top: 1px solid var(--border);
    }
    .stat { display: flex; flex-direction: column; gap: 2px; }
    .stat-value { font-size: 28px; font-weight: 800; }
    .stat-label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
    /* Code card */
    .code-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: var(--radius-lg); overflow: hidden;
      min-width: 340px; box-shadow: var(--shadow-glow);
    }
    .code-header {
      padding: 14px 16px; background: rgba(255,255,255,0.03);
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; gap: 6px;
    }
    .code-header .dot { animation: none; }
    .dot.red { background: #ff5f56; }
    .dot.yellow { background: #ffbd2e; }
    .dot.green { background: #27c93f; }
    .filename { margin-left: 8px; font-size: 12px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; }
    .code-body { padding: 20px; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.7; }
    .kw { color: #c792ea; }
    .var { color: #82aaff; }
    .key { color: #f07178; }
    .str { color: #c3e88d; }
    .bool { color: #ff9cac; }
    .op { color: var(--text-muted); }
    @media (max-width: 900px) {
      .container { flex-direction: column; }
      .hero-visual { display: none; }
    }
  `]
})
export class HeroComponent {
  topTech = ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'Microservices', 'Kafka', 'Docker', 'K8s', 'AWS'];
  stats = [
    { value: '3–4 yrs', label: 'Experience' },
    { value: '78%', label: 'Test reduction' },
    { value: '6+', label: 'Intl projects' }
  ];
  resumeUrl = '/assets/Eakas_Arora_Resume.pdf';
  showResumePreview = false;

  downloadAndPreview() {
    this.showResumePreview = true;
    triggerResumeDownload();
  }

  closeResume() {
    this.showResumePreview = false;
  }
}
