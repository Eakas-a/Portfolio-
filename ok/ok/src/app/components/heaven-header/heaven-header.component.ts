import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JourneyAudioService } from '../../services/journey-audio.service';

@Component({
  selector: 'app-heaven-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="heaven">
      <!-- lightning flash layer -->
      <div class="flash" [class.strike]="flashing"></div>

      <!-- drifting cloud silhouettes, varied sizes -->
      <svg class="cloud cloud-a" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.25"/>
      </svg>
      <svg class="cloud cloud-b" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.25"/>
      </svg>
      <svg class="cloud cloud-c" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.25"/>
      </svg>
      <svg class="cloud cloud-d" viewBox="0 0 200 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 70 Q0 70 0 52 Q0 34 20 36 Q22 12 50 14 Q76 -6 100 16 Q128 8 132 34 Q160 30 160 54 Q160 72 138 72 Z" fill="#ffffff" stroke="var(--line)" stroke-width="1.4" stroke-opacity="0.2"/>
      </svg>

      <!-- birds crossing the heaven scene -->
      <svg class="bird bird-1" viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8 Q6 -2 12 6 Q18 -2 24 8" fill="none" stroke="var(--ink-soft)" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <svg class="bird bird-2" viewBox="0 0 24 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8 Q6 -2 12 6 Q18 -2 24 8" fill="none" stroke="var(--ink-soft)" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- archway gate -->
      <svg class="gate" viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="70" width="20" height="120" rx="4" fill="#efe3c8" stroke="var(--line)" stroke-width="2.5"/>
        <rect x="130" y="70" width="20" height="120" rx="4" fill="#efe3c8" stroke="var(--line)" stroke-width="2.5"/>
        <path d="M10 80 Q10 6 80 6 Q150 6 150 80" fill="#efe3c8" stroke="var(--line)" stroke-width="2.5"/>
        <path d="M28 82 Q28 24 80 24 Q132 24 132 82 L132 190 L28 190 Z" fill="#8fd0ff"/>
        <path d="M28 82 Q28 24 80 24 Q132 24 132 82" fill="none" stroke="var(--line)" stroke-width="2"/>
      </svg>

      <!-- top step of the staircase, character begins his descent here -->
      <div class="first-step">
        <svg viewBox="0 0 220 60" class="step-art" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40 Q60 10 110 30 T220 20" fill="none" stroke="#c9b98a" stroke-width="14" stroke-linecap="round"/>
          <path d="M0 40 Q60 10 110 30 T220 20" fill="none" stroke="var(--line)" stroke-width="2" stroke-dasharray="1 10" stroke-linecap="round"/>
        </svg>
        <div class="aladdin flying" title="Aladdin, riding in on his magic carpet">
          <svg viewBox="0 0 64 46" width="58" height="42" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="32" cy="42" rx="24" ry="3" fill="rgba(0,0,0,0.14)"/>
            <path d="M6 26 Q32 17 58 26 L54 33 Q32 40 10 33 Z" fill="#C0392B" stroke="var(--line)" stroke-width="1.6"/>
            <path d="M9 27 Q32 20 55 27" fill="none" stroke="#F4D35E" stroke-width="1.3"/>
            <path d="M11 31 Q32 37 53 31" fill="none" stroke="#F4D35E" stroke-width="1.3"/>
            <path d="M8 26 L2 28 M9 30 L4 33 M56 26 L62 28 M55 30 L60 33" stroke="#F4D35E" stroke-width="1.4" stroke-linecap="round"/>
            <g transform="translate(20,-2)">
              <path d="M2 24 Q12 30 22 24 L20 15 Q12 11 4 15 Z" fill="#3D8BE0" stroke="var(--line)" stroke-width="1.6"/>
              <circle cx="12" cy="8" r="7.5" fill="#F2C79E" stroke="var(--line)" stroke-width="1.6"/>
              <path d="M3.5 6 Q12 -6 20.5 6 Q21.5 0 12 -1 Q2.5 0 3.5 6 Z" fill="#F6E27A" stroke="var(--line)" stroke-width="1.4"/>
              <circle cx="18" cy="3" r="1.7" fill="#EF6C4E" stroke="var(--line)" stroke-width="0.9"/>
              <circle cx="9.3" cy="8" r="1.1" fill="#17171F"/>
              <circle cx="14.7" cy="8" r="1.1" fill="#17171F"/>
              <path d="M9.5 12 Q12 13.6 14.5 12" stroke="#17171F" stroke-width="1" fill="none" stroke-linecap="round"/>
              <path d="M2 15 Q-4 17 -2 23" stroke="#3D8BE0" stroke-width="3.2" fill="none" stroke-linecap="round"/>
              <path d="M20 15 Q26 17 24 23" stroke="#3D8BE0" stroke-width="3.2" fill="none" stroke-linecap="round"/>
            </g>
          </svg>
        </div>
      </div>

      <p class="heaven-tag">✨ Follow Aladdin down the spiral stairs to explore ✨</p>

      <button class="sound-toggle" (click)="toggleSound()" [class.on]="audio.soundOn()">
        {{ audio.soundOn() ? '🔊 Storm sounds on' : '🔇 Storm sounds off' }}
      </button>
    </div>
  `,
  styles: [`
    .heaven {
      position: relative;
      height: 260px;
      background: linear-gradient(180deg, #eaf6ff 0%, #cfeaff 55%, var(--paper) 100%);
      overflow: hidden;
      border-bottom: var(--bw) solid var(--line);
      display: flex; flex-direction: column; align-items: center; justify-content: flex-end;
    }
    .flash {
      position: absolute; inset: 0; background: #fff; opacity: 0; pointer-events: none;
    }
    .flash.strike { animation: strike 0.6s ease-out; }
    @keyframes strike {
      0% { opacity: 0; } 8% { opacity: 0.85; } 16% { opacity: 0.1; }
      22% { opacity: 0.6; } 30% { opacity: 0; } 100% { opacity: 0; }
    }
    .cloud { position: absolute; width: 180px; opacity: 0.9; filter: drop-shadow(0 4px 0 rgba(0,0,0,0.05)); }
    .cloud-a { top: 18px; left: -40px; animation: driftRight 34s linear infinite; }
    .cloud-b { top: 70px; right: -60px; width: 240px; opacity: 0.75; animation: driftLeft 46s linear infinite; }
    .cloud-c { top: 5px; left: 45%; width: 140px; opacity: 0.6; animation: driftRight 26s linear infinite; }
    .cloud-d { top: 40px; left: 20%; width: 100px; opacity: 0.5; animation: driftLeft 38s linear infinite; }
    .bird { position: absolute; width: 20px; z-index: 1; }
    .bird-1 { top: 40px; animation: birdFly 15s linear infinite; }
    .bird-2 { top: 90px; width: 14px; animation: birdFly 21s linear infinite -7s; }
    @keyframes driftRight { from { transform: translateX(0); } to { transform: translateX(60vw); } }
    @keyframes driftLeft { from { transform: translateX(0); } to { transform: translateX(-60vw); } }
    .gate { width: 100px; margin-bottom: -6px; z-index: 1; }
    .first-step { position: relative; width: 240px; z-index: 1; }
    .step-art { width: 100%; display: block; }
    .aladdin {
      position: absolute; top: -18px; left: 40%;
    }
    .aladdin.flying { animation: carpetFly 3.2s ease-in-out infinite; }
    @keyframes carpetFly {
      0%, 100% { transform: translateY(0) rotate(-4deg); }
      50% { transform: translateY(-10px) rotate(4deg); }
    }
    .heaven-tag {
      font-size: 12px; font-weight: 700; color: var(--ink-soft);
      font-family: 'Space Grotesk', sans-serif; margin: 6px 0 14px;
      letter-spacing: 0.2px;
    }
    .sound-toggle {
      position: absolute; top: 14px; right: 16px; z-index: 2;
      font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700;
      padding: 7px 12px; border-radius: 100px; cursor: pointer;
      background: var(--surface); border: var(--bw) solid var(--line);
      box-shadow: 3px 3px 0 var(--line);
    }
    .sound-toggle.on { background: var(--yellow); }
    @media (max-width: 640px) {
      .heaven { height: 200px; }
      .cloud-b { width: 160px; }
    }
  `]
})
export class HeavenHeaderComponent {
  flashing = false;
  constructor(public audio: JourneyAudioService) {}

  toggleSound() {
    this.audio.toggle();
    if (this.audio.soundOn()) {
      setTimeout(() => this.strikeLightning(), 400);
    }
  }

  private strikeLightning() {
    this.flashing = true;
    this.audio.thunder();
    setTimeout(() => (this.flashing = false), 650);
  }
}
