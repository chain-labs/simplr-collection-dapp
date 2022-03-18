import { useState, useEffect } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { userSelector } from 'src/redux/user';
import { SignerProps, UseSignerResult } from './types';

const useSigner = (): UseSignerResult => {
	const [signer, setSigner] = useState<SignerProps>(null);

	const user = useAppSelector(userSelector);

	useEffect(() => {
		if (user.provider?.provider) {
			setSigner(user.provider?.getSigner());
		}
	}, [user.provider]);

	return [signer, setSigner];
};

export default useSigner;
