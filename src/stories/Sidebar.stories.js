import React from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/appConfig';
import SideBar from '../SideBar';

export default {
  title: 'AiAssistant/SideBar',
  component: SideBar,
};

const Template = (args) => (
  <ChakraProvider theme={theme}>
    <SideBar {...args} />
  </ChakraProvider>
);

export const Default = Template.bind({});
Default.args = {
  mobile: false,
  onClose: () => console.log('Close sidebar'),
};
