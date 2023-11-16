import { validateFormikUsingJoi } from "../utils/validateFormikUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";

import { Navigate, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { useAuth } from "../contexts/auth.context";

const SignUp = ({ redirect }) => {
   const [serverError, setServerError] = useState("");
   const navigate = useNavigate();

   const { user, signUp } = useAuth();

   const form = useFormik({
      validateOnMount: true,
      initialValues: {
         name: {
            first: "",
            middle: "",
            last: "",
         },
         phone: "",
         email: "",
         password: "",
         image: {
            url: "",
            alt: "",
         },
         address: {
            state: "",
            country: "",
            city: "",
            street: "",
            houseNumber: "",
            zip: "",
         },
         isBusiness: false,
      },
      validate: validateFormikUsingJoi({
         name: {
            first: Joi.string().min(2).max(50).required().label("First"),
            middle: Joi.string().min(2).max(50).label("Middle").allow(""),
            last: Joi.string().min(2).max(50).required().label("Last"),
         },
         phone: Joi.string()
            .min(9)
            .max(10)
            .required()
            .regex(/^0[2-9]\d{7,8}$/),
         email: Joi.string()
            .min(2)
            .max(255)
            .required()
            .email({ tlds: { allow: false } }),
         password: Joi.string()
            .min(9)
            .required()
            .regex(
               /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-])(?=.{9,})/
            )
            .message(
               "'Password' must be at least 9 characters long and contain an uppercase letter, a lower case letter, a number and one of the following characters !@#$%^&*- "
            ),
         image: {
            url: Joi.string().allow("").label("Image url"),
            alt: Joi.string().max(40).allow("").label("Image alt"),
         },
         address: {
            state: Joi.string().min(2).max(50).label("State").allow(""),
            country: Joi.string().min(2).max(50).required().label("Country"),
            city: Joi.string().min(2).max(50).required().label("City"),
            street: Joi.string().min(2).max(50).required().label("Street"),
            houseNumber: Joi.string()
               .min(1)
               .max(10)
               .required()
               .label("House number"),
            zip: Joi.string().min(1).max(10).required().label("Zip"),
         },
         isBusiness: Joi.boolean(),
      }),
      async onSubmit(values) {
         try {
            await signUp({ ...values });
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

   if (user) {
      return <Navigate to={"/"} />;
   }

   return (
      <>
         <PageHeader
            title="Sign Up"
            description="Create an account and join our community! "
         />

         <form onSubmit={form.handleSubmit}>
            {serverError && (
               <div className="alert alert-danger">{serverError}</div>
            )}
            <div className="row row-cols-2">
               <Input
                  {...form.getFieldProps("name.first")}
                  type="text"
                  label="First name"
                  required
                  error={form.touched.name?.first && form.errors.first}
               />
               <Input
                  {...form.getFieldProps("name.middle")}
                  type="text"
                  label="middle name"
                  error={form.touched.name?.middle && form.errors.middle}
               />{" "}
               <Input
                  {...form.getFieldProps("name.last")}
                  type="text"
                  label="Last name"
                  required
                  error={form.touched.name?.last && form.errors.last}
               />
               <Input
                  {...form.getFieldProps("phone")}
                  type="string"
                  label="Phone"
                  required
                  error={form.touched.phone && form.errors.phone}
               />
               <Input
                  {...form.getFieldProps("email")}
                  type="email"
                  label="Email"
                  required
                  error={form.touched.email && form.errors.email}
               />
               <Input
                  {...form.getFieldProps("password")}
                  type="password"
                  label="Password"
                  required
                  error={form.touched.password && form.errors.password}
               />
            </div>

            <div className="row row-cols-2 my-5">
               <Input
                  {...form.getFieldProps("image.url")}
                  type="text"
                  label="Image url"
               />
               <Input
                  {...form.getFieldProps("image.alt")}
                  type="text"
                  label="Image alt"
               />
            </div>

            <div className="row row-cols-2">
               <Input
                  {...form.getFieldProps("address.state")}
                  type="text"
                  label="State"
                  error={form.touched.address?.state && form.errors.state}
               />
               <Input
                  {...form.getFieldProps("address.country")}
                  type="text"
                  label="Country"
                  required
                  error={form.touched.address?.country && form.errors.country}
               />
               <Input
                  {...form.getFieldProps("address.city")}
                  type="text"
                  label="City"
                  required
                  error={form.touched.address?.city && form.errors.city}
               />
               <Input
                  {...form.getFieldProps("address.street")}
                  type="text"
                  label="Street"
                  required
                  error={form.touched.address?.street && form.errors.street}
               />
               <Input
                  {...form.getFieldProps("address.houseNumber")}
                  type="text"
                  label="House number"
                  required
                  error={
                     form.touched.address?.houseNumber &&
                     form.errors.houseNumber
                  }
               />
               <Input
                  {...form.getFieldProps("address.zip")}
                  type="text"
                  label="Zip"
                  required
                  error={form.touched.address?.zip && form.errors.zip}
               />
            </div>

            <div className="form-check my-5">
               <input
                  {...form.getFieldProps("isBusiness")}
                  className="form-check-input"
                  type="checkbox"
               />
               <label className="form-check-label" htmlFor="flexCheckDefault">
                  Sign up as business
               </label>
            </div>

            <div className="text-center my-2">
               <button
                  type="submit"
                  disabled={!form.isValid}
                  className="btn btn-primary"
               >
                  Sign up
               </button>
            </div>
         </form>
      </>
   );
};

export default SignUp;
