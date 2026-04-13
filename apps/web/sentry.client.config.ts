import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

// Only initialise Sentry when a DSN is configured. The app runs cleanly
// without error tracking during local development.
if (dsn) {
  Sentry.init({
    dsn,
    // Reduce noise by only sampling 20% of performance traces in production.
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
    // Capture 100% of session replays for error diagnosis.
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    // Suppress Sentry noise in local dev.
    debug: false,
    integrations: [Sentry.replayIntegration()],
  });
}
