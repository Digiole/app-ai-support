// src/pages/[username]/studio/Profile.js
import {
  Box, Button, FormControl, FormLabel, Heading, Input, Textarea, VStack, Avatar, HStack, IconButton, Text, Spacer
} from '@chakra-ui/react';
import { FiCamera, FiTrash } from 'react-icons/fi';
import Studio from './index';
import PageTitle from '@/pages/components/PageTitle';

const Profile = () => {
  return (
    <Studio>
      <Box
        p="24px 32px 24px 40px"
        bg="#FFFFFF"
        boxShadow="md"
        borderRadius="md"
        maxW="1272px"
        mx="auto"
        mt="6" 
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        gap="24px"
      >
        <Heading size="lg" mb="6" fontFamily="'DM Sans'" fontWeight="700" fontSize="16px" lineHeight="19px" letterSpacing="-0.005em" color="#1D3437">Manage AI Assistant</Heading>
        <VStack spacing="6" align="stretch">
          <FormControl>
            <FormLabel fontFamily="'DM Sans'" fontWeight="500" fontSize="19px" lineHeight="23px" color="#1D3437">Assistant Avatar</FormLabel>
            <HStack spacing="32px" alignItems="flex-end">
              <Avatar size="2xl" src="/src/assets/app-avatar.png" boxSize="160px" />
              <VStack align="start">
                <Button leftIcon={<FiCamera />} colorScheme="blue">Change Photo</Button>
                <Button leftIcon={<FiTrash />} variant="outline" colorScheme="red">Remove Photo</Button>
              </VStack>
            </HStack>
            <Text fontSize="sm" color="gray.500">Minimum image size 200x200 px</Text>
          </FormControl>
          <FormControl>
            <FormLabel fontFamily="'DM Sans'" fontWeight="500" fontSize="19px" lineHeight="23px" color="#1D3437">Assistant Name</FormLabel>
            <Input placeholder="Mel" />
          </FormControl>
          <FormControl>
            <FormLabel fontFamily="'DM Sans'" fontWeight="500" fontSize="19px" lineHeight="23px" color="#1D3437">Headline</FormLabel>
            <Input placeholder="AI Assistant by Digiole" />
          </FormControl>
          <FormControl>
            <FormLabel fontFamily="'DM Sans'" fontWeight="500" fontSize="19px" lineHeight="23px" color="#1D3437">Public Link</FormLabel>
            <Input value="https://get-ai.support/digiole" isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel fontFamily="'DM Sans'" fontWeight="500" fontSize="19px" lineHeight="23px" color="#1D3437">Description</FormLabel>
            <Textarea placeholder="Example: as a senior business strategist, I am happy to assist with any questions or concerns. Please feel free to reach out via chat or conversation." />
          </FormControl>
          <FormControl>
            <FormLabel fontFamily="'DM Sans'" fontWeight="500" fontSize="19px" lineHeight="23px" color="#1D3437">Personalization</FormLabel>
            <Textarea placeholder="Example: as a senior business strategist, I am happy to assist with any questions or concerns. Please feel free to reach out via chat or conversation." />
          </FormControl>
          <Button colorScheme="blue" alignSelf="flex-end">Apply Changes</Button>
        </VStack>
        <Spacer />
      </Box>
    </Studio>
  );
};

export default Profile;
