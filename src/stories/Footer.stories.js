// Footer.stories.js
import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Raleway } from 'next/font/google';
import { theme } from '@/appConfig';
import Footer from '../Footer';
import { Primary } from './Button.stories';


// const nextFont = Raleway({
//   weight: ['100', '300', '400', '500', '700', '800', '900'],
//   subsets: ['latin'],
// });


// const theme = extendTheme({
//   // Set the fonts like this
//   fonts: {
//     body: nextFont.style.fontFamily,
//     heading: nextFont.style.fontFamily,
//   },
//   components: { Button: buttonTheme },
// });


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'AiAssistant/Footer',
  component: Footer,
  decorators: [
    (Story) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    newMessage: { action: 'newMessage' },
    onMounted: { action: 'onMounted' },
  },
};

// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
// const Template = (args) => <Footer {...args} />;

// export const Default = Template.bind({});
// Default.args = {
//   newMessage: (e) => console.log('New message:', e),
//   onMounted: () => console.log('Footer mounted'),
//   ref: null,
// };

export const EmptyFooter = {
    args:{
        newMessage: "",
        onMounted: () =>{}
    }
}