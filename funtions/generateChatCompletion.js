import { OpenAI } from 'openai';
import { consumingOpenaiService, successfulOpenaiRequest,textMessages } from '../resources/texts.js';
import { fetchSecretManager } from './fecthSecretManager.js';
import {postToConnection } from './postToConnection.js';
const charNextLine="\n";
const regExpFlags = "g";
const completionEndText='<br>';
const modelOpenAi="gpt-3.5-turbo";
const isDev = process.env.stage === "dev";
const stringEmpty="";
const generateChatCompletion = async(apiManager,connectId, messages) => {
  let secrets= await fetchSecretManager(process.env.SN_OPENAI_API);
  let values=JSON.parse(secrets);
  console.log(consumingOpenaiService);
  const openai = new OpenAI({apiKey: values.API_KEY, organization:values.ORG_ID});
  if (isDev) console.log(textMessages, JSON.stringify(messages, null, 2));
  const chatCompletion = await openai.chat.completions.create({
    model: modelOpenAi,
    stream:true,
    messages: messages,
    temperature: 1,
    frequency_penalty: 2,
    presence_penalty: 0
  });
  let full=stringEmpty;
  for await (const part of chatCompletion) {
    let choice=part.choices[0];
    let text=(choice.finish_reason===null)?choice.delta.content: stringEmpty;
    let regExp = new RegExp(charNextLine, regExpFlags);
    text = text.replace(regExp, completionEndText);
    await postToConnection(apiManager,connectId,text);
    full+=text;
  }
  console.log(successfulOpenaiRequest);
  return full;
};
export { generateChatCompletion };