import PageHeader from "./common/pageHeader";
import Input from "./common/input";
import { useFormik } from "formik";
import Joi from "joi";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/auth.context";
import { useAlert } from "../contexts/alert.context";

const SignIn = ({ redirect }) => {
   const [serverError, setServerError] = useState("");
   const navigate = useNavigate();
   const { user, login } = useAuth();
   const { activateAlert } = useAlert();

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
            password: Joi.string()
               .min(7)
               .max(20)
               .regex(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-])(?=.{9,})/
               )
               .message(
                  "'Password' must be at least 9 characters long and contain an uppercase letter, a lower case letter, a number and one of the following characters !@#$%^&*- "
               )
               .required(),
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
               activateAlert("Logged In successfully");
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
         <form onSubmit={form.handleSubmit} className="col-md-3 mx-auto ">
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
               className="btn btn-primary mt-2 w-100"
            >
               Log-in
            </button>
         </form>
      </>
   );
};

export default SignIn;
