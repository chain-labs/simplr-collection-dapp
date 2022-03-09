import { DefaultTheme } from 'styled-components';

//Breakpoints
const breakpoints: DefaultTheme['breakpoints'] = ['0px', '576px', '768px', '992px', '1200px', '1440px', '1600px'];

breakpoints.mobS = breakpoints[0]; // 320px
breakpoints.mobL = breakpoints[1]; // 424px
breakpoints.tabS = breakpoints[2]; // 767px
breakpoints.tabL = breakpoints[3]; // 1024px
breakpoints.deskS = breakpoints[4]; //1200px
breakpoints.deskM = breakpoints[5]; //1440px
breakpoints.deskL = breakpoints[6]; //1600px

//Spacing
const space: DefaultTheme['space'] = [
	'0',
	'0.4rem',
	'0.8rem',
	'1.2rem',
	'1.6rem',
	'2rem',
	'2.4rem',
	'2.8rem',
	'3.2rem',
	'4rem',
	'4.8rem',
	'5.6rem',
	'6.4rem',
	'8rem',
	'10rem',
	'12rem',
];

space.mxxs = space[1]; //4px
space.mxs = space[2]; //8px
space.ms = space[3]; //12px
space.mm = space[4]; //16px
space.ml = space[5]; //20px
space.mxl = space[6]; //24px
space.mxxl = space[7]; //28px
space.mxxxl = space[8]; //32px

space.wxxs = space[9]; //40px
space.wxs = space[10]; //48px
space.ws = space[11]; //56px
space.wm = space[12]; //64px
space.wl = space[13]; //80px
space.wxl = space[14]; //100px
space.wxxl = space[15]; //120px

const colors: DefaultTheme['colors'] = {
	'simply-blue': '#4743C5',
	'simply-black': '#010211',
	'simply-white': '#ffffff',
	'disable-black': '#8C8CA1',
	'simply-gray': '#868686',
	'light-purple': '#EFEFFD',

	'blue-90': '#0E0C5F',
	'blue-80': '#161572',
	'blue-70': '#24218C',
	'blue-60': '#3430A9',
	'blue-50': '#4743C5',
	'blue-40': '#726EDC',
	'blue-30': '#938FED',
	'blue-20': '#B9B7F8',
	'blue-10': '#DBDAFC',
	'blue-00': '#F0EFFC',

	'black-00': '#EAE9F3',
	'black-10': '#D4D0F3',
	'black-20': '#A9A3E9',
	'black-30': '#706AC0',
	'black-40': '#3F3983',
	'black-50': '#0E0C2F',
	'black-60': '#090828',
	'black-70': '#060620',
	'black-80': '#05031B',
	'black-90': '#010211',

	'green-00': '#F1FCEF',
	'green-10': '#DAFCD6',
	'green-20': '#AFFAAE',
	'green-30': '#83F08D',
	'green-40': '#62E279',
	'green-50': '#33CF5F',
	'green-60': '#25B25A',
	'green-70': '#199554',
	'green-80': '#10784B',
	'green-90': '#096345',

	'red-00': '#FCF2EF',
	'red-10': '#FCDDD5',
	'red-20': '#FAB5AD',
	'red-30': '#F28382',
	'red-40': '#E6616C',
	'red-50': '#D6314F',
	'red-60': '#B8234C',
	'red-70': '#9A1848',
	'red-80': '#7C0F42',
	'red-90': '#66093D',

	'yellow-00': '#FFFCF2',
	'yellow-10': '#FFF6D9',
	'yellow-20': '#FFEBB4',
	'yellow-30': '#FFDE8E',
	'yellow-40': '#FFD072',
	'yellow-50': '#FFBA44',
	'yellow-60': '#DB9631',
	'yellow-70': '#B77522',
	'yellow-80': '#935715',
	'yellow-90': '#7A410D',

	'purple-10': '#F0EFFC',
	'purple-50': '#7E47DF',

	'white-00': '#FAFAFF',
	'white-10': '#E6E6FF',
	'white-20': '#E5E5FF',

	'gray-00': '#ABABB2',
};

const shadows: DefaultTheme['shadows'] = {
	'shadow-100': '0px 2px 4px -2px rgba(24, 39, 75, 0.12), 0px 4px 4px -2px rgba(24, 39, 75, 0.08)',
	'shadow-200': '0px 4px 6px -4px rgba(24, 39, 75, 0.12), 0px 8px 8px -4px rgba(24, 39, 75, 0.08)',
	'shadow-300': '0px 6px 8px -6px rgba(24, 39, 75, 0.12), 0px 8px 16px -6px rgba(24, 39, 75, 0.08)',
	'shadow-400': '0px 6px 12px -6px rgba(24, 39, 75, 0.12), 0px 8px 24px -4px rgba(24, 39, 75, 0.08)',
	'shadow-500': '0px 6px 14px -6px rgba(24, 39, 75, 0.12), 0px 10px 32px -4px rgba(24, 39, 75, 0.1)',
	'shadow-600': '0px 8px 18px -6px rgba(24, 39, 75, 0.12), 0px 12px 42px -4px rgba(24, 39, 75, 0.12)',
	'shadow-700': '0px 8px 22px -6px rgba(24, 39, 75, 0.12), 0px 14px 64px -4px rgba(24, 39, 75, 0.12)',
	'shadow-800': '0px 8px 28px -6px rgba(24, 39, 75, 0.12), 0px 18px 88px -4px rgba(24, 39, 75, 0.14)',
};

const theme: DefaultTheme = {
	space,
	breakpoints,
	colors,
	shadows,
};

export default theme;
