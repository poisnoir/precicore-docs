# precicore-docs

Technical documentation for the PreciCore surgical robotics system. Built with [Docusaurus](https://docusaurus.io/) and deployed to [docs.precicore.ca](https://docs.precicore.ca).

## What's documented

| Section | Description |
|---------|-------------|
| [Spine](/docs/spine/intro) | Lightweight ROS-like communication middleware (pub/sub, RPC, KCP/UDP, mDNS, AES-GCM) |
| [Purifier](/docs/spine-nodes/purifier/intro) | Kalman filter node for surgical tremor reduction |
| [Kinematics Engine](/docs/spine-nodes/kinematics-engine/intro) | 5-DOF inverse kinematics with RCM constraint |
| [CrackHead](/docs/spine-nodes/crack-head/intro) | MuJoCo physics simulator for pre-hardware validation |
| [Input nodes](/docs/spine-nodes/input/intro) | Keyboard, Xbox controller, and iPhone IMU input |

## Local development

**Prerequisites:** Node.js 18+, Yarn

```bash
yarn          # install dependencies
yarn start    # start dev server at localhost:3000
```

Changes to `.md` files and `src/` hot-reload without a full restart.

## Build

```bash
yarn build        # output to /build
yarn serve        # preview the production build locally
```

## Deployment

The site deploys automatically to Cloudflare Pages on every push to `main` via the GitHub Actions workflow at `.github/workflows/`.

To deploy manually:

```bash
yarn build
npx wrangler pages deploy build --project-name precicore-docs
```

## Project structure

```
docs/                   # documentation content (.md / .mdx)
  spine/                # Spine middleware docs
  spine-nodes/          # Node-specific docs (purifier, crack-head, input, kinematics)
  quickstart.md
  architecture.md
  glossary.md
  troubleshooting.md
src/
  css/custom.css        # global styles and theme overrides
  pages/                # standalone pages (homepage, 404, changelog)
  components/           # shared React components
  theme/Root.js         # global layout wrapper (BackToTop)
static/                 # static assets (logo, favicon, social card)
docusaurus.config.js    # site config, navbar, footer, plugins
```

## Tech

- **Framework:** Docusaurus 3.x
- **Search:** `@easyops-cn/docusaurus-search-local` (offline, no external dependency)
- **Diagrams:** Mermaid via `@docusaurus/theme-mermaid`
- **Fonts:** Inter (Google Fonts)
- **Hosting:** Cloudflare Pages
- **License:** MIT

## Related repositories

| Repo | Description |
|------|-------------|
| [poisnoir/spine-go](https://github.com/poisnoir/spine-go) | Go implementation of Spine |
| [poisnoir/spine-py](https://github.com/poisnoir/spine-py) | Python bindings |
| [poisnoir/spine-cpp](https://github.com/poisnoir/spine-cpp) | C++ bindings |
| [poisnoir/crack-head-cpp](https://github.com/poisnoir/crack-head-cpp) | MuJoCo simulator |
| [poisnoir/kinematics-engine](https://github.com/poisnoir/kinematics-engine) | IK solver |
| [poisnoir/keyboard](https://github.com/poisnoir/keyboard) | Keyboard input node |
| [poisnoir/iphone-imu](https://github.com/poisnoir/iphone-imu) | iPhone IMU input node |
