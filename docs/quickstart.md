---
id: quickstart
title: Quickstart
sidebar_position: 1
---

# Quickstart

Get the PreciCore stack running locally in a few minutes. This guide walks you through connecting a minimal Spine node, running CrackHead in simulation, and piping keyboard input through Purifier.

## Prerequisites

| Dependency | Version | Notes |
|------------|---------|-------|
| Go | 1.21+ | For spine-go and kinematics-engine |
| Python | 3.10+ | Optional, for spine-py nodes |
| MuJoCo | 3.x | Required for CrackHead simulation |
| C++ toolchain | C++17 | Required for spine-cpp and crack-head-cpp |

Install MuJoCo from the [official releases](https://github.com/google-deepmind/mujoco/releases). Set `MUJOCO_PATH` to your install directory.

## 1 — Run your first Spine node

Install spine-go:

```bash
go get github.com/poisnoir/spine-go
```

Create a file `main.go`:

```go
package main

import "github.com/poisnoir/spine-go"

func main() {
    node := spine.NewNode("my-node")

    node.Subscribe("input/clean", func(msg spine.Msg) {
        // handle incoming messages
        _ = msg.Data
    })

    node.Publish("arm/target", []byte(`{"q":[0,0,0,0,0]}`))

    node.Start() // blocks; discovers peers via mDNS
}
```

Run it:

```bash
go run main.go
```

The node will start and broadcast its presence on the local network via mDNS. Any other Spine node on the same network will discover it automatically.

## 2 — Connect keyboard input

Clone and run the keyboard input node:

```bash
git clone https://github.com/poisnoir/keyboard
cd keyboard
go run .
```

The keyboard node publishes raw operator commands to `input/raw`. From there, Purifier picks them up and pushes filtered commands to `input/clean`.

Key controls: `W`/`S` (Y-axis), `A`/`D` (X-axis), `Q`/`E` (Z-axis), `Esc` (emergency stop).

See [Keyboard](/docs/spine-nodes/input/keyboard/intro) for the full key mapping.

## 3 — Start CrackHead simulation

Clone and build the simulator:

```bash
git clone https://github.com/poisnoir/crack-head-cpp
cd crack-head-cpp
cmake -B build && cmake --build build
./build/crack-head
```

CrackHead will discover the other nodes via mDNS and begin subscribing to `arm/target`. The simulated arm will move in response to commands from the Kinematics Engine.

## 4 — Full pipeline

Once all nodes are running on the same network, the complete pipeline activates automatically:

```
Keyboard → input/raw → Purifier → input/clean → Kinematics Engine → arm/target → CrackHead
```

No manual wiring required — mDNS handles discovery, and AES-GCM encrypts all traffic within a namespace.

## Next steps

- [Architecture](/docs/architecture) — understand how all components fit together
- [Spine](/docs/spine/intro) — learn the communication protocol
- [Purifier](/docs/spine-nodes/purifier/intro) — configure tremor filtering
- [Kinematics Engine](/docs/spine-nodes/kinematics-engine/intro) — tune motion scaling
