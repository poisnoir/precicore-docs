import { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function AnimatedStat({ countTo, suffix }) {
  const [value, setValue] = useState('0');
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1200;
        const isFloat = !Number.isInteger(countTo);
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = countTo * eased;
          setValue(isFloat ? current.toFixed(1) : String(Math.round(current)));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [countTo]);

  return (
    <span ref={ref} className={styles.statNumber}>
      {value}{suffix}
    </span>
  );
}

function Hero() {
  const layoutRef = useRef(null);

  useEffect(() => {
    const el = layoutRef.current;
    if (!el) return;
    const onScroll = () => {
      const opacity = Math.max(0.25, 1 - window.scrollY / 480);
      el.style.opacity = String(opacity);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroLayout} ref={layoutRef}>
        <div className={styles.heroContent}>
          <img src="/img/logo.svg" alt="PreciCore" className={styles.heroLogo} />
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
        <div className={styles.heroVisual}>
          <div className={styles.codeWindow}>
            <div className={styles.codeWindowBar}>
              <span />
              <span />
              <span />
            </div>
            <pre className={styles.codePreview}>{`// connect a node — 3 lines
node := spine.NewNode("purifier")

node.Subscribe("input/raw",
  func(msg spine.Msg) {
    clean := kalman.Filter(msg.Data)
    node.Publish("input/clean", clean)
  },
)

node.Start()
// mDNS · KCP/UDP · AES-GCM`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { countTo: 3, suffix: '', label: 'Open Source Tools' },
    { countTo: 0.5, suffix: 'mm', label: 'Cornea Thickness' },
    { countTo: 5, suffix: '-DOF', label: 'Robotic Arm' },
    { fixed: 'MIT', label: 'Licensed' },
  ];
  return (
    <section className={styles.statsSection}>
      <p className={styles.sectionLabel}>01 · THE STACK</p>
      {stats.map((s, i) => (
        <div key={i} className={styles.statRow}>
          {s.fixed
            ? <span className={styles.statNumber}>{s.fixed}</span>
            : <AnimatedStat countTo={s.countTo} suffix={s.suffix} />
          }
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

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Operator Input',
      description: 'Xbox controller, iPhone IMU, or keyboard — any source connects through the modular Spine Nodes input layer.',
      link: '/docs/spine-nodes/input/intro',
    },
    {
      number: '02',
      title: 'Purifier Filters',
      description: 'A Kalman filter strips tremor and noise from raw movement, producing a stable, clinically precise signal.',
      link: '/docs/spine-nodes/intro',
    },
    {
      number: '03',
      title: 'Spine Routes',
      description: 'Clean commands travel over KCP/UDP with zero-config mDNS discovery and AES-GCM encryption end-to-end.',
      link: '/docs/spine/intro',
    },
    {
      number: '04',
      title: 'Hardware Executes',
      description: 'CrackHead validates trajectories on a virtual phantom cornea before the 5-DOF arm moves in the real world.',
      link: '/docs/spine-nodes/crack-head/intro',
    },
  ];
  return (
    <section className={styles.howItWorks}>
      <p className={styles.sectionLabel}>03 · HOW IT WORKS</p>
      <div className={styles.flowGrid}>
        {steps.map((step) => (
          <Link key={step.number} className={styles.flowStep} to={step.link}>
            <span className={styles.flowNumber}>{step.number}</span>
            <h3 className={styles.flowTitle}>{step.title}</h3>
            <p className={styles.flowDescription}>{step.description}</p>
            <span className={styles.flowArrow}>→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className={styles.cta}>
      <p className={styles.sectionLabel}>04 · GET STARTED</p>
      <h2 className={styles.ctaTitle}>
        <em>Start building</em><br />with PreciCore.
      </h2>
      <div className={styles.ctaButtons}>
        <Link className={styles.btnPrimary} to="/docs/spine/intro">
          READ THE DOCS →
        </Link>
        <a className={styles.btnSecondary} href="https://github.com/poisnoir" target="_blank" rel="noopener noreferrer">
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
        <HowItWorks />
        <CTA />
      </main>
    </Layout>
  );
}
