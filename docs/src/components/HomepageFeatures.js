import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Native AsciiDoc Support',
    description: (
      <>
        Write documentation using AsciiDoc syntax. The plugin seamlessly integrates
        AsciiDoc files with Docusaurus.
      </>
    ),
  },
  {
    title: 'Seamless Integration',
    description: (
      <>
        Mix Markdown and AsciiDoc in the same project. Use whichever format you prefer
        for each document.
      </>
    ),
  },
  {
    title: 'Performance Optimized',
    description: (
      <>
        Direct AST transformation without markdown serialization round-trips.
        Fast and efficient documentation generation.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
