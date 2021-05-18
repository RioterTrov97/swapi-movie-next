import '../styles/globals.scss';
import { useState } from 'react';
import Loader from '../components/Loader';
import Router from 'next/router';

function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(false);
	Router.events.on('routeChangeStart', (url) => {
		setLoading(() => true);
	});
	Router.events.on('routeChangeComplete', (url) => {
		setLoading(() => false);
	});
	return (
		<>
			{loading && <Loader />}
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
