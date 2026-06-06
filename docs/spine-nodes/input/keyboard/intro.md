---
id: intro
title: Keyboard
sidebar_position: 1
---

# Keyboard

The Keyboard node provides basic keyboard-based control of the PreciCore system. Primarily used during development and testing for quick input without requiring physical controllers.

## Key mappings

| Key | Action |
|-----|--------|
| `W` / `S` | Move Y axis (forward / back) |
| `A` / `D` | Move X axis (left / right) |
| `Q` / `E` | Move Z axis (up / down) |
| `I` / `K` | Pitch |
| `J` / `L` | Yaw |
| `Space` | Reset position |
| `Esc` | Emergency stop |

## Published topics

| Topic | Type | Description |
|-------|------|-------------|
| `input/raw` | `ControlMsg` | Axis values derived from key state |

Keys map to discrete axis values (−1.0, 0.0, or 1.0). The signal passes through Purifier the same as any other input device.

## Links

- [GitHub](https://github.com/poisnoir/keyboard)

## See also

- [Input Overview](/docs/spine-nodes/input/intro) — all supported input devices
- [Purifier](/docs/spine-nodes/intro) — downstream filter for `input/raw`
- [Xbox Controller](/docs/spine-nodes/input/xbox-controller/intro) — analog alternative for more precise testing
