import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills">
      <div class="container">
        <p class="section-label">// expertise</p>
        <h2 class="section-title">Skills</h2>
        <p class="section-subtitle">Click a skill axis to explore related projects and tools.</p>

        <div class="skills-layout">
          <!-- Radar Chart -->
          <div class="radar-wrapper fade-in-up">
            <canvas #radarCanvas width="380" height="380"></canvas>
            <div class="radar-legend">
              <div class="legend-item" *ngFor="let item of radarData" (click)="selectCategory(item.category)"
                   [class.active]="selectedCategory === item.category">
                <span class="legend-dot" [style.background]="item.color"></span>
                <span>{{ item.category }}</span>
                <span class="legend-val">{{ item.value }}%</span>
              </div>
            </div>
          </div>

          <!-- Skill Groups -->
          <div class="skill-groups">
            <div class="skill-group fade-in-up" *ngFor="let group of skillGroups" [class.highlighted]="selectedCategory === group.name">
              <div class="group-header">
                <span class="group-icon">{{ group.icon }}</span>
                <h4>{{ group.name }}</h4>
              </div>
              <div class="group-tags">
                <span class="badge" *ngFor="let skill of group.skills">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .section-label { font-family: 'JetBrains Mono', monospace; color: var(--primary); font-size: 13px; margin-bottom: 8px; }
    .skills-layout { display: grid; grid-template-columns: 400px 1fr; gap: 48px; align-items: start; }
    .radar-wrapper canvas { display: block; }
    .radar-legend { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
    .legend-item {
      display: flex; align-items: center; gap: 10px; cursor: pointer;
      padding: 8px 12px; border-radius: 8px; border: 1px solid transparent;
      transition: all 0.2s;
    }
    .legend-item:hover, .legend-item.active { background: rgba(99,102,241,0.08); border-color: var(--border); }
    .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .legend-val { margin-left: auto; font-size: 12px; color: var(--text-dim); font-family: 'JetBrains Mono', monospace; }
    .skill-groups { display: flex; flex-direction: column; gap: 20px; }
    .skill-group {
      padding: 16px 20px; border-radius: 12px;
      border: 1px solid var(--border); background: var(--bg-card);
      transition: all 0.3s;
    }
    .skill-group.highlighted { border-color: var(--primary); background: rgba(99,102,241,0.06); }
    .group-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
    .group-icon { font-size: 18px; }
    .group-header h4 { font-size: 14px; font-weight: 600; }
    .group-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    @media (max-width: 900px) { .skills-layout { grid-template-columns: 1fr; } }
  `]
})
export class SkillsComponent implements OnInit, AfterViewInit {
  @ViewChild('radarCanvas') radarCanvas!: ElementRef<HTMLCanvasElement>;
  selectedCategory: string | null = null;

  radarData = [
    { category: 'Frontend', value: 82, color: '#6366f1' },
    { category: 'Backend', value: 90, color: '#8b5cf6' },
    { category: 'DevOps', value: 75, color: '#06b6d4' },
    { category: 'AI/ML', value: 70, color: '#10b981' },
    { category: 'Databases', value: 80, color: '#f59e0b' },
    { category: 'System Design', value: 85, color: '#ef4444' }
  ];

  skillGroups = [
    { name: 'Frontend', icon: '🎨', skills: ['Angular', 'TypeScript', 'RxJS', 'HTML5', 'CSS3', 'Redux', 'Bootstrap', 'Tailwind'] },
    { name: 'Backend', icon: '⚙️', skills: ['Spring Boot', 'Java', 'Node.js', 'REST APIs', 'Microservices', 'WebSockets', 'Kafka'] },
    { name: 'DevOps', icon: '🚀', skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'CI/CD', 'Git'] },
    { name: 'AI/ML', icon: '🧠', skills: ['LangChain', 'LLM APIs', 'TensorFlow', 'PyTorch', 'LLM Inferencing'] },
    { name: 'Databases', icon: '🗄️', skills: ['MySQL', 'PostgreSQL', 'SQL'] },
    { name: 'System Design', icon: '🏗️', skills: ['OAuth2', 'JWT', 'OIDC', 'TDD', 'Distributed Systems', 'Event-Driven'] }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => this.drawRadar(), 100);
    this.initScrollObserver();
  }

  selectCategory(cat: string) {
    this.selectedCategory = this.selectedCategory === cat ? null : cat;
  }

  drawRadar() {
    const canvas = this.radarCanvas?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const cx = 190, cy = 190, R = 150;
    const n = this.radarData.length;
    ctx.clearRect(0, 0, 380, 380);

    // Concentric rings
    for (let r = 1; r <= 5; r++) {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
        const x = cx + (R * r / 5) * Math.cos(angle);
        const y = cy + (R * r / 5) * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Axes
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.stroke();

      // Labels
      const labelR = R + 22;
      const lx = cx + labelR * Math.cos(angle);
      const ly = cy + labelR * Math.sin(angle);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px Inter';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.radarData[i].category, lx, ly);
    }

    // Data polygon fill
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const v = this.radarData[i].value / 100;
      const x = cx + R * v * Math.cos(angle);
      const y = cy + R * v * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, 'rgba(99,102,241,0.35)');
    grad.addColorStop(1, 'rgba(139,92,246,0.1)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data points
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const v = this.radarData[i].value / 100;
      const x = cx + R * v * Math.cos(angle);
      const y = cy + R * v * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#6366f1';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  initScrollObserver() {
    setTimeout(() => {
      const els = document.querySelectorAll('#skills .fade-in-up');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      els.forEach(el => obs.observe(el));
    }, 200);
  }
}
