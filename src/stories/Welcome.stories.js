import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import WelcomeContainer from '../Welcome';
import { theme } from '@/appConfig';

export default {
  title: 'AiAssistant/Welcome',
  component: WelcomeContainer,
};

const Template = (args) => (
  <ChakraProvider theme={theme}>
    <WelcomeContainer {...args} />
  </ChakraProvider>
);

export const Default = Template.bind({});
Default.args = {
  data: {
    avatar: 'https://via.placeholder.com/150',
    title: 'Welcome Title',
    title2: 'Subtitle here',
  },
  exampleText: 'Example text for the welcome container.',
};
