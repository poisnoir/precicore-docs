---
id: glossary
title: Glossary
sidebar_position: 90
---

# Glossary

Reference for terms used throughout the PreciCore documentation.

---

### AES-GCM

Advanced Encryption Standard in Galois/Counter Mode. A symmetric authenticated encryption algorithm. Spine uses AES-GCM to encrypt all messages within a named namespace — each namespace has a shared 256-bit key. Provides both confidentiality and integrity without a separate HMAC step.

---

### DOF (Degrees of Freedom)

The number of independent axes along which a mechanical system can move. The PreciCore robotic arm has **5-DOF**: three translational (X, Y, Z) and two rotational (pitch, yaw). The RCM constraint effectively removes one degree of freedom during surgery, constraining the arm to pivot around the corneal entry point.

---

### IMU (Inertial Measurement Unit)

A sensor that measures specific force (accelerometer) and angular rate (gyroscope). The PreciCore [iPhone IMU node](/docs/spine-nodes/input/iphone-imu/intro) captures 6-axis IMU data at 100 Hz and streams it over Wi-Fi/UDP into the Spine network as `input/raw` messages.

---

### Inverse Kinematics (IK)

The mathematical problem of computing joint angles that place a robotic end-effector (the needle tip) at a desired position and orientation in 3D space. Contrasted with *forward kinematics*, which computes position given joint angles. The [Kinematics Engine](/docs/spine-nodes/kinematics-engine/intro) solves IK in real time under the RCM constraint.

---

### Kalman Filter

A recursive algorithm that estimates the true state of a system from noisy measurements. Given a series of observations containing statistical noise, it produces estimates that tend to be more accurate than any single measurement alone. [Purifier](/docs/spine-nodes/purifier/intro) applies a Kalman filter to raw operator input to suppress hand tremor before commands reach the arm.

---

### KCP

KCP is a reliable transport protocol that runs over UDP. Unlike TCP, KCP is tuned for low latency by making retransmission and acknowledgement parameters configurable. Spine uses KCP to achieve TCP-like reliability with lower jitter — important for real-time surgical control.

---

### MAD (Serializer)

PreciCore's custom binary serialization format used inside Spine messages. MAD encodes control structs into compact byte arrays for low-overhead transmission over KCP/UDP. See [MAD](/docs/spine/mad/intro).

---

### mDNS (Multicast DNS)

A protocol that resolves hostnames to IP addresses within a local network without a central DNS server. Spine uses mDNS so that nodes discover each other automatically — you run a node and it finds its peers on the LAN with no manual IP configuration.

---

### MuJoCo

Multi-Joint dynamics with Contact. An open-source physics engine developed by DeepMind, widely used in robotics research. [CrackHead](/docs/spine-nodes/crack-head/intro) uses MuJoCo to simulate the PreciCore robotic arm and the virtual phantom cornea with accurate rigid body dynamics and contact forces.

---

### Namespace

A Spine concept that groups nodes into isolated communication channels. Messages published within a namespace are only visible to nodes in the same namespace. Each namespace can have its own AES-GCM encryption key, preventing cross-namespace eavesdropping even on the same network.

---

### Phantom Cornea

A synthetic physical or simulated model of a human cornea used for testing and calibration. In PreciCore, the virtual phantom cornea inside CrackHead acts as the target tissue for simulated needle insertion — allowing needle trajectories to be validated before any contact with real biological tissue.

---

### Pub/Sub (Publish/Subscribe)

A messaging pattern where producers (*publishers*) emit messages to named *topics* and consumers (*subscribers*) receive messages from those topics, with no direct coupling between the two. Spine implements pub/sub as its primary communication pattern. See [Spine](/docs/spine/intro).

---

### RCM (Remote Center of Motion)

A kinematic constraint that forces the robotic arm to pivot around a fixed point in space — the entry point through the cornea. This allows the surgeon to reorient the needle tip without moving the incision site, which is critical for minimally invasive ophthalmic surgery. See [Kinematics Engine](/docs/spine-nodes/kinematics-engine/intro).

---

### RPC (Remote Procedure Call)

A communication pattern where a client sends a request to a named service and waits for a response. Spine supports RPC alongside pub/sub for request/response interactions — for example, querying a node's current configuration. See [Examples](/docs/spine/examples/intro).

---

### Spine

PreciCore's custom robotics middleware. Provides pub/sub messaging and RPC over KCP/UDP, zero-config mDNS discovery, and AES-GCM encrypted namespaces. The lightweight alternative to ROS 2. See [Spine](/docs/spine/intro).

---

### Spine Node

Any process that connects to the Spine network. A node can publish messages, subscribe to topics, and expose or call RPC services. The term refers both to the abstract concept and to the specific nodes in PreciCore's pipeline (keyboard, purifier, kinematics-engine, CrackHead).

---

### Tremor

Involuntary rhythmic muscular oscillation. Physiological hand tremor in a surgeon's hands occurs at 8–12 Hz and can produce tip displacements of 50–100 µm — far exceeding the sub-millimetre precision required for corneal surgery. [Purifier](/docs/spine-nodes/purifier/intro) filters tremor from the `input/raw` stream before commands reach the arm.

---

### UDP (User Datagram Protocol)

A connectionless transport protocol. Unlike TCP, UDP does not guarantee delivery, ordering, or duplicate elimination — but it has much lower overhead and latency. Spine runs KCP on top of UDP to get configurable reliability without TCP's head-of-line blocking.
