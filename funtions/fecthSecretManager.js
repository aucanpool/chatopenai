import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
const client = new SecretsManagerClient();
const {IS_OFFLINE}= process.env;
const fetchSecretManager = async (secretName) => {
    if(IS_OFFLINE==="true")
         return '{"API_KEY":"VAR_API_KEY","ORG_ID":"VAR_ORG_ID"}';
    let response = await client.send(
        new GetSecretValueCommand({
            SecretId: secretName
        })
    );
    
    return response.SecretString;
};
export { fetchSecretManager };