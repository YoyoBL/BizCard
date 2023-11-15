import { useState } from "react";

export const useForm = ({ initialValue = {}, onSubmit = () => {} }) => {
   const [inputs, setInputs] = useState(initialValue);
   const handleChange = (e) => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
   };

   const [errors, setErrors] = useState(initialValue);

   const handleSubmit = (e) => {
      e.preventDefault();

      onSubmit(inputs);
   };

   const handleBlur = (e) => {};

   return {
      inputs,
      handleChange,
      handleSubmit,
   };
};
