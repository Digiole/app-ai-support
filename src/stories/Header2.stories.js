import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Header from '../Header2';
import { theme } from '@/appConfig';

export default {
  title: 'AiAssistant/Header2',
  component: Header,
};

const Template = (args) => (
  <ChakraProvider theme={theme}>
    <Header {...args} />
  </ChakraProvider>
);

export const Default = Template.bind({});
Default.args = {
  onClose: () => console.log('Close header'),
  onOpen: () => console.log('Open header'),
  isOpen: false,
  isMobile: false,
};
