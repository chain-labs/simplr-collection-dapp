import Link from 'next/link';
import React, { useEffect } from 'react';
import Box from 'src/components/Box';
import ButtonComp from 'src/components/Button';
import If from 'src/components/If';
import Text from 'src/components/Text';
import theme from 'src/styleguide/theme';
import HomeHero1 from 'src/svgs/home-hero-1.svg';
import HomeHero2 from 'src/svgs/home-hero-2.svg';
import HomeHero3 from 'src/svgs/home-hero-3.svg';

const HomeComponent = () => {
	const [choice, setChoice] = React.useState(0);

	useEffect(() => {
		const random = Math.floor(Math.random() * 3) + 1;
		setChoice(random);
	}, []);

	const getRandomSVG = (random) => {
		switch (random) {
			case 1:
				return <HomeHero1 />;
			case 2:
				return <HomeHero2 />;
			case 3:
				return <HomeHero3 />;
			default:
				return <HomeHero1 />;
		}
	};

	return (
		<Box center height="100vh">
			<Box width="125rem" mx="auto" row alignItems="center" justifyContent="space-between">
				<Box minWidth="56rem" maxWidth="57rem">
					<Text as="h1">
						Create your own NFT <span style={{ color: theme.colors['simply-blue'] }}>Collection</span> without a
						developer.
					</Text>
					<Text as="b1" mt="mxl" color="gray-40">
						Easy to use no-code platform to create NFT smart contracts and launch your NFT projects without any hassle.
					</Text>
					<Link href="/my-collections" passHref>
						<ButtonComp
							bg="primary"
							py="mm"
							px="wm"
							borderRadius="64px"
							mt="mxxxl"
							boxShadow="4px 7px 0px #010211"
							css={`
								transition: all 0.08s ease-in-out;
								&:hover {
									background: #3733b3;
								}
								&:active {
									box-shadow: none;
									background: ${theme.colors['blue-50']};
									transform: translate(4px, 7px);
								}
							`}
						>
							<Text as="btn1">Start Creating</Text>
						</ButtonComp>
					</Link>
				</Box>
				<Box>
					<If condition={!!choice} then={getRandomSVG(choice)} />
				</Box>
			</Box>
		</Box>
	);
};

export default HomeComponent;
