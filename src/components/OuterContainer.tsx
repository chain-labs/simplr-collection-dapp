import Box from "components/Box";
// import Navbar from 'components/Navbar';
// import Footer from './Footer';

const OuterContainer = ({ children, bg }) => {
  return (
    <Box bg={bg} minHeight="100vh">
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </Box>
  );
};

export default OuterContainer;
