import { validateFormikUsingJoi } from "../utils/validateFormikUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";

import { Navigate, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import cardsService from "../services/cardsService";

const CardsCreate = () => {
   const [serverError, setServerError] = useState("");
   const navigate = useNavigate();

   const form = useFormik({
      validateOnMount: true,
      initialValues: {
         title: "",
         subtitle: "",
         description: "",
         phone: "",
         email: "",
         web: "",
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
         title: Joi.string().min(2).max(50).required(),
         subtitle: Joi.string().min(2).max(50).required(),
         description: Joi.string().min(2).max(70).required(),
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
         web: Joi.string(),
         image: {
            url: Joi.string(),
            alt: Joi.string().max(40),
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
            zip: Joi.string().min(1).max(10).label("Zip"),
         },
      }),
      async onSubmit(values) {
         try {
            const { bizImage, ...body } = values;

            if (bizImage) {
               body.bizImage = bizImage;
            }

            await cardsService.createCard(body);
            navigate("/my-cards");
         } catch (err) {
            if (err.response?.status === 400) {
               setServerError(err.response.data);
            }
         }
      },
   });

   return (
      <>
         <PageHeader title="Create a Card" />

         <form onSubmit={form.handleSubmit} className="row row-cols-2">
            {serverError && (
               <div className="alert alert-danger">{serverError}</div>
            )}
            <Input
               {...form.getFieldProps("title")}
               type="text"
               label="Title"
               required
               error={form.touched.title && form.errors.title}
            />
            <Input
               {...form.getFieldProps("subtitle")}
               type="text"
               label="Subtitle"
               required
               error={form.touched.subtitle && form.errors.subtitle}
            />
            <Input
               {...form.getFieldProps("description")}
               type="text"
               label="Description"
               required
               error={form.touched.description && form.errors.description}
            />
            <Input
               {...form.getFieldProps("phone")}
               type="text"
               label="Phone"
               required
               error={form.touched.phone && form.errors.phone}
            />
            <Input
               {...form.getFieldProps("email")}
               type="text"
               label="Email"
               required
               error={form.touched.email && form.errors.email}
            />
            <Input
               {...form.getFieldProps("web")}
               type="text"
               label="Website"
               error={form.touched.web && form.errors.web}
            />{" "}
            <Input
               {...form.getFieldProps("url")}
               type="text"
               label="Picture Url"
               error={form.touched.url && form.errors.url}
            />{" "}
            <Input
               {...form.getFieldProps("alt")}
               type="text"
               label="Picture Alt"
               error={form.touched.alt && form.errors.alt}
            />{" "}
            <Input
               {...form.getFieldProps("state")}
               type="text"
               label="State"
               error={form.touched.state && form.errors.state}
            />{" "}
            <Input
               {...form.getFieldProps("country")}
               type="text"
               label="Country"
               required
               error={form.touched.country && form.errors.country}
            />{" "}
            <Input
               {...form.getFieldProps("city")}
               type="text"
               label="City"
               required
               error={form.touched.city && form.errors.city}
            />{" "}
            <Input
               {...form.getFieldProps("street")}
               type="text"
               label="Street"
               required
               error={form.touched.street && form.errors.street}
            />{" "}
            <Input
               {...form.getFieldProps("houseNumber")}
               type="text"
               label="HouseNumber"
               required
               error={form.touched.houseNumber && form.errors.houseNumber}
            />{" "}
            <Input
               {...form.getFieldProps("zip")}
               type="text"
               label="Zip"
               error={form.touched.zip && form.errors.zip}
            />
            <div className="col-12 hstack my-4">
               <button
                  type="submit"
                  className="btn btn-primary mx-auto "
                  disabled={!form.isValid}
               >
                  Create
               </button>
            </div>
         </form>
      </>
   );
};

export default CardsCreate;
