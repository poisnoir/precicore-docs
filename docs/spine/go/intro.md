---
id: intro
title: spine-go
sidebar_position: 1
---

# spine-go

The primary Spine implementation, written in Go. Handles all real-time pub/sub and RPC communication between PreciCore modules over KCP/UDP.

## Features

- Pub/sub messaging over KCP/UDP
- RPC service calls
- Zero-config mDNS discovery
- AES-GCM encrypted namespaces

## Installation

```bash
go get github.com/poisnoir/spine-go
```

## Quick Start

```go
package main

import "github.com/poisnoir/spine-go"

func main() {
    node := spine.NewNode("my-node")

    // Subscribe to a topic
    node.Subscribe("sensor/data", func(msg spine.Msg) {
        _ = msg.Payload
    })

    // Publish to a topic
    node.Publish("sensor/data", []byte("hello"))

    // Start — begins mDNS discovery automatically
    node.Start()
}
```

## RPC

```go
// Expose a service
node.Handle("arm/move", func(req spine.Msg) spine.Msg {
    return spine.Msg{Payload: []byte("ok")}
})

// Call a remote service
resp, err := node.Call("arm/move", []byte("target"))
```

## Links

- [GitHub](https://github.com/poisnoir/spine-go)
