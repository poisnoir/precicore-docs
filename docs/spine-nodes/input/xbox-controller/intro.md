---
id: intro
title: Xbox Controller
sidebar_position: 1
---

# Xbox Controller

The Xbox Controller node captures joystick and button input from a standard Xbox controller and publishes it to the Spine network for processing by Purifier and the control system.

## Why Xbox First?

The Xbox controller serves as the baseline input device during early development — it's widely available, well-documented, and provides reliable analog joystick data for testing motion scaling and tremor filtering before custom input hardware is built.

## Signal flow

```
Xbox Controller → spine-node/input/xbox → input/raw (Spine topic)
                                               ↓
                                          Purifier (Kalman filter)
                                               ↓
                                          input/clean (Spine topic)
                                               ↓
                                       Kinematics Engine
```

## Published topics

| Topic | Type | Description |
|-------|------|-------------|
| `input/raw` | `ControlMsg` | Raw joystick axes and button state |

## ControlMsg fields

| Field | Type | Description |
|-------|------|-------------|
| `lx`, `ly` | `float32` | Left stick X/Y (−1.0 to 1.0) |
| `rx`, `ry` | `float32` | Right stick X/Y (−1.0 to 1.0) |
| `lt`, `rt` | `float32` | Left/right trigger (0.0 to 1.0) |
| `buttons` | `uint16` | Bitmask of pressed buttons |

## Links

- [GitHub](https://github.com/poisnoir/xbox-controller)

## See also

- [Input Overview](/docs/spine-nodes/input/intro) — all supported input devices
- [Purifier](/docs/spine-nodes/purifier/intro) — filters the raw signal before it reaches the arm
- [Spine](/docs/spine/intro) — the network layer carrying `input/raw`
