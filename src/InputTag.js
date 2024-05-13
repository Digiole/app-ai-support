/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef, forwardRef, } from "react";
import { Box, Flex, Tag, TagCloseButton, Input, Wrap, WrapItem } from "@chakra-ui/react";


/* 
const EmailField = forwardRef(
  ({ options, inputState, initState = true, ...props }, ref) => {

 */

//export default function InputTag({ placeholder, updateSelection, initData = [] }) {
const InputTag = forwardRef(({ placeholder, updateSelection, initData = [] }, ref) => {

  const [dataInput, setDataIput] = useState(initData);
  const ref_input = ref;
  const effectCalled = useRef(false);
  const [tagOptions, setTagOptions] = useState(initData);

  const [sizeInput, setSizeInput] = useState(() => 1);
  //console.log("INPUT TAGS ", dataInput, tagOptions);

  //const options = [{ name: "Validated", key: "validated" }, { name: "Document", key: "document" }, { name: "Transcript", key: "transcript" }];

  useEffect(() => {
    /*  ref_input.current?.focus(); // auto focus input */

    function handleKeyUp(event) {
      const newText = ref_input.current.value.trim().replace(",", "");

      switch (event.key) {
        case ",":
          if (newText.length > 0) {
            const dataInputTemp = [...dataInput];
            dataInputTemp.push(newText);
            const tagOptionsTemp = tagOptions;
            tagOptionsTemp.splice(tagOptions.findIndex(key => key === newText), 1);
            setTagOptions(tagOptionsTemp);
            setDataIput(() => [...dataInputTemp]);
            updateSelection(dataInputTemp);
            ref_input.current.value = "";
          } else {
            ref_input.current.value = "";
          }
          break;
        case "Enter":
          if (newText.length > 0) {
            const dataInputTemp = [...dataInput];


            dataInputTemp.push(newText);
            const tagOptionsTemp = tagOptions;
            tagOptionsTemp.splice(tagOptions.findIndex(key => key === newText), 1);
            setTagOptions(tagOptionsTemp);

            setDataIput(() => [...dataInputTemp]);
            updateSelection(dataInputTemp);
            ref_input.current.value = "";
          }
          break;
        /*  case "Backspace":
           if (dataInput.length > 0 && newText.length === 0) {
             const dataInputTemp = [...dataInput];
             dataInputTemp.pop();
             setDataIput([...dataInputTemp]);
           }
           break; */
        default:
          break;
      }
    }
    if (!effectCalled.current) {
      window.addEventListener("keyup", handleKeyUp);
      // effectCalled.current = true;
    }
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [dataInput, updateSelection, tagOptions, sizeInput, ref_input]);

  function handleDelItem(index) {
    const dataInputTemp = [...dataInput];
    dataInputTemp.splice(index, 1);
    const tagOptionsTemp = tagOptions;
    tagOptionsTemp.push(dataInput[index]);
    setTagOptions(tagOptionsTemp);
    setDataIput(() => [...dataInputTemp]);
    updateSelection(dataInputTemp);
  }
  // const handleSelectionClick = useCallback((e) => {
  const handleInputChance = (e) => {
    let value = e.target.value;
    if (value.trim().length > 0) {
      setSizeInput(value.length);
    } else {
      ref_input.current.value = "";
    }

  };
  return (

    <Flex onClick={() => ref_input.current.focus()}>
      <Wrap w={"100%"} sx={{ ul: { justifyContent: "left" } }}>

        <WrapItem >
          <Wrap >
            {dataInput.map((text, i) => (
              <WrapItem key={i + "_" + text}>
                <Tag

                  colorScheme="cyan"
                  style={{ marginRight: "4px", marginTop: "4px" }}
                >
                  {text}
                  <TagCloseButton onClick={() => handleDelItem(i)} />
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </WrapItem>
        <WrapItem>
          <Input placeholder={placeholder} ref={ref_input} onChange={handleInputChance} />
          {/* 
          <Select placeholder={placeholder} ref={ref_input} onChange={handleSelectionClick}>
            {tagOptions.map((opt, cid) => (
              <option
                key={`option-${cid}`}
                value={opt.name}
                texttransform="capitalize"
                data-value={opt.name}
              >
                {opt.name}
              </option>
            ))}
          </Select> */}

        </WrapItem>
      </Wrap>
    </Flex>

  );
});


export default InputTag;