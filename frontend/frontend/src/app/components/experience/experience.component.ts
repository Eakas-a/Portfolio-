import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiControllerService } from '../../services/portfolio.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience">
      <div class="container">
        <p class="section-label">// career</p>
        <h2 class="section-title">Experience</h2>
        <p class="section-subtitle">Building things that matter, with measurable outcomes.</p>

        <!-- Tab Toggle -->
        <div class="tabs">
          <button class="tab" [class.active]="activeTab() === 'work'" (click)="activeTab.set('work')">
            💼 Work Experience
          </button>
          <button class="tab" [class.active]="activeTab() === 'education'" (click)="activeTab.set('education')">
            🎓 Education
          </button>
          <button class="tab" [class.active]="activeTab() === 'leadership'" (click)="activeTab.set('leadership')">
            🏆 Leadership
          </button>
        </div>

        <!-- Timeline -->
        <div class="timeline">
          <ng-container *ngIf="activeTab() === 'work'">
            <div class="timeline-item slide-in" *ngFor="let exp of workExp; let i = index" [style.animation-delay]="i * 0.15 + 's'">
              <div class="timeline-connector">
                <div class="timeline-dot"></div>
                <div class="timeline-line"></div>
              </div>
              <div class="timeline-card card">
                <div class="exp-header">
                  <div class="exp-logo">{{ exp.logoPlaceholder }}</div>
                  <div class="exp-meta">
                    <h3 class="exp-role">{{ exp.role }}</h3>
                    <div class="exp-company">{{ exp.company }}</div>
                    <div class="exp-period">{{ exp.period }}</div>
                  </div>
                </div>
                <ul class="exp-bullets">
                  <li *ngFor="let b of exp.bullets">{{ b }}</li>
                </ul>
              </div>
            </div>
          </ng-container>

          <ng-container *ngIf="activeTab() === 'education'">
            <div class="timeline-item slide-in" *ngFor="let ed of education; let i = index" [style.animation-delay]="i * 0.15 + 's'">
              <div class="timeline-connector">
                <div class="timeline-dot" style="background: var(--accent)"></div>
                <div class="timeline-line"></div>
              </div>
              <div class="timeline-card card">
                <div class="exp-header">
                  <div class="exp-logo" style="background:rgba(16,185,129,0.15);color:var(--accent-light)">{{ ed.logoPlaceholder }}</div>
                  <div class="exp-meta">
                    <h3 class="exp-role">{{ ed.role }}</h3>
                    <div class="exp-company">{{ ed.company }}</div>
                    <div class="exp-period">{{ ed.period }}</div>
                  </div>
                </div>
                <ul class="exp-bullets">
                  <li *ngFor="let b of ed.bullets">{{ b }}</li>
                </ul>
              </div>
            </div>
          </ng-container>

          <ng-container *ngIf="activeTab() === 'leadership'">
            <div class="timeline-item slide-in">
              <div class="timeline-connector">
                <div class="timeline-dot" style="background: #f59e0b"></div>
              </div>
              <div class="timeline-card card">
                <div class="exp-header">
                  <div class="exp-logo" style="background:rgba(245,158,11,0.15);color:#fbbf24">SRC</div>
                  <div class="exp-meta">
                    <h3 class="exp-role">Creative & Technical Systems Head</h3>
                    <div class="exp-company">Students' Representative Council</div>
                    <div class="exp-period">Jun 2022 – Jan 2024</div>
                  </div>
                </div>
                <ul class="exp-bullets">
                  <li>Taught Web Development, database fundamentals, and debugging to students through interactive lessons, mentoring 50+ peers.</li>
                  <li>Managed team of 4+ developers, driving feature development and conducting technical training sessions.</li>
                  <li>Fostered collaborative learning environment for test automation and problem-solving skills.</li>
                </ul>
                <div class="achievements-banner">
                  <span>🏆 78% testing reduction</span>
                  <span>📊 6+ intl BFSI projects</span>
                  <span>👥 20+ platform users</span>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-label { font-family: 'JetBrains Mono', monospace; color: var(--primary); font-size: 13px; margin-bottom: 8px; }
    .tabs { display: flex; gap: 8px; margin-bottom: 48px; flex-wrap: wrap; }
    .tab {
      padding: 10px 22px; border-radius: 8px; border: 1px solid var(--border);
      background: transparent; color: var(--text-muted); cursor: pointer; font-size: 14px;
      font-weight: 500; transition: all 0.2s;
    }
    .tab.active { background: rgba(99,102,241,0.12); border-color: var(--primary); color: var(--text); }
    .timeline { display: flex; flex-direction: column; gap: 0; }
    .timeline-item { display: flex; gap: 20px; }
    .timeline-connector { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; width: 24px; }
    .timeline-dot {
      width: 14px; height: 14px; border-radius: 50%; background: var(--primary);
      border: 3px solid var(--bg); box-shadow: 0 0 12px rgba(99,102,241,0.5);
      z-index: 1; flex-shrink: 0; margin-top: 22px;
    }
    .timeline-line { flex: 1; width: 2px; background: var(--border); margin: 4px 0; }
    .timeline-card { flex: 1; padding: 24px; margin-bottom: 24px; }
    .exp-header { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 16px; }
    .exp-logo {
      width: 48px; height: 48px; border-radius: 10px; flex-shrink: 0;
      background: rgba(99,102,241,0.15); color: var(--primary-light);
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700; font-family: 'JetBrains Mono', monospace;
      text-align: center; padding: 4px;
    }
    .exp-role { font-size: 17px; font-weight: 700; margin-bottom: 3px; }
    .exp-company { font-size: 14px; color: var(--primary-light); margin-bottom: 2px; }
    .exp-period { font-size: 12px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; }
    .exp-bullets { padding-left: 16px; display: flex; flex-direction: column; gap: 8px; }
    .exp-bullets li { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
    .achievements-banner {
      margin-top: 16px; padding: 12px 16px; border-radius: 8px;
      background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.15);
      display: flex; gap: 20px; flex-wrap: wrap;
    }
    .achievements-banner span { font-size: 13px; color: #fbbf24; }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    .slide-in { animation: slideIn 0.5s ease forwards; opacity: 0; }
  `]
})
export class ExperienceComponent implements OnInit {
  activeTab = signal<'work' | 'education' | 'leadership'>('work');
  workExp: any[] = [];
  education: any[] = [];

  constructor(private apiControllerService: ApiControllerService) {}

  ngOnInit() {
    this.apiControllerService.getExperience().subscribe(data => {
      this.workExp = data.filter((e: any) => e.type === 'work');
      this.education = data.filter((e: any) => e.type === 'education');
    });
  }
}
