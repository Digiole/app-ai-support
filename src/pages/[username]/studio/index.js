// src/pages/[username]/studio/index.js
import React from 'react';
import { Box, Flex, Heading, VStack, HStack, Avatar, Text, Button, Spacer, ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from "next/image";
import { FaExternalLinkAlt, FaLink } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ToggleButton from '@/pages/components/ToggleButton';
import { Icon } from '@iconify/react';
import { fetchProfile } from '@/pages/utils/Profile';
import { fetchLinks } from '@/pages/utils/Links';

const SidebarHeader = () => {
  return (
    <Box bg="#C0C6C7" padding="8px 16px" alignItems="center" width="240px" height="60px">
      <Flex align="center">
        <Image priority src="/assets/AIAssistantStudio.svg" alt="Logo" width={48} height={48} />
        <Heading size="md" ml="12px" fontFamily="DM Sans" fontWeight="700" fontSize="16px" color="#1D3437">AI Assistant Studio</Heading>
      </Flex>
    </Box>
  );
};

const StatusSection = ( { profile } ) => {
  const [isOnline, setIsOnline] = useState(true);

  const handleToggle = () => {
    setIsOnline(!isOnline);
  };

  return (
    <Box bg="#DEE1E2" p="4" display="flex" flexDirection="column" gap="4" width="240px">
      <HStack spacing="3" alignItems="flex-end">
        <Box width="48px" height="48px" position="relative">
          <Avatar src="/path-to-avatar-image.png" size="full" />
          { isOnline ? <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            border="4px solid #80D24E"
            borderRadius="full"
            backgroundImage="url(/path-to-avatar-image.png)"
            backgroundBlendMode="lighten"
          /> : 
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            border="4px solid #768486"
            borderRadius="full"
            backgroundImage="url(/path-to-avatar-image.png)"
            backgroundBlendMode="lighten"
          /> }
          <Box
            position="absolute"
            bottom="0"
            right="0"
            width="20px"
            height="20px"
            background="#1D3437"
            border="2px solid #FAFAFB"
            borderRadius="full"
          >
            <Text fontSize="xs" color="#FFFFFF" textAlign="center">AI</Text>
          </Box>
        </Box>
        <VStack alignItems="flex-start" spacing="1">
          <Text fontSize="md" fontWeight="500" color="#0E2629">{profile.name}</Text>
          <Text fontSize="xs" fontWeight="400" color="#3B4F52">{profile.headline}</Text>
        </VStack>
      </HStack>
      <HStack justifyContent="space-between" alignItems="center" width="full" padding="4px 0">
        <Text fontSize="sm" fontWeight="500" color="#0E2629">Assistant Status:</Text>
        <ToggleButton isOnline={isOnline} onToggle={handleToggle} />
      </HStack>
      <HStack spacing="4">
        <Button leftIcon={<FaExternalLinkAlt />} colorScheme="blue" variant="solid" size="sm" width="full" bg="#F5F6F6" borderRadius="8px" color="#0E2629">
          Open
        </Button>
        <Button leftIcon={<FaLink />} colorScheme="blue" variant="solid" size="sm" width="full" bg="#F5F6F6" borderRadius="8px" color="#0E2629">
          Copy Link
        </Button>
      </HStack>
    </Box>
  );
};

const Sidebar = ( {profile, linkItems} ) => {
  const router = useRouter();
  const { username, tab } = router.query;
  const [selected, setSelected] = useState(tab || 'profile');

  return (
    <Flex direction="column" w="240px" bg="#F5F6F6" height="100vh" position="fixed" top="0" left="0">
      <SidebarHeader />
      <VStack align="start" spacing="2" gap="8px" flex="1" overflowY="auto">
        {linkItems.map((link) => (
          <NextLink key={link.name} href={`/${username}/studio/${link.href}`}>
            <Flex
              flexDirection="row"
              alignItems="center"
              p="8px 12px"
              gap="8px"
              w="208px"
              h="40px"
              bg={selected === link.href ? 'rgba(0, 0, 0, 0.08)' : 'transparent'}
              borderRadius="6px"
              boxShadow={selected === link.href ? 'inset 0px 2px 4px rgba(0, 0, 0, 0.06)' : 'none'}
              cursor="pointer"
              _hover={{ bg: 'rgba(0, 0, 0, 0.08)' }}
              onClick={() => setSelected(link.href)}
            >
              <Icon icon={link.icon} style={{ color: '#0e2629', width: '20.67px', height: '20.67px' }} />
              <Text>{link.name}</Text>
              {selected === link.href && <Box as="span" ml="auto">➡️</Box>}
            </Flex>
          </NextLink>
        ))}
      </VStack>
      <StatusSection profile={profile}/>
    </Flex>
  );
};

const Studio = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [linkItems, setLinkItems] = useState([])
  useEffect(() => {
    const loadContents = async () => {
      const profile_res = await fetchProfile();
      const links_res = await fetchLinks();
      setLinkItems(links_res)
      setProfile(profile_res);
    };
    loadContents();
  }, []);
  return (
    <ChakraProvider>
      <Flex>
      <Sidebar profile={profile} linkItems={linkItems}/>
      <Box flex="1" ml="240px" height="100vh" overflowY="auto" p="4">
        {children}
      </Box>
    </Flex>
    </ChakraProvider>
    
  );
};

export default Studio;
