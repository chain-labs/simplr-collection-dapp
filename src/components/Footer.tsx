import Box from "./Box";
import Image from "next/image";
import Text from "./Text";

const Footer = () => {
  return (
    <Box pt={{ mobS: "mxxxl", tabS: "wxxl" }} pb="wxxs">
      <Box
        display="flex"
        flexDirection={{ mobS: "column", tabS: "row" }}
        justifyContent={{ mobS: "flex-start", tabS: "space-between" }}
        mx="auto"
        alignItems={{ mobS: "flex-start", tabS: "center" }}
        width={{ mobS: "90vw", deskM: "112rem" }}
        mb="wl"
      >
        <Box
          position="relative"
          height={{ mobS: "7.2rem", mobL: "10.4rem" }}
          width={{ mobS: "24.6rem", mobL: "35.7rem" }}
          mb="mxxxl"
        >
          <Image src="/static/images/brand.svg" layout="fill" />
        </Box>
        <Box row flexWrap="wrap">
          <Box column mr="wxxs" mb={{ mobS: "wxxs", tabS: "0" }} order={1}>
            <Box
              as="a"
              href=""
              fontSize="1.8rem"
              fontWeight="300"
              color="#EAEAEA"
              mb="mxxl"
            >
              About
            </Box>
            <Box
              as="a"
              href=""
              fontSize="1.8rem"
              fontWeight="300"
              color="#EAEAEA"
              mb="mxxl"
            >
              Roadmap
            </Box>
            <Box
              as="a"
              href=""
              fontSize="1.8rem"
              fontWeight="300"
              color="#EAEAEA"
              mb="mxxl"
            >
              Team
            </Box>
            <Box
              as="a"
              href=""
              fontSize="1.8rem"
              fontWeight="300"
              color="#EAEAEA"
            >
              Gallery
            </Box>
          </Box>
          <Box column mr="wxxs" order={{ mobS: 3, tabL: 2 }}>
            <Box
              as="a"
              href=""
              fontSize="1.8rem"
              fontWeight="300"
              color="#EAEAEA"
              mb="mxxl"
            >
              Discord
            </Box>
            <Box
              as="a"
              href=""
              fontSize="1.8rem"
              fontWeight="300"
              color="#EAEAEA"
              mb="mxxl"
            >
              Instagram
            </Box>
            <Box
              as="a"
              href=""
              fontSize="1.8rem"
              fontWeight="300"
              color="#EAEAEA"
            >
              Twitter
            </Box>
          </Box>
          <Box column order={{ mobS: 2, tabL: 3 }}>
            <Box
              as="a"
              href=""
              fontSize="1.8rem"
              fontWeight="300"
              color="#EAEAEA"
              mb="mxxxl"
            >
              Terms and Conditions
            </Box>
            <Box
              as="a"
              href=""
              fontSize="1.8rem"
              fontWeight="300"
              color="#EAEAEA"
              mb="mxxxl"
            >
              View on Opensea
            </Box>
            <Box
              as="a"
              href=""
              fontSize="1.8rem"
              fontWeight="300"
              color="#EAEAEA"
            >
              View on Etherscan
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mx="auto" center>
        <Text fontSize="1.6rem" fontWeight="thin" textDecoration="underline">
          Powered by Simplr
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
