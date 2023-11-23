import { agentMessagesTemplates } from '../resources/agentMessagesTemplates.js';
import { gettingMessagesTemplates } from '../resources/texts.js';
import { rolesOpenAi as roles } from '../resources/rolesOpenAi.js';
const regExpFlags = "g";
const getMessages = (agent, data) => {
  let messageTemplate = { ...agentMessagesTemplates[agent] };
  delete data.agent;
  console.log(gettingMessagesTemplates);
  let messages = [
    { role: roles.system, content:  replaceProperties(data,messageTemplate.system)}
  ];
  messageTemplate.chatInteractions.forEach((interaction) => {
    if (interaction.assistant) {
      messages.push({ role: roles.assintant, content:replaceProperties(data,interaction.assistant) });
    }
    if (interaction.user) {
      messages.push({ role: roles.user, content :replaceProperties(data,interaction.user)});
    }
  });
  return messages;
};
const replaceProperties=(data,content)=>{
  for (const property in data) {
    let regExp = new RegExp(`{${property}}`, regExpFlags);
    if(regExp.test(content))
      content = content.replace(regExp, data[property]);
  }
  return content;
};
export { getMessages };