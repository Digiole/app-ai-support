// src/pages/[username]/studio/index.js
import React from 'react';
import { Box, Flex, Heading, VStack, HStack, Avatar, Text, Switch, Spacer, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from "next/image";
import { FaUser, FaBook, FaHistory, FaLink, FaExternalLinkAlt } from 'react-icons/fa';
import { useState } from 'react';
import ToggleButton from '@/pages/components/ToggleButton';
import { Icon } from '@iconify/react';

const linkItems = [
  { name: 'Assistant Profile', icon: "profile", href: 'Profile' },
  { name: 'Knowledge Base', icon: "knowledge_base", href: 'KnowledgeBase' },
  { name: 'Session History', icon: "session_history", href: 'SessionHistory' }
];

const SidebarHeader = () => {
  return (
    <Box bg="#C0C6C7" padding="8px 16px" alignItems="center" width="240px" height="60px"
    >
      <Flex align="center" justify="center">
        <Image priority src="../../../../public/assets/AIAssistantStudio.svg" alt="Logo" width={48} height={48} />
        <Heading size="md" ml="12px" fontFamily="DM Sans" fontWeight="700" fontSize="16px" color="#1D3437">AI Assistant Studio</Heading>
      </Flex>
    </Box>
  );
};

const StatusSection = () => {
  const [isOnline, setIsOnline] = useState(true);

  const handleToggle = () => {
    setIsOnline(!isOnline);
  };
  return (
    <Box bg="#DEE1E2" p="4" display="flex" flexDirection="column" gap="4" width="240px">
      <HStack spacing="3" alignItems="flex-end">
        <Box width="48px" height="48px" position="relative">
          <Avatar src="/path-to-avatar-image.png" size="full" />
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            border="4px solid #80D24E"
            borderRadius="full"
            backgroundImage="url(/path-to-avatar-image.png)"
            backgroundBlendMode="lighten"
          />
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
          <Text fontSize="md" fontWeight="500" color="#0E2629">Mel</Text>
          <Text fontSize="xs" fontWeight="400" color="#3B4F52">AI Assistant by Digiole</Text>
        </VStack>
      </HStack>
      <HStack justifyContent="space-between" alignItems="center" width="full" padding="4px 0">
        <Text fontSize="sm" fontWeight="500" color="#0E2629">Assistant Status:</Text>
        <ToggleButton isOnline={true} onToggle={handleToggle} />
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
  )
}

const Sidebar = () => {
  const router = useRouter();
  const { username, tab } = router.query;
  const [selected, setSelected] = useState(tab || 'profile');

  return (
    <Flex direction="column"
      w="240px"
      bg="#F5F6F6"
      top="108px"
      left="0px" 
      >
      <SidebarHeader />
      <VStack align="start" spacing="2" gap="8px">
        {linkItems.map((link, index) => (
          <Flex  key={link.name} flexDirection="row" alignItems="center" p="0">
            <NextLink href={`/${username}/studio/${link.href}`}>
              <HStack
              p="3"
              w="100%"
              bg={selected === link.href ? 'gray.300' : 'transparent'}
              borderRadius="md"
              cursor="pointer"
              _hover={{ bg: 'gray.200' }}
              onClick={() => setSelected(link.href)}
            >
                {link.icon == "profile" && <Icon icon="mdi:account-circle-outline"  style={{color: '#0e2629'}} />}
                {link.icon == "knowledge_base" && <Icon icon="solar:library-line-duotone"  style={{color: '#0e2629'}} />}
                {link.icon == "session_history" && <Icon icon="material-symbols:history"  style={{color: '#0e2629'}} />}
                <Text>{link.name}</Text>
                {selected === link.href && <Box as="span" ml="auto">➡️</Box>}
              </HStack>
            </NextLink>
          </Flex>
        ))}
      </VStack>
      <Spacer />

      <StatusSection />
    </Flex>
  );
};

const Studio = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p="4">
        {children}
      </Box>
    </Flex>
  );
};

export default Studio;
