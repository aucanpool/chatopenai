import { ValidateSchema } from './funtions/validateSchema.js';
import { schemaForm } from './resources/schema.js'
import { ValidateSchemaError } from './Exceptions/CustomError.js';
import { getMessages } from './funtions/getMessages.js';
import { generateChatCompletion } from './funtions/generateChatCompletion.js';
import { generateResponse } from './funtions/generateResponse.js';
const defaultAgent = process.env.DEFAULT_AGENT_OPENAI;
import { ApiGatewayManagementApiClient } from "@aws-sdk/client-apigatewaymanagementapi";
import { WebSocketMessageProcessedSuccessfully } from './resources/texts.js';
const defaultRouteKey = '$default';
const apiVersion = '2018-11-29';
const IS_OFFLINE=process?.env?.IS_OFFLINE==='true';
const urlLocal='http://localhost:3001';
const credentials={
  accessKeyId:"dummyAccessKeyID",
  secretAccessKey:"dummysecretAccessKey"
};
const FEEDBACK="-FEEDBACK";
const handler = async (event) => {
  let statusCode = 200, body = null;
  const connectionId = event.requestContext.connectionId;
  const routeKey = event.requestContext.routeKey;
  console.log(`Received ${routeKey} from connectionId ${connectionId}`);
  const connectId = event["requestContext"]["connectionId"]
  const domainName = event["requestContext"]["domainName"]
  const stageName = event["requestContext"]["stage"];
  if (routeKey !== defaultRouteKey) {
    return { statusCode: 200, body: WebSocketMessageProcessedSuccessfully };
  }
  try {
    let req = event.requestContext ? JSON.parse(event.body) : event;
    let agent= req.agent??defaultAgent;
    let schema=schemaForm[agent];
    if(schema==null)
    {
      schema=schemaForm[defaultAgent];
    }else if(req.feedback){
      agent+=FEEDBACK;
      schema=schemaForm[agent];
    }
    ValidateSchema(schema,req);
    console.log(req);
    let messages = getMessages(agent, req);
    let configuration=IS_OFFLINE?{
      apiVersion,
      endpoint: urlLocal,
      credentials
    }:{
      apiVersion,
      endpoint: `https://${domainName}/${stageName}`
    };
    
    const client = new ApiGatewayManagementApiClient(configuration);
    let content=await generateChatCompletion(client,connectId,messages);
    body={content};
  } catch (error) {
    console.log("error",error);
    if (error instanceof ValidateSchemaError) {
      statusCode=400;
      body={
        message:error.message,
        errors:error.errors
      };
    } else {
      statusCode=500;
      body={
        message:error.message
      };
    }
  }
  return generateResponse(statusCode,body);
};
export { handler };
