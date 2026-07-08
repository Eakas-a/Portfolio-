import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResendEmailService {
  // Calls our own Netlify Function instead of Resend directly.
  // The function runs server-side, holds the real Resend API key,
  // and forwards the request — so the browser never sees the key
  // and never hits Resend's CORS wall.
  private readonly endpoint = '/.netlify/functions/send-email';

  async send(subject: string, text: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const res = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject,
          text
        })
      });

      if (!res.ok) {
        const body = await res.text();
        return { ok: false, error: `Resend ${res.status}: ${body}` };
      }
      return { ok: true };
    } catch (e: any) {
      return { ok: false, error: e?.message || 'Network error' };
    }
  }
}