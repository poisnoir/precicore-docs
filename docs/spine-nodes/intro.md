---
id: intro
title: Overview
sidebar_position: 1
---

# Spine Nodes

Spine Nodes are the individual modules that make up the PreciCore system. Each node connects to the Spine communication backbone and handles a specific part of the pipeline — from physics simulation to operator input.

## Nodes

| Node | Description | Status |
|------|-------------|--------|
| [crack-head](/docs/spine-nodes/crack-head/intro) | MuJoCo-powered physics simulator | ✅ Active |
| [kinematics-engine](/docs/spine-nodes/kinematics-engine/intro) | Inverse kinematics and motion planning | ✅ Active |
| [purifier](/docs/spine-nodes/purifier/intro) | Kalman filter for tremor reduction | ✅ Active |
| [input](/docs/spine-nodes/input/intro) | Operator input layer | ✅ Active |

## Pipeline overview

```
Input nodes  →  input/raw  →  Purifier  →  input/clean  →  Kinematics Engine  →  arm/target  →  CrackHead / Hardware
```

Each node communicates exclusively through Spine topics. There are no direct dependencies between nodes — any node can be replaced, restarted, or swapped out without modifying any other node.

## See also

- [Architecture](/docs/architecture) — full system diagram with all data flows
- [Spine](/docs/spine/intro) — the communication backbone all nodes run on
