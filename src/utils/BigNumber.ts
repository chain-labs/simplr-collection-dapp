import { BigNumber } from 'ethers';

export const addBNs = (numbers: string[]) => {
	let sum = BigNumber.from('0');
	numbers.forEach((number) => {
		sum = sum.add(BigNumber.from(number));
	});

	return `${sum.toString()}`;
};

export const incrementBN = (value: string) => {
	return addBNs([value, '1']);
};

export const subBN = (from: string, amount: string) => {
	const result = BigNumber.from(from).sub(BigNumber.from(amount));
	return `${result.toString()}`;
};

export const decrementBN = (value: string) => {
	return subBN(value, '1');
};

export const gtBN = (lhs: string, rhs: string) => {
	const result = BigNumber.from(lhs).gt(BigNumber.from(rhs));
	return result;
};

export const gteBN = (lhs: string, rhs: string) => {
	const result = BigNumber.from(lhs).gte(BigNumber.from(rhs));
	return result;
};

export const ltBN = (lhs: string, rhs: string) => {
	const result = BigNumber.from(lhs).lt(BigNumber.from(rhs));
	return result;
};

export const lteBN = (lhs: string, rhs: string) => {
	const result = BigNumber.from(lhs).lte(BigNumber.from(rhs));
	return result;
};

export const multiplyBN = (number1: string, number2: string) => {
	const result = BigNumber.from(number1).mul(BigNumber.from(number2));
	return `${result.toString()}`;
};

export const largerBN = (N1: string, N2: string) => {
	if (gtBN(N1, N2)) {
		return N1;
	} else return N2;
};

export const smallerBN = (N1: string, N2: string) => {
	if (ltBN(N1, N2)) {
		return N1;
	} else return N2;
};
