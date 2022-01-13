import { useState } from 'react';
import Box from './Box';

const InputSlider = () => {
	const [active, setActive] = useState(false);
	const [initialX, setInitialX] = useState<number>();
	const [currentX, setCurrentX] = useState<number>();
	const [xOffset, setXOffset] = useState(0);

	const handleDragStart = (e) => {
		console.log('drag start');

		if (e.type === 'touchstart') {
			const X = e.touches[0].clientX - xOffset;
			setInitialX(X);
		} else {
			const X = e.clientX - xOffset;
			setInitialX(X);
		}

		setActive(true);
	};

	const handleDragMove = (e) => {
		if (active) {
			console.log('moving');

			e.preventDefault();

			if (e.type === 'touchmove') {
				const X = e.touches[0].clientX - initialX;
				setCurrentX(X);
			} else {
				const X = e.clientX - initialX;
				setCurrentX(X);
			}

			setXOffset(currentX);

			e.target.style.transform = `translate(${currentX}px, 0)`;
		}
	};

	const handleDragEnd = (e) => {
		console.log('end');

		setInitialX(currentX);
		setActive(false);
	};

	return (
		<Box overflow="visible" height="40px" display="flex" alignItems="center">
			<Box overflow="visible" bg="#ECF1F4" height="8px" width="50rem" mb="mm" borderRadius="16px" display="flex">
				<Box bg="simply-blue" width={`${(50 / 100) * 50}rem`} height="8px" mb="mm" borderRadius="16px" />
				<Box
					height="24px"
					width="24px"
					borderRadius="32px"
					bg="simply-white"
					onMouseDown={handleDragStart}
					onMouseMove={handleDragMove}
					onMouseUp={handleDragEnd}
					onTouchStart={handleDragStart}
					onTouchMove={handleDragMove}
					onTouchEnd={handleDragEnd}
					css={`
						position: relative;
						left: -16px;
						top: -8px;
						border: 1px solid rgba(0, 0, 0, 0.1);
						box-shadow: 0px 5.5px 5px -3px rgba(14, 14, 44, 0.2), inset 0px -1px 0px rgba(14, 14, 44, 0.4);
					`}
				/>
			</Box>
		</Box>
	);
};

export default InputSlider;
