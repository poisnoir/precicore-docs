 ---
id: intro
title: CrackHead
sidebar_position: 1
---

# CrackHead

CrackHead is PreciCore's MuJoCo-powered physics simulator. It provides a virtual environment for the robotic arm and surgical scene, allowing the team to develop, test, and validate control algorithms and needle trajectories on a virtual phantom cornea — before touching any real hardware.

## Why Simulate First?

Building and testing directly on hardware is slow and expensive. CrackHead lets the team validate the full pipeline in simulation — tremor filtering, motion scaling, force feedback, and needle trajectory — before a single physical component is assembled.

## Features

- Full physics simulation of the PreciCore robotic arm
- Virtual phantom cornea model
- Integrates with Purifier for real-time tremor filtering
- Communicates with all other nodes over Spine

## Links

- [GitHub](https://github.com/poisnoir/crack-head-cpp)
