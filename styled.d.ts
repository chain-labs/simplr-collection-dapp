import 'styled-components';

interface ISpace {
	mxxs: string;
	mxs: string;
	ms: string;
	mm: string;
	ml: string;
	mxl: string;
	mxxl: string;
	mxxxl: string;

	wxxs: string;
	wxs: string;
	ws: string;
	wm: string;
	wl: string;
	wxl: string;
	wxxl: string;
}

interface IBreakpoints {
	mobS: string;
	mobL: string;
	tabS: string;
	tabL: string;
	deskS: string;
	deskM: string;
	deskL: string;
}

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			'black-10': string;
			'blue-10': string;
			'blue-20': string;
			'red-10': string;
			'red-20': string;
			'white-10': string;
		};
		space: string[] & Partial<ISpace>;
		breakpoints: string[] & Partial<IBreakpoints>;
	}
}
