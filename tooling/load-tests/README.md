# Load Tests

k6-based load tests for CLI Academy API endpoints.

## Prerequisites

Install k6: https://grafana.com/docs/k6/latest/set-up/install-k6/

## Running the tutor load test

```sh
# Against local dev server
k6 run tooling/load-tests/tutor-load-test.js

# Against staging/production
k6 run -e BASE_URL=https://cliacademy.com tooling/load-tests/tutor-load-test.js

# With an authenticated test token
k6 run -e BASE_URL=https://cliacademy.com -e TEST_TOKEN=your_jwt tooling/load-tests/tutor-load-test.js
```

## Target SLO

- p99 response time < 2s at 50 concurrent users
- Error rate < 5%

## Notes

The `/api/tutor` POST endpoint enforces per-user daily limits (10 free / 100 pro).
For sustained load testing, either use many test accounts or test the GET endpoint
(`/api/tutor`) which returns capability info without a limit check.
