// src/pages/[username]/studio/KnowledgeBase.js
import {
  Box, Button, FormControl, FormLabel, Heading, HStack, IconButton, Text, VStack
} from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';
import Studio from './index';

const KnowledgeBase = () => {
  return (
    <Studio>
      <Box maxW="800px" mx="auto">
        <Heading size="lg" mb="6">Manage Knowledge Base</Heading>
        <VStack spacing="4" align="stretch">
          <Heading size="md">Knowledge Sources</Heading>
          <Text>Upload files for the knowledge related to this assistant, this will be the main source of information for the assistant.</Text>
          <Box>
            <HStack>
              <Text>Knowledge-ai-glossary.pdf</Text>
              <IconButton icon={<FiTrash />} variant="outline" colorScheme="red" />
            </HStack>
            <HStack>
              <Text>faqs-refined.txt</Text>
              <IconButton icon={<FiTrash />} variant="outline" colorScheme="red" />
            </HStack>
            <HStack>
              <Text>user-manual-refined.docx</Text>
              <IconButton icon={<FiTrash />} variant="outline" colorScheme="red" />
            </HStack>
          </Box>
          <HStack>
            <Button variant="outline" colorScheme="blue">Quick Add</Button>
            <Button colorScheme="blue">Upload File</Button>
          </HStack>
        </VStack>
      </Box>
    </Studio>
  );
};

export default KnowledgeBase;
