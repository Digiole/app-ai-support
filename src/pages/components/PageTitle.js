import { Flex, Box, Heading, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaCog, FaBell, FaSignOutAlt } from 'react-icons/fa';

const PageTitle = ({ title }) => {
  return (
    <Box bg="#F5F6F6" padding="8px 16px" alignItems="center" height="60px" >
      <Flex
    //   boxSizing="border-box"
    //   flexDirection="row"
    //   justifyContent="space-between"
    //   alignItems="center"
    //   padding="16px 32px"
    //   position="absolute"
    //   width="1272px"
    //   height="60px"
    //   left="240px"
    //   top="108px"
      align="center"
    //   border="0px solid #A3A3A3"
    //   boxShadow="inset 0px 2px 4px rgba(0, 0, 0, 0.06)"
    >
      <Heading size="md" ml="12px" fontFamily="DM Sans" fontWeight="700" fontSize="16px" color="#1D3437">{title}</Heading>
      <Flex gap="8px">
        <IconButton
          icon={<FaCog />}
          aria-label="Settings"
          variant="ghost"
        />
        <IconButton
          icon={<FaBell />}
          aria-label="Notifications"
          variant="ghost"
        />
        <IconButton
          icon={<FaSignOutAlt />}
          aria-label="Sign Out"
          variant="ghost"
        />
      </Flex>
    </Flex>
    </Box>
    
  );
};

export default PageTitle;
