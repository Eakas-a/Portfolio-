import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="resume-preview-backdrop" *ngIf="visible">
      <div class="resume-preview-card">
        <button class="close-btn" type="button" (click)="close.emit()">✕</button>
        <div class="resume-preview-content">
          <iframe [src]="safeResumeUrl" title="Resume preview"></iframe>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .resume-preview-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(15, 23, 42, 0.85);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        z-index: 1000;
      }
      .resume-preview-card {
        position: relative;
        width: min(1120px, 100%);
        height: min(85vh, 820px);
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 30px 90px rgba(0, 0, 0, 0.35);
      }
      .close-btn {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 38px;
        height: 38px;
        border: none;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        color: var(--text);
        font-size: 18px;
        cursor: pointer;
        transition: background 0.2s ease;
        z-index: 1;
      }
      .close-btn:hover {
        background: rgba(255, 255, 255, 0.16);
      }
      .resume-preview-content {
        width: 100%;
        height: 100%;
      }
      .resume-preview-content iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    `
  ]
})
export class ResumePreviewComponent {

  @Input() visible = false;
  @Input() resumeUrl!: string;

  safeResumeUrl!: SafeResourceUrl;

  @Output() close = new EventEmitter<void>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    if (this.resumeUrl) {
      this.safeResumeUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.resumeUrl);
    }
  }
}
