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
			'simply-blue': string;
			'simply-black': string;
			'simply-white': string;
			'disable-black': string;
			'simply-gray': string;
			'light-purple': string;

			'blue-10': string;
			'blue-20': string;
			'blue-30': string;
			'blue-40': string;
			'blue-50': string;
			'blue-60': string;
			'blue-70': string;
			'blue-80': string;
			'blue-90': string;
			'blue-00': string;

			'black-10': string;
			'black-20': string;
			'black-30': string;
			'black-40': string;
			'black-50': string;
			'black-60': string;
			'black-70': string;
			'black-80': string;
			'black-90': string;
			'black-00': string;

			'green-10': string;
			'green-20': string;
			'green-30': string;
			'green-40': string;
			'green-50': string;
			'green-60': string;
			'green-70': string;
			'green-80': string;
			'green-90': string;
			'green-00': string;

			'red-10': string;
			'red-20': string;
			'red-30': string;
			'red-40': string;
			'red-50': string;
			'red-60': string;
			'red-70': string;
			'red-80': string;
			'red-90': string;
			'red-00': string;

			'yellow-10': string;
			'yellow-20': string;
			'yellow-30': string;
			'yellow-40': string;
			'yellow-50': string;
			'yellow-60': string;
			'yellow-70': string;
			'yellow-80': string;
			'yellow-90': string;
			'yellow-00': string;

			'white-00': string;
			'white-10': string;
			'white-20': string;

			'gray-00': string;
		};
		space: string[] & Partial<ISpace>;
		breakpoints: string[] & Partial<IBreakpoints>;
		shadows: {
			'shadow-100': string;
			'shadow-200': string;
			'shadow-300': string;
			'shadow-400': string;
			'shadow-500': string;
			'shadow-600': string;
			'shadow-700': string;
			'shadow-800': string;
		};
	}
}
