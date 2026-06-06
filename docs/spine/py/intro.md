---
id: intro
title: spine-py
sidebar_position: 1
---

# spine-py

Python bindings for the Spine communication framework. Allows Python-based modules to publish, subscribe, and make RPC calls over the Spine network.

## Installation

```bash
pip install spine-py
```

## Quick Start

```python
from spine import Node

node = Node("my-node")

@node.subscribe("sensor/data")
def handle(msg):
    print(msg.payload)

node.publish("sensor/data", b"hello")
node.start()  # begins mDNS discovery automatically
```

## RPC

```python
# Expose a service
@node.handle("arm/move")
def move(req):
    return b"ok"

# Call a remote service
resp = node.call("arm/move", b"target")
```

## Links

- [GitHub](https://github.com/poisnoir/spine-py)
