# Runtime Lab Decision Matrix

Use this before choosing a runtime shape.

## Comparison Lens

- beginner fit
- security posture
- maturity and support
- setup difficulty
- best use case

## Local Only

- best for first experiments
- lowest ops complexity
- easiest to reset

## Docker Sandbox

- best for bounded runtime testing
- stronger isolation
- requires Docker comfort

## Remote Host

- best for persistence and always-on behavior
- highest ops overhead
- only after local success

## Runtime Selection Rule

Choose the simplest runtime that:

- can complete your actual task
- can be verified easily
- has a clear rollback path
- does not require infrastructure you cannot maintain
