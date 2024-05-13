
import {
  Text, HStack, Button, Input, Box,
  useNumberInput
} from '@chakra-ui/react'

import { useAppContext } from './contexLib';

export default function Settings() {

  const { settings, sideBarEvents } = useAppContext();
  console.log(settings);
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 0.05,
      defaultValue: settings.scoreLimit.default,
      min: settings.scoreLimit.min,
      max: settings.scoreLimit.max,
      precision: 2,
      onChange: (val) => {
        console.log("CHANGE ", val);
        sideBarEvents({ settings: { scoreLimit: val } })
      }
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <Box p={[2, 5]}>
      <Text>Search score limit:</Text>
      <HStack maxW='200px' mt={2}>

        <Button {...dec}>-</Button>
        <Input {...input} />
        <Button {...inc}>+</Button>
      </HStack>
    </Box>
  )
}