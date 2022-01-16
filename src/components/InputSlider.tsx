import Box from './Box';

const InputSlider = ({ value, setValue, max, min }) => {
	const handleChange = (e) => {
		const value = e.target.value;
		setValue(value);

		const target = e.target;
		if (target.type === 'range') {
			target.style.backgroundSize = `${((value - min) * 100) / (max - min)}% 100%`;
		}
	};
	return (
		<Box
			as="input"
			type="range"
			value={value}
			onInput={handleChange}
			max={max}
			min={min}
			css={`
				${styles}
			`}
		/>
	);
};

export default InputSlider;

const styles = `
    -webkit-appearance: none;
    margin-right: 15px;
    height: 8px;
    width: 424px;
    background: #ECF1F4;
    background-image: linear-gradient(to right, #4743c5, #4743c5);
    border-radius: 5px;
    background-size: 15% 100%;
    background-repeat: no-repeat;
    overflow: visible;
    
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: #fff;
        cursor: ew-resize;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0px 5.5px 5px -3px rgba(14, 14, 44, 0.2), inset 0px -1px 0px rgba(14, 14, 44, 0.4);
        transition: background .3s ease-in-out;

    }
    ::-webkit-slider-runnable-track  {
        -webkit-appearance: none;
        box-shadow: none;
        border: none;
        background: transparent;
      }
`;
