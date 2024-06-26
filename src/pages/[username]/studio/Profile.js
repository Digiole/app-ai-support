// src/pages/[username]/studio/Profile.js
import {
  Box, Button, FormControl, FormLabel, Heading, Input, Textarea, VStack, Avatar, HStack, IconButton, Text, Spacer, Flex
} from '@chakra-ui/react';
import { FiCamera, FiTrash } from 'react-icons/fi';
import Studio from './index';
import PageTitle from '@/pages/components/PageTitle';
import { fetchProfile, updateProfile } from '@/pages/utils/Profile'
import { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState('');
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');
  const [personalization, setPersonalization] = useState('');
  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile();
      setProfile(data);
      setName(data.name);
      setHeadline(data.headline);
      setDescription(data.description);
      setPersonalization(data.personalization);
    };
    loadProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const updatedProfile = {
      ...profile,
      name,
      headline,
      description,
      personalization,
    };
    await updateProfile(updatedProfile);
    setProfile(updatedProfile);
  };
  return (
    <Studio>
      <Flex direction="column" bg="#F5F6F6"  top="0" left="240px">
        <PageTitle title="Manage AI Assistant" />
        <Box
           maxW="800px" mx="auto"
        >
          {/* <Heading size="lg" mb="6" fontFamily="'DM Sans'" fontWeight="700" fontSize="16px" lineHeight="19px" letterSpacing="-0.005em" color="#1D3437">Manage AI Assistant</Heading> */}
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
              <Input placeholder={`${profile.name}`}  onChange={(e) => setName(e.target.value)}/>
            </FormControl>
            <FormControl>
              <FormLabel fontFamily="'DM Sans'" fontWeight="500" fontSize="19px" lineHeight="23px" color="#1D3437">Headline</FormLabel>
              <Input placeholder={`${profile.headline}`} onChange={(e) => setHeadline(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel fontFamily="'DM Sans'" fontWeight="500" fontSize="19px" lineHeight="23px" color="#1D3437">Public Link</FormLabel>
              <Input value={`${profile.publicLink}`} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel fontFamily="'DM Sans'" fontWeight="500" fontSize="19px" lineHeight="23px" color="#1D3437">Description</FormLabel>
              <Textarea placeholder={`${profile.description}`} onChange={(e) => setDescription(e.target.value)}/>
            </FormControl>
            <FormControl>
              <FormLabel fontFamily="'DM Sans'" fontWeight="500" fontSize="19px" lineHeight="23px" color="#1D3437">Personalization</FormLabel>
              <Textarea placeholder={`${profile.personalization}`} onChange={(e) => setPersonalization(e.target.value)}/>
            </FormControl>
            <Button colorScheme="blue" alignSelf="flex-end" onClick={handleUpdateProfile}>Apply Changes</Button>
          </VStack>
          <Spacer />
        </Box>
      </Flex>
      
    </Studio>
  );
};

export default Profile;
