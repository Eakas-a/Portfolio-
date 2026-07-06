import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiControllerService, ChatMessage } from '../../services/portfolio.service';

@Component({
  selector: 'app-chat-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Floating Toggle Button -->
    <button class="chat-fab" (click)="toggleChat()" [class.has-notification]="hasNotification">
      <span *ngIf="!isOpen">💬</span>
      <span *ngIf="isOpen">✕</span>
    </button>

    <!-- Chat Window -->
    <div class="chat-window" [class.open]="isOpen">
      <!-- Header -->
      <div class="chat-header">
        <div class="agent-info">
          <div class="agent-avatar">EA</div>
          <div>
            <div class="agent-name">Eakas's AI Agent</div>
            <div class="agent-status"><span class="status-dot"></span> Online</div>
          </div>
        </div>
        <button class="close-btn" (click)="toggleChat()">✕</button>
      </div>

      <!-- Messages -->
      <div class="chat-messages" #messagesContainer>
        <div *ngFor="let msg of messages()" class="message" [class.user]="msg.role === 'user'" [class.assistant]="msg.role === 'assistant'">
          <div *ngIf="msg.role === 'assistant'" class="msg-avatar">EA</div>
          <div class="msg-bubble">{{ msg.content }}</div>
        </div>
        <div *ngIf="loading()" class="message assistant">
          <div class="msg-avatar">EA</div>
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
          placeholder="Ask about Eakas or share a role..."
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
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border: none; cursor: pointer; font-size: 24px;
      box-shadow: 0 8px 30px rgba(99,102,241,0.4);
      transition: all 0.3s ease;
      display: flex; align-items: center; justify-content: center;
    }
    .chat-fab:hover { transform: scale(1.08); }
    .chat-fab.has-notification::after {
      content: ''; position: absolute; top: 4px; right: 4px;
      width: 12px; height: 12px; border-radius: 50%;
      background: #ef4444; border: 2px solid var(--bg);
    }
    .chat-window {
      position: fixed; bottom: 100px; right: 28px; z-index: 9998;
      width: 380px; max-height: 560px;
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 20px; box-shadow: 0 24px 60px rgba(0,0,0,0.5);
      display: flex; flex-direction: column;
      transform: scale(0.85) translateY(20px); opacity: 0;
      pointer-events: none; transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    }
    .chat-window.open {
      transform: scale(1) translateY(0); opacity: 1; pointer-events: all;
    }
    .chat-header {
      padding: 16px 20px; border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(99,102,241,0.06); border-radius: 20px 20px 0 0;
    }
    .agent-info { display: flex; align-items: center; gap: 12px; }
    .agent-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: white;
    }
    .agent-name { font-weight: 600; font-size: 14px; }
    .agent-status { font-size: 11px; color: var(--accent-light); display: flex; align-items: center; gap: 4px; }
    .status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse-glow 2s infinite; }
    .close-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 16px; }
    .chat-messages {
      flex: 1; overflow-y: auto; padding: 16px;
      display: flex; flex-direction: column; gap: 12px;
      max-height: 320px;
    }
    .message { display: flex; gap: 8px; align-items: flex-end; }
    .message.user { flex-direction: row-reverse; }
    .msg-avatar {
      width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 700; color: white;
    }
    .msg-bubble {
      max-width: 260px; padding: 10px 14px; border-radius: 16px;
      font-size: 13px; line-height: 1.5;
      background: rgba(255,255,255,0.05); color: var(--text);
      border: 1px solid var(--border);
    }
    .message.user .msg-bubble {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white; border-color: transparent;
    }
    .typing { display: flex; gap: 4px; padding: 14px !important; align-items: center; }
    .typing span {
      width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted);
      animation: bounce 1.2s infinite;
    }
    .typing span:nth-child(2) { animation-delay: 0.2s; }
    .typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-8px); }
    }
    .quick-actions {
      padding: 0 16px 8px; display: flex; flex-wrap: wrap; gap: 6px;
    }
    .quick-btn {
      padding: 5px 12px; border-radius: 16px;
      background: rgba(99,102,241,0.1); color: var(--primary-light);
      border: 1px solid rgba(99,102,241,0.2);
      font-size: 11px; cursor: pointer; transition: all 0.2s;
    }
    .quick-btn:hover { background: rgba(99,102,241,0.2); }
    .chat-input-area {
      padding: 12px 16px; border-top: 1px solid var(--border);
      display: flex; gap: 8px;
    }
    .chat-input {
      flex: 1; background: rgba(255,255,255,0.05); border: 1px solid var(--border);
      border-radius: 10px; padding: 10px 14px; color: var(--text);
      font-size: 13px; outline: none; font-family: inherit;
    }
    .chat-input:focus { border-color: var(--primary); }
    .send-btn {
      width: 38px; height: 38px; border-radius: 10px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border: none; color: white; cursor: pointer; font-size: 16px;
      display: flex; align-items: center; justify-content: center;
    }
    .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .confirmation-card {
      margin: 4px 0; padding: 14px 16px; border-radius: 12px;
      background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2);
      display: flex; align-items: center; gap: 10px; font-size: 13px;
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
