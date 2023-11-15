import Joi from "joi";

export function validateFormikUsingJoi(schemaObject) {
   return function validate(values) {
      const schema = Joi.object(schemaObject);

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
         return null;
      }

      const errors = {};
      for (const detail of error.details) {
         let key;
         if (detail.path.length > 1) {
            key = detail.path[1];
         } else {
            key = detail.path[0];
         }

         errors[key] = detail.message;
      }

      return errors;
   };
}
