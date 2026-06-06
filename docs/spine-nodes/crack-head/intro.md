---
id: intro
title: CrackHead
sidebar_position: 1
---

# CrackHead

CrackHead is PreciCore's MuJoCo-powered physics simulator. It provides a virtual environment for the robotic arm and surgical scene, allowing the team to develop, test, and validate control algorithms and needle trajectories on a virtual phantom cornea — before touching any real hardware.

## Why simulate first?

Building and testing directly on hardware is slow and expensive. CrackHead lets the team validate the full pipeline in simulation — tremor filtering, motion scaling, force feedback, and needle trajectory — before a single physical component is assembled.

The simulator also acts as a safety gate. The Kinematics Engine publishes `arm/target` to both CrackHead and the hardware driver. In development mode, only CrackHead is connected. In production, both are active — but CrackHead runs slightly ahead as a trajectory pre-validator and can veto moves that would violate safe operating bounds.

## Scene description

CrackHead loads a MuJoCo XML scene that models:

| Element | Description |
|---------|-------------|
| Robotic arm | 5-DOF manipulator with joint limits matching the real hardware |
| Needle | Rigid body attached to the end effector with collision geometry |
| Phantom cornea | Deformable surface model with contact detection |
| Entry point | Fixed point in space that the RCM constraint enforces |

The scene file is located at `scenes/phantom_cornea.xml` in the repository root.

## Installation

**Prerequisites:** MuJoCo 3.x, CMake 3.20+, C++17 compiler.

```bash
git clone https://github.com/poisnoir/crack-head-cpp
cd crack-head-cpp
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build --parallel
```

Set `MUJOCO_PATH` to your MuJoCo installation directory before building:

```bash
export MUJOCO_PATH=/path/to/mujoco
cmake -B build -DMUJOCO_ROOT=$MUJOCO_PATH
```

## Running a simulation

Start CrackHead after the other nodes are running:

```bash
./build/crack-head
```

CrackHead discovers the Kinematics Engine via mDNS and begins subscribing to `arm/target`. The MuJoCo viewer opens automatically and renders the scene in real time.

To run headless (no viewer, for CI or server environments):

```bash
./build/crack-head --headless
```

## Subscribed / published topics

| Direction | Topic | Type | Description |
|-----------|-------|------|-------------|
| Subscribes | `arm/target` | `JointMsg` | Target joint angles from the Kinematics Engine |
| Publishes | `sim/state` | `StateMsg` | Current simulated joint positions and velocities |
| Publishes | `sim/contact` | `ContactMsg` | Contact forces at the needle tip (for force feedback) |

## Validation mode

When `--validate` is passed, CrackHead runs in offline validation mode: it reads a pre-recorded trajectory file, simulates the full sequence, and reports any constraint violations (joint limits, RCM deviation, contact force thresholds).

```bash
./build/crack-head --validate --traj trajectories/test_insertion.json
```

## Links

- [GitHub](https://github.com/poisnoir/crack-head-cpp)

## See also

- [Architecture](/docs/architecture) — how CrackHead fits into the full pipeline
- [Kinematics Engine](/docs/spine-nodes/kinematics-engine/intro) — upstream source of `arm/target`
- [Spine](/docs/spine/intro) — communication backbone
- [Troubleshooting](/docs/troubleshooting#crackhead-crashes-on-startup) — common setup issues
