import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiControllerService, ChatMessage } from '../../services/portfolio.service';

@Component({
  selector: 'app-chat-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Toggle Button (the lamp) -->
    <button class="chat-fab" (click)="toggleChat()" [class.has-notification]="hasNotification">
      <span *ngIf="!isOpen">🧞</span>
      <span *ngIf="isOpen">✕</span>
    </button>

    <!-- Chat Window -->
    <div class="chat-window" [class.open]="isOpen">
      <!-- Header -->
      <div class="chat-header">
        <div class="agent-info">
          <div class="agent-avatar">🧞</div>
          <div>
            <div class="agent-name">Eakas's Genie</div>
            <div class="agent-status"><span class="status-dot"></span> Freed from the lamp — online</div>
          </div>
        </div>
        <button class="close-btn" (click)="toggleChat()">✕</button>
      </div>

      <!-- Messages -->
      <div class="chat-messages" #messagesContainer>
        <div *ngFor="let msg of messages()" class="message" [class.user]="msg.role === 'user'" [class.assistant]="msg.role === 'assistant'">
          <div *ngIf="msg.role === 'assistant'" class="msg-avatar">🧞</div>
          <div class="msg-bubble">{{ msg.content }}</div>
        </div>
        <div *ngIf="loading()" class="message assistant">
          <div class="msg-avatar">🧞</div>
          <div class="msg-bubble typing">
            <span></span><span></span><span></span>
          </div>
        </div>
        <div *ngIf="intakeComplete()" class="confirmation-card">
          <div class="confirm-icon">✅</div>
          <p>Job details sent to Eakas! Expected response time: <strong>within 24 hours</strong>.</p>
        </div>
      </div>

      <!-- Quick actions -->
      <div class="quick-actions" *ngIf="messages().length <= 1">
        <button *ngFor="let q of quickQuestions" class="quick-btn" (click)="sendQuick(q)">{{ q }}</button>
      </div>

      <!-- Input -->
      <div class="chat-input-area">
        <input
          [(ngModel)]="inputText"
          (keydown.enter)="send()"
          placeholder="Make a wish — ask about Eakas or share a role..."
          [disabled]="loading()"
          class="chat-input"
        />
        <button class="send-btn" (click)="send()" [disabled]="!inputText.trim() || loading()">→</button>
      </div>
    </div>
  `,
  styles: [`
    .chat-fab {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 62px; height: 62px; border-radius: 50%;
      background: radial-gradient(circle at 35% 30%, #ffe9a8, var(--yellow) 60%, var(--purple) 140%);
      border: var(--bw) solid var(--line); cursor: pointer; font-size: 26px;
      box-shadow: var(--shadow), 0 0 0 6px rgba(186,104,200,0.18);
      transition: all 0.15s ease;
      display: flex; align-items: center; justify-content: center;
      animation: genieGlow 2.4s ease-in-out infinite;
    }
    @keyframes genieGlow {
      0%, 100% { box-shadow: var(--shadow), 0 0 0 6px rgba(186,104,200,0.18); }
      50% { box-shadow: var(--shadow), 0 0 0 10px rgba(186,104,200,0.32); }
    }
    .chat-fab:hover { transform: translate(-2px,-2px); box-shadow: 9px 9px 0 var(--line); }
    .chat-fab.has-notification::after {
      content: ''; position: absolute; top: 2px; right: 2px;
      width: 14px; height: 14px; border-radius: 50%;
      background: var(--coral); border: 2px solid var(--line);
    }
    .chat-window {
      position: fixed; bottom: 104px; right: 28px; z-index: 9998;
      width: 380px; max-height: 560px;
      background: var(--surface); border: var(--bw) solid var(--line);
      border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);
      display: flex; flex-direction: column;
      transform: scale(0.85) translateY(20px); opacity: 0;
      pointer-events: none; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    .chat-window.open {
      transform: scale(1) translateY(0); opacity: 1; pointer-events: all;
    }
    .chat-header {
      padding: 16px 20px; border-bottom: var(--bw) solid var(--line);
      display: flex; align-items: center; justify-content: space-between;
      background: var(--purple); border-radius: 23px 23px 0 0;
    }
    .agent-info { display: flex; align-items: center; gap: 12px; }
    .agent-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: var(--yellow); border: var(--bw) solid var(--line);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: var(--ink); font-family: 'Space Grotesk', sans-serif;
    }
    .agent-name { font-weight: 700; font-size: 14px; color: #fff; font-family: 'Space Grotesk', sans-serif; }
    .agent-status { font-size: 11px; color: #fff; opacity: 0.9; display: flex; align-items: center; gap: 4px; font-weight: 600; }
    .status-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); border: 1px solid var(--line); animation: pulse-glow 1.6s infinite; }
    .close-btn { background: var(--surface); border: 1.5px solid var(--line); border-radius: 50%; width: 26px; height: 26px; color: var(--ink); cursor: pointer; font-size: 13px; }
    .chat-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px;
      max-height: 320px; background: var(--paper);
    }
    .message { display: flex; gap: 8px; align-items: flex-end; }
    .message.user { flex-direction: row-reverse; }
    .msg-avatar {
      width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
      background: var(--yellow); border: 1.5px solid var(--line);
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 700; color: var(--ink); font-family: 'Space Grotesk', sans-serif;
    }
    .msg-bubble {
      max-width: 260px; padding: 10px 14px; border-radius: 16px;
      font-size: 13px; line-height: 1.5; font-weight: 500;
      background: var(--surface); color: var(--ink);
      border: var(--bw) solid var(--line);
    }
    .message.user .msg-bubble {
      background: var(--blue);
      color: var(--ink); border-color: var(--line);
    }
    .typing { display: flex; gap: 4px; padding: 14px !important; align-items: center; }
    .typing span {
      width: 6px; height: 6px; border-radius: 50%; background: var(--ink);
      animation: bounce 1.2s infinite;
    }
    .typing span:nth-child(2) { animation-delay: 0.2s; }
    .typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-8px); }
    }
    .quick-actions {
      padding: 0 16px 10px; display: flex; flex-wrap: wrap; gap: 6px;
      background: var(--paper);
    }
    .quick-btn {
      padding: 6px 13px; border-radius: 100px;
      background: var(--surface); color: var(--ink);
      border: 1.5px solid var(--line);
      font-size: 11px; font-weight: 700; cursor: pointer; transition: all 0.15s;
      font-family: 'Space Grotesk', sans-serif;
    }
    .quick-btn:hover { background: var(--yellow); }
    .chat-input-area {
      padding: 12px 16px; border-top: var(--bw) solid var(--line);
      display: flex; gap: 8px; background: var(--surface); border-radius: 0 0 23px 23px;
    }
    .chat-input {
      flex: 1; background: var(--paper); border: var(--bw) solid var(--line);
      border-radius: var(--radius-sm); padding: 10px 14px; color: var(--ink);
      font-size: 13px; outline: none; font-family: inherit; font-weight: 500;
    }
    .chat-input:focus { background: var(--surface); }
    .send-btn {
      width: 38px; height: 38px; border-radius: var(--radius-sm);
      background: var(--yellow);
      border: var(--bw) solid var(--line); color: var(--ink); cursor: pointer; font-size: 16px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }
    .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .confirmation-card {
      margin: 4px 0; padding: 14px 16px; border-radius: var(--radius-sm);
      background: var(--green); border: var(--bw) solid var(--line);
      display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; color: var(--ink);
    }
    .confirm-icon { font-size: 20px; }
    @media (max-width: 480px) {
      .chat-window { width: calc(100vw - 32px); right: 16px; }
    }
  `]
})
export class ChatAgentComponent {
  isOpen = false;
  hasNotification = true;
  inputText = '';
  messages = signal<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Eakas's AI portfolio agent. I can tell you about his skills, projects, and experience — or if you have a role in mind, I'll collect the details and connect you directly. How can I help?"
    }
  ]);
  loading = signal(false);
  intakeComplete = signal(false);

  quickQuestions = [
    'What stack does Eakas use?',
    'Tell me about his projects',
    'Is he available?',
    'I have a job for him'
  ];

  constructor(private apiControllerService: ApiControllerService) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.hasNotification = false;
  }

  sendQuick(q: string) {
    this.inputText = q;
    this.send();
  }

  send() {
    const text = this.inputText.trim();
    if (!text || this.loading()) return;

    this.inputText = '';
    this.messages.update(msgs => [...msgs, { role: 'user', content: text }]);
    this.loading.set(true);

    this.apiControllerService.chat(this.messages()).subscribe({
      next: (res) => {
        this.messages.update(msgs => [...msgs, { role: 'assistant', content: res.reply }]);
        this.loading.set(false);
        if (res.intakeComplete) {
          this.intakeComplete.set(true);
        }
      },
      error: () => {
        this.messages.update(msgs => [...msgs, {
          role: 'assistant',
          content: "I'm having a moment — please email eakas000@gmail.com directly!"
        }]);
        this.loading.set(false);
      }
    });
  }
}
