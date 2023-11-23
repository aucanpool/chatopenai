const schemaForm={    
  "BURL":{
    type: "object",
    properties: {
        agent: {type: "string"},
        theme: {type: "string"},
        inspiration:{type:"string"},
        groupName: {type: "string"},
        groupMembers: {type: "string"},
        highlights: {type: "string"}
    },
    required: ["agent","theme","inspiration","groupName","groupMembers","highlights"],
    additionalProperties: true
  },
  "BURL-FEEDBACK":{
    type: "object",
    properties: {
        agent: {type: "string"},
        theme: {type: "string"},
        inspiration:{type:"string"},
        groupName: {type: "string"},
        groupMembers: {type: "string"},
        highlights: {type: "string"},
        poem: {type: "string"},
        feedback: {type: "string"}
    },
    required: ["agent","theme","inspiration","groupName","groupMembers","highlights","poem","feedback"],
    additionalProperties: true
  }
};
  export{schemaForm};