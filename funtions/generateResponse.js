import { webReponseGenerated } from "../resources/texts.js";
const generateResponse=(statusCode, body)=>{
    let webResponse={
        statusCode,
        body:JSON.stringify(body)
    };
    console.log(webReponseGenerated,webResponse);
    return webResponse;
};
export{generateResponse};