import React from 'react';
import { NumberLiteralType } from 'typescript';

interface Props {
	step: number;
	setStep: (step: number) => void;
}

const Footer = ({ step, setStep }: Props) => {
	return <div>Footer</div>;
};

export default Footer;
