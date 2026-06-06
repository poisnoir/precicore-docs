---
id: intro
title: iPhone IMU
sidebar_position: 1
---

# iPhone IMU

The iPhone IMU node captures wrist motion data from an iPhone's built-in inertial measurement unit (IMU) and streams it to the Spine network. This enables natural, gesture-based control of the robotic arm — the surgeon moves their wrist and the robot follows.

## Why IMU-based control?

Joystick input requires the operator to learn an unintuitive mapping between stick movements and robot motion. IMU-based wrist control is more natural and closer to how a surgeon actually moves during a procedure — making it a better approximation of real surgical input.

## Data captured

| Sensor | Data | Rate |
|--------|------|------|
| Accelerometer | X, Y, Z acceleration (m/s²) | 100 Hz |
| Gyroscope | Roll, pitch, yaw rate (rad/s) | 100 Hz |

## Signal flow

```
iPhone IMU → Wi-Fi/UDP → spine-node/input/imu → input/raw (Spine)
                                                        ↓
                                                   Purifier
                                                        ↓
                                                  input/clean
                                                        ↓
                                             Kinematics Engine
```

## Published topics

| Topic | Type | Description |
|-------|------|-------------|
| `input/raw` | `IMUMsg` | Fused accelerometer + gyroscope reading |

## Links

- [GitHub](https://github.com/poisnoir/iphone-imu)

## See also

- [Input Overview](/docs/spine-nodes/input/intro) — all supported input devices
- [Purifier](/docs/spine-nodes/intro) — Kalman filter applied to the raw IMU stream
- [Kinematics Engine](/docs/spine-nodes/kinematics-engine/intro) — converts clean motion into joint angles
