import { validateFormikUsingJoi } from "../utils/validateFormikUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth.context";
import { useAlert } from "../contexts/alert.context";
import { filterEmptyKeys } from "../utils/filterEmptyKeys";

const UserForm = () => {
   const [serverError, setServerError] = useState("");
   const navigate = useNavigate();
   const { user, userDetails, updateUser, patchUserStatus, signUp, logout } =
      useAuth();
   const { activateAlert } = useAlert();

   const [isBusiness, setIsBusiness] = useState(false);
   const [statusChangeWarning, setStatusChangeWarning] = useState(false);

   useEffect(() => {
      if (!userDetails) return;

      form.setValues({
         name: {
            first: userDetails.name.first,
            middle: userDetails.name.middle,
            last: userDetails.name.last,
         },
         phone: userDetails.phone,
         image: {
            url: userDetails.image.url,
            alt: userDetails.image.alt,
         },
         address: {
            state:
               userDetails.address.state === "not defined"
                  ? ""
                  : userDetails.address.state,
            country: userDetails.address.country,
            city: userDetails.address.city,
            street: userDetails.address.street,
            houseNumber: String(userDetails.address.houseNumber),
            zip: userDetails.address.zip ? String(userDetails.address.zip) : "",
         },
      });
      setIsBusiness(userDetails.isBusiness);
   }, [userDetails]);

   const form = useFormik({
      ...(!user && { validateOnMount: true }),
      initialValues: {
         name: {
            first: "",
            middle: "",
            last: "",
         },
         phone: "",
         ...(!user && { email: "", password: "" }),

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
      },
      validate: validateFormikUsingJoi({
         name: {
            first: Joi.string().min(2).max(256).required().label("First"),
            middle: Joi.string()
               .min(2)
               .max(256)
               .required()
               .label("Middle")
               .allow(""),
            last: Joi.string().min(2).max(256).required().label("Last"),
         },
         phone: Joi.string()
            .min(9)
            .max(11)
            .regex(/^0[2-9]\d{7,8}$/)
            .message('"phone" must be a standard Israeli phone number')
            .required(),
         ...(!user && {
            email: Joi.string()
               .min(5)
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
         }),

         image: {
            url: Joi.string().uri().required().allow("").label("Image url"),
            alt: Joi.string().max(40).allow("").label("Image alt"),
         },
         address: {
            state: Joi.string()
               .min(2)
               .max(256)
               .label("State")
               .required()
               .allow(""),
            country: Joi.string().min(2).max(256).required().label("Country"),
            city: Joi.string().min(2).max(256).required().label("City"),
            street: Joi.string().min(2).max(256).required().label("Street"),
            houseNumber: Joi.number()
               .min(1)
               .max(9999999999)
               .required()
               .label("House number"),
            zip: Joi.number()
               .min(0)
               .max(9999999999)
               .required()
               .label("Zip")
               .allow(""),
         },
         ...(!user && { isBusiness: "" }),
      }),
      async onSubmit(values) {
         const filteredValues = filterEmptyKeys(values);

         try {
            if (user) {
               await updateUser(user._id, filteredValues);

               if (userDetails.isBusiness !== isBusiness) {
                  await patchUserStatus(user._id);
                  logout();
                  navigate("/sign-in");
                  activateAlert("Changes saved");
                  return;
               }
            } else {
               const valuesWithBiz = { ...filteredValues, isBusiness };
               console.log(valuesWithBiz);
               await signUp(valuesWithBiz);
            }
            activateAlert(
               !user ? "User Created! Please log in" : "Changes saved"
            );
            navigate(!user ? "/sign-in" : "/my-profile");
         } catch (err) {
            if (err.response?.status === 400) {
               setServerError(err.response.data);
            }
         }
      },
   });

   return (
      <>
         <PageHeader
            title={!user ? "Sign up" : "Edit profile"}
            description={!user && "Create an account and join our community! "}
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
               {!user && (
                  <>
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
                  </>
               )}
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
                  error={form.touched.address?.zip && form.errors.zip}
               />
            </div>
            <div className="form-check my-5">
               <input
                  id="isBusiness"
                  className="form-check-input"
                  type="checkbox"
                  onChange={() => {
                     setIsBusiness((isBusiness) => !isBusiness);
                     if (user) {
                        setStatusChangeWarning(
                           (statusChangeWarning) => !statusChangeWarning
                        );
                     }
                  }}
                  checked={isBusiness}
               />
               <label className="form-check-label" htmlFor="isBusiness">
                  {!user ? "Sign up as business " : "Business account"}
               </label>

               {statusChangeWarning && (
                  <div className="alert alert-warning">
                     <i className="bi bi-info-circle"></i>If you apply this
                     modification, you will be required to sign in again for the
                     changes to take effect.
                  </div>
               )}
            </div>
            <div className="row">
               <div className="col-12 text-center my-2">
                  <button
                     type="submit"
                     disabled={!form.isValid}
                     className="btn btn-primary w-100"
                  >
                     {!user ? "Sign up" : "Save changes"}
                  </button>
               </div>
               <div className="col-6">
                  <button
                     type="reset"
                     onClick={() => form.resetForm()}
                     className="btn btn-warning w-100"
                  >
                     Reset
                  </button>
               </div>
               <div className="col-6">
                  <button
                     onClick={() => navigate(!user ? "/" : "/my-profile")}
                     className="btn btn-secondary w-100"
                  >
                     Cancel
                  </button>
               </div>
            </div>
         </form>
      </>
   );
};

export default UserForm;
