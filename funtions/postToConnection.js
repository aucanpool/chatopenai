import { PostToConnectionCommand} from "@aws-sdk/client-apigatewaymanagementapi";
const postToConnection = async (client, connectId, data) => {
  const input = {
    Data: data,
    ConnectionId: connectId
  };
  const command = new PostToConnectionCommand(input);
  await client.send(command);
};
export {postToConnection };