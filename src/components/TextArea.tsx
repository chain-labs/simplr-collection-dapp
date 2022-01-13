import styled from 'styled-components';
import Box from './Box';

const TextArea = ({ value, setValue }: { value: string; setValue: (string) => void }) => {
	return <TextAreaElement as="textarea" value={value} onChange={(e) => setValue(e.target.value)} />;
};

export default TextArea;

const TextAreaElement = styled(Box)(
	(props) => `
        width: 320px;
        height: 90px;
        background: ${props.theme.colors['blue-00']};
        box-shadow: inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1);
        border-radius: 8px;
        border: none;
        outline: none;
        padding: ${props.theme.space.ms} ${props.theme.space.mm};
        font-family: 'Switzer', sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        color: #8C8CA2
`
);
