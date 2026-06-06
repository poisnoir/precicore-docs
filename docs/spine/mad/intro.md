---
id: intro
title: MAD
sidebar_position: 1
---

# MAD

MAD is a fast binary serializer used within the Spine framework for compact, high-performance message encoding. Designed for low-latency communication between PreciCore modules over UDP.

## Why MAD?

JSON and other text-based formats introduce unnecessary overhead for real-time robotics systems. MAD encodes messages into compact binary format, minimizing packet size and serialization time — critical when Spine is routing control commands at sub-millisecond intervals.

## Installation

```bash
go get github.com/poisnoir/mad-go
```

## Usage

```go
import "github.com/poisnoir/mad-go"

type ControlMsg struct {
    X, Y, Z float32
    Buttons  uint8
}

// Encode to bytes
data, err := mad.Encode(ControlMsg{X: 1.0, Y: -0.5, Z: 0.0, Buttons: 0b0001})

// Decode from bytes
var msg ControlMsg
err = mad.Decode(data, &msg)
```

MAD is used internally by Spine whenever you call `node.Publish()` — you typically don't need to call it directly unless you're building a custom transport layer.

## See also

- [spine-go](/docs/spine/go/intro) — uses MAD for all message encoding
- [Spine Overview](/docs/spine/intro) — how messages travel between nodes
