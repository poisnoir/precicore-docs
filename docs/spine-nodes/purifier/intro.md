---
id: intro
title: Purifier
sidebar_position: 1
---

# Purifier

Purifier is PreciCore's signal processing node. It sits between raw operator input and the control system, applying a Kalman filter to convert noisy, tremor-affected movement into stable, clinically precise commands.

## Why filter input?

Physiological hand tremor in a surgeon's hands oscillates at 8–12 Hz. In the context of corneal surgery — where tolerances are measured in micrometres — even small tremor causes tip displacements that exceed safe operating margins.

Purifier doesn't just smooth the signal. It estimates the *intended* position of the operator's hand and publishes that estimate, not the raw measurement. The result is that the robotic arm responds to deliberate movements while ignoring involuntary oscillation.

## Signal flow

```
input/raw  →  Kalman Filter  →  input/clean
```

Purifier subscribes to `input/raw`, processes each message through the filter, and immediately publishes the filtered result to `input/clean`. The latency introduced is one tick of the filter loop — typically under 1 ms.

## How the Kalman filter works

The filter maintains two state vectors:

- **Predicted state** — where the operator's hand *should* be based on the previous position and a motion model
- **Updated state** — the predicted state corrected by the new measurement

At each step, the filter computes a **Kalman gain** that balances trust between the prediction and the measurement. When measurements are noisy (high measurement noise), the filter trusts the model more. When the model is uncertain (high process noise), it trusts measurements more.

| Parameter | Effect of increasing | Effect of decreasing |
|-----------|---------------------|---------------------|
| `process_noise` | More responsive, less smoothing | More smoothing, more lag |
| `measurement_noise` | Heavier filtering, more lag | Less filtering, noisier output |

## Configuration

Purifier is configured via environment variables or a YAML config file:

```yaml
purifier:
  process_noise: 0.01      # motion model uncertainty
  measurement_noise: 0.1   # sensor noise estimate
  initial_state_covariance: 1.0
```

Start with the defaults. If the arm feels sluggish, lower `measurement_noise`. If it feels jittery, raise it.

## Subscribed / published topics

| Direction | Topic | Type | Description |
|-----------|-------|------|-------------|
| Subscribes | `input/raw` | `ControlMsg` or `IMUMsg` | Raw operator commands from any input node |
| Publishes | `input/clean` | `ControlMsg` | Filtered, tremor-reduced commands |

Purifier accepts both `ControlMsg` (from keyboard/Xbox) and `IMUMsg` (from iPhone IMU) on `input/raw`. It normalises both into the same `ControlMsg` format before publishing.

## Links

- [GitHub](https://github.com/poisnoir/purifier)

## See also

- [Input nodes](/docs/spine-nodes/input/intro) — upstream sources of `input/raw`
- [Kinematics Engine](/docs/spine-nodes/kinematics-engine/intro) — downstream consumer of `input/clean`
- [Glossary: Kalman Filter](/docs/glossary#kalman-filter) — conceptual explanation
- [Glossary: Tremor](/docs/glossary#tremor) — why filtering is necessary
