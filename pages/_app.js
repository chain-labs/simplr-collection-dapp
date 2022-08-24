import { useEffect } from 'react';
import { debounce } from 'lodash';
import Head from 'next/head';

import theme from 'styleguide/theme';

import 'styleguide/globalStyles.css';
import '@rainbow-me/rainbowkit/styles.css';
import { ThemeProvider } from 'styled-components';

import { wrapper } from 'src/redux/store';
import ModalHandler from 'components/ModalHandler';

import Navbar from 'components/Navbar';
import Wagmi from 'components/Wagmi';
import ApolloClientProvider from 'components/ApolloClient';

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
				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `
					(function(c,l,a,r,i,t,y){
						c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
						t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
						y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
					})(window, document, "clarity", "script", "b6ii472snx");
                  `,
					}}
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<Wagmi>
					<ApolloClientProvider>
						<Navbar />
						<Component {...pageProps} />
						<ModalHandler />
					</ApolloClientProvider>
				</Wagmi>
			</ThemeProvider>
		</>
	);
};

export default wrapper.withRedux(MyApp);
