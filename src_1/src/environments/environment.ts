export const environment = {
  // NOTE: this file is bundled into the client JS and is visible to anyone
  // who opens dev tools, even in a production build. Only put keys here for
  // APIs where that's an acceptable risk (Groq allows browser CORS calls
  // scoped to a rate-limited key). Anything more sensitive — like the Resend
  // key — belongs server-side only, e.g. in a Netlify Function's
  // environment variables (see netlify/functions/send-email.js).
  groqApiKey: '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'
};