import { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const ToggleButton = ({ isOnline, onToggle }) => {
  if(isOnline) {
    return (
      <Box
        onClick={onToggle}
        display="flex"
        flexDirection="row"
        justifyContent={isOnline ? 'flex-end' : 'flex-start'}
        alignItems="center"
        padding="4px"
        gap="4px"
        width="70px"
        height="24px"
        bg={isOnline ? '#80D24E' : '#C0C6C7'}
        boxShadow="inset 0px 0px 6px rgba(0, 0, 0, 0.1)"
        borderRadius="20px"
        cursor="pointer"
      >
        <Text
          fontFamily="'DM Sans', sans-serif"
          fontWeight="500"
          fontSize="13px"
          lineHeight="120%"
          color="#F5F6F6"
          order="1"
          flexGrow="0"
        >
          Online
        </Text>
        <Box
          width="16px"
          height="16px"
          bg="#F5F6F6"
          borderRadius="full"
          flex="none"
          order="0"
          flexGrow="0"
        />
      </Box>
    );
  } else {
    return (
      <Box
        onClick={onToggle}
        display="flex"
        flexDirection="row"
        justifyContent={isOnline ? 'flex-end' : 'flex-start'}
        alignItems="center"
        padding="4px"
        gap="4px"
        width="70px"
        height="24px"
        bg={isOnline ? '#80D24E' : '#C0C6C7'}
        boxShadow="inset 0px 0px 6px rgba(0, 0, 0, 0.1)"
        borderRadius="20px"
        cursor="pointer"
      >
        <Text
          fontFamily="'DM Sans', sans-serif"
          fontWeight="500"
          fontSize="13px"
          lineHeight="120%"
          color="#F5F6F6"
          order="1"
          flexGrow="0"
        >
          Offline
        </Text>
        <Box
          width="16px"
          height="16px"
          bg="#F5F6F6"
          borderRadius="full"
          flex="none"
          order="0"
          flexGrow="0"
        />
      </Box>
    );
  }
  
};

export default ToggleButton;
