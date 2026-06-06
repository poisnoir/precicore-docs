---
id: intro
title: Kinematics Engine
sidebar_position: 1
---

# Kinematics Engine

The Kinematics Engine handles inverse kinematics and motion planning for the PreciCore robotic arm. It takes target positions from the control system and computes the joint angles required to place the needle at the correct location with the correct orientation.

## Features

- Inverse kinematics solver for the 5-DOF robotic arm
- Remote Center of Motion (RCM) constraint enforcement
- Motion scaling — maps coarse operator input to micro-precision movements
- Communicates over Spine in real time

## Remote Center of Motion (RCM)

The RCM constraint keeps the needle pivoting around a fixed point — the entry point through the cornea. This means the arm can reorient the needle tip without moving the entry wound, which is critical for minimally invasive surgery.

```
Operator input → Kinematics Engine (RCM constraint) → Joint angles
                        ↑
              Entry point held fixed
```

## Motion scaling

Raw operator input (joystick, IMU) covers a large range of motion. The kinematics engine applies a configurable scale factor to map that range down to the sub-millimetre precision required for corneal surgery.

| Mode | Scale factor | Use case |
|------|-------------|----------|
| Coarse | 1 : 5 | Approach and positioning |
| Fine | 1 : 20 | Active surgical manipulation |
| Micro | 1 : 50 | High-precision needle placement |

## Subscribed / published topics

| Direction | Topic | Description |
|-----------|-------|-------------|
| Subscribes | `input/clean` | Filtered operator commands from Purifier |
| Publishes | `arm/target` | Computed joint angles for the hardware driver |

## Links

- [GitHub](https://github.com/poisnoir/kinematics-engine)

## See also

- [Spine](/docs/spine/intro) — routes `input/clean` and `arm/target` between nodes
- [Purifier](/docs/spine-nodes/purifier/intro) — upstream source of `input/clean`
- [CrackHead](/docs/spine-nodes/crack-head/intro) — validates joint trajectories in simulation before hardware execution
