---
id: intro
title: Examples
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Examples

Code snippets demonstrating common Spine patterns across Go, Python, and C++.

## Basic pub/sub

<Tabs>
  <TabItem value="go" label="Go" default>
  ```go
  node := spine.NewNode("publisher")

  node.Subscribe("sensor/data", func(msg spine.Msg) {
      fmt.Println("received:", string(msg.Payload))
  })

  node.Publish("sensor/data", []byte("hello"))
  node.Start()
  ```
  </TabItem>
  <TabItem value="py" label="Python">
  ```python
  node = Node("publisher")

  @node.subscribe("sensor/data")
  def handle(msg):
      print("received:", msg.payload)

  node.publish("sensor/data", b"hello")
  node.start()
  ```
  </TabItem>
  <TabItem value="cpp" label="C++">
  ```cpp
  spine::Node node("publisher");

  node.subscribe("sensor/data", [](const spine::Msg& msg) {
      std::cout << "received: " << msg.payload << std::endl;
  });

  node.publish("sensor/data", "hello");
  node.start();
  ```
  </TabItem>
</Tabs>

## RPC service call

<Tabs>
  <TabItem value="go" label="Go" default>
  ```go
  // Server node
  server := spine.NewNode("arm-controller")
  server.Handle("arm/move", func(req spine.Msg) spine.Msg {
      target := parseTarget(req.Payload)
      angles := kinematics.Solve(target)
      return spine.Msg{Payload: mad.Encode(angles)}
  })
  server.Start()

  // Client node
  client := spine.NewNode("ui")
  resp, err := client.Call("arm/move", mad.Encode(target))
  ```
  </TabItem>
  <TabItem value="py" label="Python">
  ```python
  # Server node
  server = Node("arm-controller")

  @server.handle("arm/move")
  def move(req):
      angles = kinematics.solve(req.payload)
      return angles

  # Client node
  client = Node("ui")
  resp = client.call("arm/move", target)
  ```
  </TabItem>
</Tabs>

## Multi-node with mDNS discovery

Nodes discover each other automatically — no IP addresses or config files needed.

```go
// Run these on any machines on the same network
nodeA := spine.NewNode("purifier")
nodeB := spine.NewNode("controller")

// nodeB will discover nodeA automatically via mDNS
nodeB.Subscribe("input/clean", func(msg spine.Msg) {
    // handle filtered input from purifier
})

nodeA.Start()
nodeB.Start()
```

## Encrypted namespace

Nodes sharing a namespace key communicate in an AES-GCM encrypted channel. Nodes without the key cannot read or publish to that namespace.

```go
node := spine.NewNode("purifier",
    spine.WithNamespace("surgical-session-001"),
    spine.WithKey([]byte("32-byte-aes-key-goes-here-000000")),
)
node.Start()
```

## See also

- [spine-go](/docs/spine/go/intro) · [spine-py](/docs/spine/py/intro) · [spine-cpp](/docs/spine/cpp/intro)
