import { validateFormikUsingJoi } from "../utils/validateFormikUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import { useAlert } from "../contexts/alert.context";

import { useForm } from "@formspree/react";

const Contact = () => {
   const [serverError, setServerError] = useState("");
   const [state, handleSubmit] = useForm("xbjvvklb");
   const navigate = useNavigate();
   const { activateAlert } = useAlert();

   if (state.succeeded) {
      activateAlert(
         "We've received your message. Thank you for contacting us."
      );
      navigate("/");
   }

   if (state.errors) {
      setServerError(state.errors.code);
   }

   const form = useFormik({
      validateOnMount: true,
      initialValues: {
         fullName: "",
         email: "",
         subject: "",
         message: "",
      },

      validate: validateFormikUsingJoi({
         fullName: Joi.string().min(2).max(256).required().label("Full Name"),
         email: Joi.string()
            .min(5)
            .required()
            .email({ tlds: { allow: false } })
            .label("Mail"),
         subject: Joi.string().min(2).max(256).required().label("Subject"),
         message: Joi.string().min(2).max(1024).required().label("Message"),
      }),
   });

   return (
      <>
         <form onSubmit={handleSubmit}>
            {serverError && (
               <div className="alert alert-danger">{serverError}</div>
            )}
            <PageHeader
               title="Contact us"
               description="Feel free to contact us on any matter"
            />
            <div className="row row-cols-1 justify-content-center mt-4">
               <div className="col-md-6">
                  <Input
                     {...form.getFieldProps("fullName")}
                     type="text"
                     label="Full name"
                     required
                     error={form.touched.fullName && form.errors.fullName}
                  />
                  <Input
                     {...form.getFieldProps("email")}
                     type="text"
                     label="Email"
                     required
                     error={form.touched.email && form.errors.email}
                  />
                  <Input
                     {...form.getFieldProps("subject")}
                     type="text"
                     label="Subject"
                     required
                     error={form.touched.subject && form.errors.subject}
                  />
                  <div className="col">
                     <label htmlFor="message">
                        Message <span className="text-danger">*</span>
                     </label>
                     <textarea
                        {...form.getFieldProps("message")}
                        id="message"
                        className={[
                           "form-control",
                           form.touched.message &&
                              form.errors.message &&
                              "is-invalid",
                        ].join(" ")}
                        rows="4"
                        cols="50"
                        required
                     ></textarea>
                     <div
                        className="text-danger"
                        style={{ fontSize: "0.9rem" }}
                     >
                        {form.touched.message && form.errors.message}
                     </div>
                  </div>
                  <div className="text-center my-2">
                     <button
                        type="submit"
                        disabled={!form.isValid}
                        className="btn btn-primary mt-2 w-100"
                     >
                        Send
                     </button>
                  </div>
               </div>
            </div>
         </form>
      </>
   );
};

export default Contact;
