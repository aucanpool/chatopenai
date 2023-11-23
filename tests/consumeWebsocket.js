import WebSocket from 'ws'
const IS_OFFLINE=false;
const urlWebsocket=IS_OFFLINE?"ws://localhost:3001":'wss://djlco81wil.execute-api.us-east-1.amazonaws.com/dev';
const wsPlugin=()=>{
  const ws = new WebSocket(urlWebsocket, { handshakeTimeout: 2000 });
ws.on('open', () => {
  console.log('WebSocket connection opened');

  let request = 
  {"theme": "Christmas",
  "inspiration": "jingle bells",
  "groupName": "Mex",
  "groupMembers": "Angel, Allam, Wero and Pato",
  "highlights": "Angel got a new job, now Angel works for Banregio. Allam became a father for the first time. Wero and Pato took trip to Bacalar during summer"
};
  ws.send(JSON.stringify(request));
});

ws.on('error', console.error);

ws.on('message', (data) => {
  let stringData=data.toString();
  if(!(stringData.startsWith("{") && stringData.endsWith("}")))
    process.stdout.write(stringData);
});
ws.on('unexpected-response', (request,response) => {
  console.log("unexpect",JSON.stringify({request,response}))
});
ws.on('close', () => {
  console.log();
  console.log('WebSocket connection closed');
});

};
const charNextLine="\n";
const regExpFlags = "g";
const completionEndText='<br>';

import pkg from 'websocket';
const webSocketPlugin=()=>{

  var client = new pkg.w3cwebsocket(urlWebsocket);
  var assistantsLastResponse='';
  client.onerror = function() {
      console.log('Connection Error');
  };
  
  client.onopen = function() {
      console.log('WebSocket Client Connected');
//       let request = 
//   {
//     "agent": "BURL","theme": "Christmas",
//   "inspiration": "jingle bells",
//   "groupName": "Mex",
//   "groupMembers": "Angel, Allam, Wero and Pato",
//   "highlights": "Angel got a new job, now Angel works for Banregio. Allam became a father for the first time. Wero and Pato took trip to Bacalar during summer",
//   "poem":"Jingle Bells, Jingle Bells,\nChristmas time is near.\nLet's gather 'round the Mex family,\nBringing holiday cheer.\n\nAngel, with a new job in hand,\nAt Banregio they now stand.\nSpreading joy and financial delight,\nMaking dreams take flight.\n\nAllam, a brand-new father this year,\nFilled with love and joy so clear.\nA little bundle of happiness arrived,\nInto their hearts forever to reside.\n\nWero and Pato set off on an adventure bold\nTo Bacalar's beauty they were sold\nAmidst turquoise waters they did play\nCreating memories that will never fade away\n\nThe Mex family celebrates this season bright\nWith love in their hearts shining ever so light.\nAs jingle bells ring through the air above \nMay your Christmas be filled with laughter and love. \n\nWishing you warm moments by the fire's glow \nAnd all the magic that Santa can bestow. \nMay your days be merry as you gather near  \nMerry Christmas to all - from far or near!\n\nWith Joyful Greetings,\n\nBurl",
//   "feedback":"Could the poem be more romantic?"
// };
let request = 
{
  "agent": "BURLNEW","theme": "Christmas",
"inspiration": "jingle bells",
"groupName": "Mex",
"groupMembers": "Angel, Allam, Wero and Pato",
"highlights": "Angel got a new job, now Angel works for Banregio. Allam became a father for the first time. Wero and Pato took trip to Bacalar during summer"
};
  client.send(JSON.stringify(request));
  };
  
  client.onclose = function() {
    let regExp = new RegExp(completionEndText, regExpFlags);
    assistantsLastResponse = assistantsLastResponse.replace(regExp, charNextLine);
      console.log('echo-protocol Client Closed',assistantsLastResponse);
  };
  client.onmessage = function(e) {
      if (typeof e.data === 'string' && !(e.data.startsWith("{") && e.data.endsWith("}"))) {
        process.stdout.write(e.data);
      }
  };
};
webSocketPlugin();
console.log("ok");