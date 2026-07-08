// Netlify Function — runs server-side, never shipped to the browser.
// This is what actually talks to Resend, using a key that only lives
// in Netlify's environment variables (Site settings → Environment variables).
//
// The Angular app calls POST /.netlify/functions/send-email instead of
// calling api.resend.com directly, which avoids both problems in the
// original code:
//   1. CORS — Resend's API has no Access-Control-Allow-Origin header, so
//      browsers can never call it directly, in dev or in prod.
//   2. Secret exposure — the Resend API key never reaches client JS.

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const TO_ADDRESS = 'eakas000@gmail.com';
// Resend requires "from" to be on a domain you've verified with them.
const FROM_ADDRESS = 'Portfolio Genie <genie@yourdomain.com>';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ ok: false, error: 'Method not allowed' })
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: 'Invalid JSON body' })
    };
  }

  const { subject, text } = payload;
  if (!subject || !text) {
    return {
      statusCode: 400,
      body: JSON.stringify({ ok: false, error: 'subject and text are required' })
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Missing env var in the Netlify dashboard — fail loudly so it's obvious.
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: 'Server misconfigured: RESEND_API_KEY not set' })
    };
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        subject,
        text
      })
    });

    const body = await res.text();

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ ok: false, error: `Resend ${res.status}: ${body}` })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: e.message || 'Network error' })
    };
  }
};
