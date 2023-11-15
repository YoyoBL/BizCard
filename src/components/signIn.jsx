import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/auth.context";

const SignIn = ({ redirect }) => {
   const [serverError, setServerError] = useState("");
   const navigate = useNavigate();
   const { user, login } = useAuth();

   const form = useFormik({
      validateOnMount: true,
      initialValues: { email: "", password: "" },
      validate(values) {
         const schema = Joi.object({
            email: Joi.string()
               .min(2)
               .max(255)
               .required()
               .email({ tlds: { allow: false } }),
            password: Joi.string().min(6).max(1024).required(),
         });
         const { error } = schema.validate(values, { abortEarly: false });
         if (!error) {
            return null;
         }

         const errors = {};

         for (const detail of error.details) {
            const key = detail.path[0];
            errors[key] = detail.message;
         }

         return errors;
      },
      async onSubmit(values) {
         try {
            await login(values);

            if (redirect) {
               navigate(redirect);
            }
         } catch (err) {
            if (err.response?.status === 400) {
               setServerError(err.response.data);
            }
         }
      },
   });

   function getFieldProps(name) {
      return {
         ...form.getFieldProps(name),
         error: form.touched[name] && form.errors[name],
      };
   }

   if (user) {
      return <Navigate to={"/"} />;
   }

   return (
      <>
         <PageHeader title={"Sign In"} />
         <form onSubmit={form.handleSubmit}>
            {serverError && (
               <div className="alert alert-danger">{serverError}</div>
            )}

            <Input
               {...getFieldProps("email")}
               label={"Email"}
               type={"email"}
               required
            />
            <Input
               {...getFieldProps("password")}
               label={"Password"}
               type={"password"}
               required
            />
            <button
               type="submit"
               disabled={!form.isValid}
               className="btn btn-primary mt-2"
            >
               Log-in
            </button>
         </form>
      </>
   );
};

export default SignIn;
