import { useEffect } from 'react';
import { debounce } from 'lodash';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import theme from 'styleguide/theme';

import 'styleguide/globalStyles.css';
import { ThemeProvider } from 'styled-components';

import { Provider } from 'react-redux';
import { store } from 'src/redux/store';

import Navbar from 'components/Navbar';

const MyApp = ({ Component, pageProps }) => {
	useEffect(() => {
		// Set a custom CSS Property for Height
		// See https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		if (process.browser) {
			const vh = window.innerHeight * 0.01;
			// Then we set the value in the --vh custom property to the root of the document
			document.documentElement.style.setProperty('--vh', `${vh}px`);

			const handleResize = debounce(() => {
				// We execute the same script as before
				const vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty('--vh', `${vh}px`);
			}, 150);

			window.addEventListener('resize', handleResize);
			return () => {
				if (process.browser) {
					window.removeEventListener('resize', handleResize);
				}
			};
		}
	});

	return (
		<>
			<Head>
				<title>Simplr Collection</title>
				<link href="https://api.fontshare.com/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet" />
				<link rel="shortcut icon" href="/favicon.png" />
			</Head>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Navbar />
					<Component {...pageProps} />
					<div id="portal"></div>
				</ThemeProvider>
			</Provider>
		</>
	);
};

export default MyApp;
