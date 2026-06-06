---
id: intro
title: spine-cpp
sidebar_position: 1
---

# spine-cpp

C++ bindings for the Spine communication framework. Used for low-level hardware modules including the STM32 embedded layer and real-time control systems.

## Installation

```bash
git clone https://github.com/poisnoir/spine-cpp
```

## Quick Start

```cpp
#include "spine.h"

int main() {
    spine::Node node("my-node");

    // Subscribe to a topic
    node.subscribe("sensor/data", [](const spine::Msg& msg) {
        // handle incoming message
    });

    // Publish to a topic
    node.publish("sensor/data", "hello");

    // Start — begins mDNS discovery automatically
    node.start();
    return 0;
}
```

## RPC

```cpp
// Expose a service
node.handle("arm/move", [](const spine::Msg& req) -> spine::Msg {
    return spine::Msg{"ok"};
});

// Call a remote service
auto resp = node.call("arm/move", "target");
```

## Links

- [GitHub](https://github.com/poisnoir/spine-cpp)
