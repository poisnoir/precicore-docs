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

## Links

- [GitHub](https://github.com/poisnoir/kinematics-engine)
