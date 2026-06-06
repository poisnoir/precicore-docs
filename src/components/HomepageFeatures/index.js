import styles from './styles.module.css';

const FeatureList = [
  {
    icon: '🔗',
    title: 'Spine',
    description: 'A lightweight, ROS-like communication middleware built from scratch in Go. Pub/sub and RPC over KCP/UDP with zero-config mDNS discovery and AES-GCM encryption.',
  },
  {
    icon: '🧠',
    title: 'CrackHead',
    description: 'A MuJoCo-powered physics simulator for the PreciCore robotic arm. Validate control algorithms and needle trajectories on a virtual phantom cornea before touching hardware.',
  },
  {
    icon: '🌀',
    title: 'Purifier',
    description: 'A Kalman filter-based signal processing system. Sits between raw operator input and the control system — turning shaky human movement into stable, precise commands.',
  },
  {
    icon: '🎮',
    title: 'Input Nodes',
    description: 'Modular operator input layer supporting Xbox controller, iPhone IMU wrist control, and keyboard — all feeding into Purifier before reaching the robotic arm.',
  },
  {
    icon: '🤖',
    title: 'Kinematics Engine',
    description: 'Inverse kinematics and RCM-constrained motion planning for the 5-DOF robotic arm. Maps operator input to precise needle placement at the surgical site.',
  },
  {
    icon: '🌐',
    title: 'Open Source',
    description: 'Spine, CrackHead, and Purifier are all MIT licensed and owned entirely by our team. Built in the open, designed to be reused across robotics projects.',
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureIcon}>{icon}</div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresGrid}>
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}