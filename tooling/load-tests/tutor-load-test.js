import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("errors");
const tutorDuration = new Trend("tutor_duration", true);

export const options = {
  stages: [
    { duration: "30s", target: 10 },   // ramp up
    { duration: "1m", target: 50 },    // hold at 50 concurrent
    { duration: "30s", target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ["p(99)<2000"],  // p99 < 2s
    errors: ["rate<0.05"],              // < 5% error rate
    tutor_duration: ["p(99)<2000"],
  },
};

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

// A realistic short tutor message
const TUTOR_PAYLOAD = JSON.stringify({
  messages: [
    { role: "user", content: "What is the CLAUDE.md file used for?" }
  ],
  lessonContext: {
    pathSlug: "01-start-here",
    lessonSlug: "lesson-1-1-1-create-the-cli-academy-workspace",
    tutorPreload: "I am starting to learn about Claude Code.",
  },
});

export default function () {
  // NOTE: Replace with a real Bearer token from a test account for authenticated tests.
  // Free tier limits apply (10 messages/day per user), so use many test accounts for
  // sustained load, or test the /api/tutor GET (capability endpoint) which has no limit.
  const headers = {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${__ENV.TEST_TOKEN}`,
  };

  const start = Date.now();
  const res = http.post(`${BASE_URL}/api/tutor`, TUTOR_PAYLOAD, { headers });
  const duration = Date.now() - start;

  tutorDuration.add(duration);

  const success = check(res, {
    "status is 200 or 401": (r) => r.status === 200 || r.status === 401,
    "no 500": (r) => r.status !== 500,
    "no 503": (r) => r.status !== 503,
  });

  errorRate.add(!success);
  sleep(1);
}
