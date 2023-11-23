class ValidateSchemaError extends Error{
    constructor(message,errors) {
        super(message); // (1)
        this.errors = errors; // (2)
      }
};
export{ValidateSchemaError}