import { chunk } from 'llm-chunk'

export const TextSplitter = (text, config) => {
  const chunks = chunk(text, config);
  //console.log(chunks.length);
  //.replace(/ +/g, ' ')
  //return chunks.map(s => s.replace(/\s\n/g, " ").replace(/\n/g, " "));
  //.replace(/\u00A0/g, " ");
  return chunks.map(s => s.replace(/\s\n/g, " ").replace(/\n/g, " ").replace(/\u00A0/g, " ").replace(/ +/g, " "));
}