import { DefaultTheme } from "styled-components";

//Breakpoints
const breakpoints: DefaultTheme["breakpoints"] = [
  "0px",
  "576px",
  "768px",
  "992px",
  "1200px",
  "1440px",
  "1600px",
];

breakpoints.mobS = breakpoints[0]; // 319px
breakpoints.mobL = breakpoints[1]; // 424px
breakpoints.tabS = breakpoints[2]; // 767px
breakpoints.tabL = breakpoints[3]; // 1025px
breakpoints.deskS = breakpoints[4]; //1199px
breakpoints.deskM = breakpoints[5]; //1440px
breakpoints.deskL = breakpoints[6]; //1600px

//Spacing
const space: DefaultTheme["space"] = [
  "0",
  "0.4rem",
  "0.8rem",
  "1.2rem",
  "1.6rem",
  "2rem",
  "2.4rem",
  "2.8rem",
  "3.2rem",
  "4rem",
  "4.8rem",
  "5.6rem",
  "6.4rem",
  "8rem",
  "10rem",
  "12rem",
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

const colors: DefaultTheme["colors"] = {
  "black-10": "#0D0E1E",
  "blue-10": "#020541",
  "blue-20": "#030641",
  "red-10": "#CC0000",
  "red-20": "#FF2E3D",
  "white-10": "#FFFFFF",
};

const theme: DefaultTheme = {
  space,
  breakpoints,
  colors,
};

export default theme;
