// src/pages/[username]/studio/Profile.js
import {
  Box, Button, FormControl, FormLabel, Heading, Input, Textarea, VStack, Avatar, HStack, IconButton, Text
} from '@chakra-ui/react';
import { FiCamera, FiTrash } from 'react-icons/fi';
import Studio from './index';

const Profile = () => {
  return (
    <Studio>
      <Box
        p="4"
        bg="#FFFFFF"
        boxShadow="md"
        borderRadius="md"
        maxW="1000px"
        mx="auto"
        mt="6"
      >
        <Heading size="lg" mb="6">Manage AI Assistant</Heading>
        <VStack spacing="6" align="stretch">
          <FormControl>
            <FormLabel>Assistant Avatar</FormLabel>
            <HStack spacing="4">
              <Avatar size="xl" src="/src/assets/app-avatar.png" />
              <VStack align="start">
                <Button leftIcon={<FiCamera />} colorScheme="blue">Change Photo</Button>
                <Button leftIcon={<FiTrash />} variant="outline" colorScheme="red">Remove Photo</Button>
              </VStack>
            </HStack>
            <Text fontSize="sm" color="gray.500">Minimum image size 200x200 px</Text>
          </FormControl>
          <FormControl>
            <FormLabel>Assistant Name</FormLabel>
            <Input placeholder="Mel" />
          </FormControl>
          <FormControl>
            <FormLabel>Headline</FormLabel>
            <Input placeholder="AI Assistant by Digiole" />
          </FormControl>
          <FormControl>
            <FormLabel>Public Link</FormLabel>
            <Input value="https://get-ai.support/digiole" isReadOnly />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Example: as a senior business strategist, I am happy to assist with any questions or concerns. Please feel free to reach out via chat or conversation." />
          </FormControl>
          <FormControl>
            <FormLabel>Personalization</FormLabel>
            <Textarea placeholder="Example: as a senior business strategist, I am happy to assist with any questions or concerns. Please feel free to reach out via chat or conversation." />
          </FormControl>
          <Button colorScheme="blue" alignSelf="flex-end">Apply Changes</Button>
        </VStack>
      </Box>
    </Studio>
  );
};

export default Profile;
