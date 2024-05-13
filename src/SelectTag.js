import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Flex, Tag, TagCloseButton, Select, Wrap, WrapItem } from "@chakra-ui/react";

export default function SelectTag({ placeholder, options, updateSelection, initData = [] }) {
  const [dataInput, setDataIput] = useState(initData);
  const ref_input = useRef(null);
  const effectCalled = useRef(false);
  const [tagOptions, setTagOptions] = useState(() => {
    return options.filter((opt) => {
      return !initData.includes(opt.key)
    });
  });

  console.log("INPUT TAGS ", dataInput, tagOptions);

  //const options = [{ name: "Validated", key: "validated" }, { name: "Document", key: "document" }, { name: "Transcript", key: "transcript" }];

  useEffect(() => {
    /*  ref_input.current?.focus(); // auto focus input */

    function handleKeyUp(event) {
      const newText = ref_input.current.value.trim();
      switch (event.key) {

        case "Enter":
          if (newText.length > 0) {
            const dataInputTemp = [...dataInput];

            const newKey = options.find(t => t.name === newText)?.key;
            dataInputTemp.push(newKey);
            const tagOptionsTemp = tagOptions;
            tagOptionsTemp.splice(tagOptions.findIndex(obj => obj.key === newKey), 1);
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
      effectCalled.current = true;
    }
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [dataInput, updateSelection, tagOptions, options]);

  function handleDelItem(index) {
    const dataInputTemp = [...dataInput];
    dataInputTemp.splice(index, 1);
    const tagOptionsTemp = tagOptions;
    tagOptionsTemp.push(options.filter(opt => opt.key === dataInput[index])[0])
    //selectedPlans.current.push(doc.metadata.plans.map(p => planOptions.find(k => k.key === p)?.name));
    setTagOptions(tagOptionsTemp);
    setDataIput(() => [...dataInputTemp]);
    updateSelection(dataInputTemp);
  }
  // const handleSelectionClick = useCallback((e) => {
  const handleSelectionClick = (e) => {
    //console.log("SELECTION CLICK", e);
    // console.log("REF ", ref_input);
    const dataInputTemp = [...dataInput];
    const newKey = options.find(t => t.name === e.target.value)?.key;

    dataInputTemp.push(newKey);
    //selectedPlans.current.push(doc.metadata.plans.map(p => planOptions.find(k => k.key === p)?.name));
    const tagOptionsTemp = tagOptions;
    tagOptionsTemp.splice(tagOptions.findIndex(obj => obj.key === newKey), 1);
    setTagOptions(tagOptionsTemp);
    setDataIput(() => [...dataInputTemp]);
    updateSelection(dataInputTemp);
    ref_input.current.value = "";
  };
  return (

    <Flex onClick={() => ref_input.current.focus()}>
      <Wrap m={2} w={"100%"}>

        <WrapItem  >
          <Wrap >
            {dataInput.map((text, i) => (
              <WrapItem key={i + "_" + text}>
                <Tag

                  colorScheme="cyan"
                  style={{ marginRight: "4px", marginTop: "4px" }}
                >
                  {options.find(t => t.key === text)?.name}
                  <TagCloseButton onClick={() => handleDelItem(i)} />
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </WrapItem>
        <WrapItem>
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
          </Select>

        </WrapItem>
      </Wrap>
    </Flex>

  );
}
