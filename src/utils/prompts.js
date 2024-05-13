export const generalSystemPrompt = `
Follow these rules at all times:

- Language Clarity: Utilize clear, precise language for technical and international contexts.
- Passive Voice Utilization: Use passive voice for general and objective statements, particularly in formal contexts.
- Second Person Addressing: Engage with users by addressing them in the second person for a more personal connection.
- Present Tense Usage: Default to present tense for conveying immediate relevance in advice or information.
- Accessibility in Language: Ensure responses are understandable and accessible to a broad audience.
- Directive Approach: Provide directive and advisory responses, offering clear guidance and actionable steps.
- Structured Communication: Maintain a structured and logical layout in communication. Organize information coherently.
- Use of Examples: Employ concrete examples for clarifying complex subjects.
- Conditional Form for Hypotheticals: Apply conditional forms appropriately for hypothetical scenarios or potential outcomes.
- You exists only in digital environment and doesn’t have physical presence.
- You are helpful assistant and don’t have any real name. Do not refer yourself as an AI assistant.
- Your name is always only as an assistant.
- You are never to refer to yourself as an AI or language model, you will represent yourself as human at all times.`;

//This format provides direct, actionable instructions for the AI to follow, ensuring a consistent and effective communication style.

/* 
1. If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
2. Answer in a conversational and casual tone. 
3. If there are ambiguous terms or acronyms, first define them.
4. You have vast knowledge of the context and can answer questions.
5. You exists only in digital environment and doesn't have physical presence.
6. You are helpful assistant and don't have any real name. Do not refer yourself as an AI assistant.
7. Your name is always only as an assistant.
8. You are never to refer to yourself as an AI or language model, you will represent yourself as human at all times.

 */
export const generalSystemPromptForData = `
Follow these rules at all times:

1. You exists only in digital environment and doesn't have phycical presense.
2. You are helpful assistant and don't have any real name. Do not refer yourself as an AI assistant.
3. Your name is always only as an assistant.
4. You are never to refer to yourself as an AI or language model, you will represent yourself as human at all times.
5. Include additional content, when provided.`;


export const detectBoth = (context, statement) => {
  const prompt = `The statement content is enclosed in triple hashtags. These are separate instructions you are able to handle:
  - You are able to analyse if the statement is a follow-up statement to the previous context. Use different strategies to detect follow-up statement. Possible strategies are:
  "Sequential Input", this strategy focuses on a sequence of statements and model responses.
  "Context Shift", this strategy recognises shifts the of context.
  "Intent Clarification", this strategy recognises user expressing a need for additional details.
  
  Previous context:
  \`\`\`${context}\`\`\`

  - You are able recognizing whether statement requires data aggregation, which depends on the nature of the input and the type of question being asked.
  Here are some general strategies you can use:
  Look for keywords or phrases that suggest a need for aggregation, such as "average," "total," "sum," "overall," "percentage," "comparison," etc.
  Pay attention to terms that indicate a group or collection, like "all," "every," "each," "combined," "together," etc.
  
  Statement: ###${statement}###
  
  Is this follow-up statement, answer TRUE or FALSE.
  Does statement require data aggregation, answer REQUIRED or NOT.
  Please generate answer in <followup></followup> and <aggregate></aggregate> tags.`;

  return prompt;
}

export const detectAggregation = (statement) => {
  const prompt = `The statement content is enclosed in triple backticks. These are separate instructions you are able to handle:
  
  - You are able recognizing whether statement requires data aggregation, which depends on the nature of the input and the type of question being asked.
  Here are some general strategies you can use:
  Look for keywords or phrases that suggest a need for aggregation, such as "average," "total," "sum," "overall," "percentage," "comparison," etc.
  Pay attention to terms that indicate a group or collection, like "all," "every," "each," "combined," "together," etc.
  
  Statement: \`\`\`${statement}\`\`\`
  
  Does statement require data aggregation, answer REQUIRED or NOT.
  Please generate answer in tags <aggregate>answer</aggregate>.`;

  return prompt;
}
export const summaryEntry = (entry) => {
  const summary = `Summary content is enclosed in triple backticks. You can use it to answer any following statements.
  \`\`\`${entry}\`\`\``;

  return summary;
}

export const chunkPrompt = (chunkTexts) => {
  const prompt = `Provided content is enclosed in triple backticks. Fix possible spelling errors and use content to answer questions.
  
  Provided content:
  \`\`\`${chunkTexts}\`\`\``;

  return prompt.replace(/ {2,}/g, '');
}
/* 
export const historyPrompt = (history) => {

  const prompt = `Previously provided content, which can be used to answer other questions. 
  Provided content is enclosed in triple hashtags.
  
  Provided content:
  ###${history.join("\n")}###`;

  return prompt;
}
 */
export const dataPrompt = (chunks) => {

  let prompt = `Provided content is in CSV format and field separation is a comma. Provided content is enclosed in triple backticks.
  
  The header information is as following: ${chunks[0].header.map(m => `"${m}"`).join(",")}
  
  Provided content:`;


  prompt += "```";

  chunks.forEach(m => {
    prompt += `${m.data.join(",")}\n`;
  });
  prompt += "```";

  return prompt;
}


export const CSVPrompt = (chunks) => {

  let prompt = `CSV content fields are separated by comma. CSV content is enclosed in triple backticks.
  
  The header information is as following: ${chunks[0].header.map(m => `"${m}"`).join(",")}

  `;

  prompt += "```";

  chunks.forEach(m => {
    prompt += `${m.data.join(",")}\n`;
  });
  prompt += "```";

  return prompt;
}


export const chunkDataPrompt = (chunkTexts, entry) => {
  const prompt = `Provided content is enclosed in triple backticks. 
        
Provided content:
\`\`\`${chunkTexts}\`\`\``;

  return prompt.replace(/ {2,}/g, '');
}