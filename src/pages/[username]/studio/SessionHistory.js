// src/pages/[username]/studio/SessionHistory.js
import {
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td, VStack
} from '@chakra-ui/react';
import Studio from './index';

const SessionHistory = () => {
  return (
    <Studio>
      <Box maxW="1000px" mx="auto">
        <Heading size="lg" mb="6">Session History</Heading>
        <VStack spacing="4" align="stretch">
          <Box>
            <Heading size="md">Summary</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Time Stamp</Th>
                  <Th>Session Brief</Th>
                  <Th>Duration</Th>
                  <Th>Language</Th>
                  <Th>Location</Th>
                  <Th>Score</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>22/5/2024 03:30:22 PM</Td>
                  <Td>The Apollotech B340...</Td>
                  <Td>00:50:22</Td>
                  <Td>English</Td>
                  <Td>Helsinki</Td>
                  <Td>67.4</Td>
                </Tr>
                {/* Add more rows as needed */}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </Box>
    </Studio>
  );
};

export default SessionHistory;
