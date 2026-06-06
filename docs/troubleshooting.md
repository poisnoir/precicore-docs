---
id: troubleshooting
title: Troubleshooting
sidebar_position: 91
---

# Troubleshooting

Common issues and how to fix them.

---

## Nodes can't discover each other

**Symptom:** Two nodes are running on the same machine or LAN but neither receives messages from the other. No connection errors — just silence.

**Cause:** mDNS requires multicast UDP packets to reach all nodes. This is blocked in several common configurations:

- **Docker / WSL2** — the virtual network interface doesn't forward multicast by default
- **VPN** — most VPN clients suppress multicast
- **Multiple network interfaces** — Spine may bind to the wrong interface
- **Firewall** — UDP 5353 (mDNS) and the Spine port are blocked

**Fix:**

1. Confirm both nodes are on the same physical network segment (same Wi-Fi, same LAN)
2. Temporarily disable VPN and retest
3. On Linux, check which interface multicast traffic uses: `ip route show | grep 224.0.0.0`
4. Run both nodes on the same host first to isolate network vs. discovery issues

---

## AES decryption failure / "namespace key mismatch"

**Symptom:** A node connects but messages are dropped or logged as invalid. You see errors like `cipher: message authentication failed` or similar.

**Cause:** Two nodes are using different namespace keys. All nodes in a namespace must share the same AES-256 key.

**Fix:**

1. Confirm both nodes are started with the same `--namespace-key` flag (or equivalent config)
2. Keys are case-sensitive byte strings — a trailing space or newline will produce a different key
3. If keys are loaded from environment variables, confirm the variable is set identically in both shells

---

## CrackHead crashes on startup

**Symptom:** `crack-head` exits immediately, often with `Failed to load model` or a segmentation fault.

**Cause:** MuJoCo cannot find the scene XML file, or the MuJoCo library is not on the linker path.

**Fix:**

1. Confirm `MUJOCO_PATH` points to your MuJoCo install directory (the one containing `lib/` and `include/`)
2. Confirm the scene file path is correct — by default CrackHead looks for `scenes/phantom_cornea.xml` relative to the working directory
3. On Linux, run `ldd ./build/crack-head | grep mujoco` to check the library is linked correctly
4. On macOS, ensure MuJoCo is not quarantined: `xattr -dr com.apple.quarantine /path/to/mujoco`

---

## High latency or jitter in arm response

**Symptom:** The arm responds to input but with noticeable delay or stuttering.

**Cause:** Several possible sources:

- Purifier's Kalman filter `process_noise` is too high, causing over-smoothing
- KCP retransmission is firing due to packet loss
- The Kinematics Engine is running on an overloaded CPU

**Fix:**

1. Check packet loss on the link: `ping -c 100 <node-host>` — any loss > 0.5% will cause KCP retransmits
2. Lower `process_noise` in the Purifier config to reduce smoothing lag
3. Run the Kinematics Engine on a dedicated core: `taskset -c 2 ./kinematics-engine` (Linux)
4. Confirm that CrackHead and the Kinematics Engine are not on the same CPU core as the Spine message loop

---

## Keyboard node not responding

**Symptom:** The keyboard node is running but pressing keys has no effect.

**Cause:** The terminal running the keyboard node does not have keyboard focus, or the node is not publishing to the topic the rest of the pipeline subscribes to.

**Fix:**

1. Click on the terminal window running the keyboard node to give it focus — key events are captured from the focused terminal
2. Confirm the node is publishing to `input/raw` (check with a debug subscriber)
3. Confirm Purifier is subscribed to `input/raw` and publishing `input/clean`

---

## iPhone IMU node: no data received

**Symptom:** The iPhone IMU node is running but `input/raw` receives no messages.

**Cause:** The iPhone and the computer running the IMU node are on different network segments, or the UDP port is firewalled.

**Fix:**

1. Confirm the iPhone and the computer are on the **same Wi-Fi network** — the IMU streams over Wi-Fi/UDP
2. Check if a firewall is blocking the UDP port used by the IMU node (default: see the repo README)
3. Confirm the iPhone app has permission to access the local network (iOS 14+: Settings → Privacy → Local Network)

---

## Build errors with spine-cpp

**Symptom:** CMake configure or build fails with missing headers or linker errors.

**Cause:** The C++ toolchain does not meet the requirements, or the Spine library path is not set.

**Fix:**

1. Confirm you have a C++17-capable compiler: `g++ --version` should show GCC 9+ or Clang 10+
2. Run CMake with the explicit path: `cmake -B build -DSPINE_ROOT=/path/to/spine-cpp`
3. On macOS with Apple Silicon, ensure you are building for `arm64`: `cmake -B build -DCMAKE_OSX_ARCHITECTURES=arm64`

---

## Still stuck?

Open an issue on the relevant GitHub repository:

- [spine-go](https://github.com/poisnoir/spine-go)
- [crack-head-cpp](https://github.com/poisnoir/crack-head-cpp)
- [kinematics-engine](https://github.com/poisnoir/kinematics-engine)
