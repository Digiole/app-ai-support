// src/pages/[username]/studio/KnowledgeBase.js
import {
  Box, Button, FormControl, FormLabel, Heading, HStack, IconButton, Text, VStack, Input, useToast
} from '@chakra-ui/react';
import { FiTrash } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Studio from './index';

const KnowledgeBase = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch(`${process.env.MIDDLEWARE_API_URL}files`);
      const data = await response.json();
      setFiles(data.map(file => ({ name: file, originalName: file })));
    };
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await fetch(`${process.env.MIDDLEWARE_API_URL}upload`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setFiles([...files, { name: data.file.filename, originalName: data.file.originalname }]);
      toast({
        title: 'File uploaded',
        description: `${data.file.originalname} uploaded successfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Upload failed',
        description: 'There was a problem uploading your file',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFileDelete = async (filename) => {
    const response = await fetch(`${process.env.MIDDLEWARE_API_URL}files/${filename}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setFiles(files.filter(file => file.name !== filename));
      toast({
        title: 'File deleted',
        description: 'File deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Delete failed',
        description: 'There was a problem deleting your file',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Studio>
      <Box maxW="800px" mx="auto">
        <Heading size="lg" mb="6">Manage Knowledge Base</Heading>
        <VStack spacing="4" align="stretch">
          <Heading size="md">Knowledge Sources</Heading>
          <Text>Upload files for the knowledge related to this assistant, this will be the main source of information for the assistant.</Text>
          <Box>
            {files.map(file => (
              <HStack key={file.name}>
                <Text>{file.originalName}</Text>
                <IconButton icon={<FiTrash />} variant="outline" colorScheme="red" onClick={() => handleFileDelete(file.name)} />
              </HStack>
            ))}
          </Box>
          <HStack>
            <Input type="file" onChange={handleFileChange} />
            <Button colorScheme="blue" onClick={handleFileUpload}>Upload File</Button>
          </HStack>
        </VStack>
      </Box>
    </Studio>
  );
};

export default KnowledgeBase;
