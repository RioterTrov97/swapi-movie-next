import React from 'react';
import styles from '../styles/Loader.module.scss';

const Loader = () => {
	return (
		<div className={styles.container}>
			<div className={styles.lds_hourglass}>
				<div className={styles.lds_hourglass__text}>
					<p>
						Please wait while we fetch awesome details for you...{' '}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Loader;
