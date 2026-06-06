import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './404.module.css';

export default function NotFound() {
  return (
    <Layout title="404 — Page not found">
      <main className={styles.main}>
        <div className={styles.content}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>Page not found.</h1>
          <p className={styles.subtitle}>
            This page doesn't exist or has been moved.
          </p>
          <Link className={styles.btn} to="/docs/spine/intro">
            BACK TO DOCS →
          </Link>
        </div>
      </main>
    </Layout>
  );
}
