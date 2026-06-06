import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>Technical Documentation</p>
        <h1 className={styles.heroTitle}>
          Bridge the gap between<br />
          <em>promising simulation</em><br />
          and micro-precision hardware.
        </h1>
        <p className={styles.heroSubtitle}>
          Everything you need to build with Spine, CrackHead, and Purifier —
          the open-source stack powering PreciCore's surgical robotics system.
        </p>
        <div className={styles.heroButtons}>
          <Link className={styles.btnPrimary} to="/docs/spine/intro">
            EXPLORE SPINE →
          </Link>
          <Link className={styles.btnSecondary} to="/docs/spine-nodes/intro">
            EXPLORE NODES
          </Link>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { number: '3', label: 'Open Source Tools' },
    { number: '0.5mm', label: 'Cornea Thickness' },
    { number: '5-DOF', label: 'Robotic Arm' },
    { number: 'MIT', label: 'Licensed' },
  ];
  return (
    <section className={styles.statsSection}>
      <p className={styles.sectionLabel}>01 · THE STACK</p>
      {stats.map((s, i) => (
        <div key={i} className={styles.statRow}>
          <span className={styles.statNumber}>{s.number}</span>
          <span className={styles.statLabel}>{s.label}</span>
        </div>
      ))}
    </section>
  );
}

function Tools() {
  const tools = [
    {
      tag: 'MIDDLEWARE',
      name: 'Spine',
      description: 'A lightweight, ROS-like communication protocol built from scratch in Go. Pub/sub and RPC over KCP/UDP with zero-config mDNS discovery and AES-GCM encryption.',
      link: '/docs/spine/intro',
    },
    {
      tag: 'SIMULATOR',
      name: 'CrackHead',
      description: 'A MuJoCo-powered physics simulator for the PreciCore robotic arm. Validate control algorithms and needle trajectories on a virtual phantom cornea before touching hardware.',
      link: '/docs/spine-nodes/crack-head/intro',
    },
    {
      tag: 'FILTERING',
      name: 'Purifier',
      description: 'A Kalman filter-based signal processing system. Sits between raw operator input and the control system — turning shaky human movement into stable, precise commands.',
      link: '/docs/spine-nodes/intro',
    },
  ];
  return (
    <section className={styles.toolsSection}>
      <p className={styles.sectionLabel}>02 · CORE TOOLS</p>
      <h2 className={styles.toolsTitle}>Built from scratch.<br />Owned entirely by us.</h2>
      <div className={styles.toolsGrid}>
        {tools.map((t, i) => (
          <Link key={i} className={styles.toolCard} to={t.link}>
            <p className={styles.toolTag}>{t.tag}</p>
            <h3 className={styles.toolName}>{t.name}</h3>
            <p className={styles.toolDescription}>{t.description}</p>
            <span className={styles.toolLink}>Read docs →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className={styles.cta}>
      <p className={styles.sectionLabel}>03 · GET STARTED</p>
      <h2 className={styles.ctaTitle}>
        <em>Start building</em><br />with PreciCore.
      </h2>
      <div className={styles.ctaButtons}>
        <Link className={styles.btnPrimary} to="/docs/spine/intro">
          READ THE DOCS →
        </Link>
        <a className={styles.btnSecondary} href="https://github.com/poisnoir" target="_blank">
          VIEW ON GITHUB
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="PreciCore Docs"
      description="Technical documentation for the PreciCore surgical robotics system">
      <main className={styles.main}>
        <Hero />
        <Stats />
        <Tools />
        <CTA />
      </main>
    </Layout>
  );
}