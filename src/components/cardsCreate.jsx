import { validateFormikUsingJoi } from "../utils/validateFormikUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import Joi from "joi";
import { useState } from "react";
import cardsService from "../services/cardsService";
import { useCards } from "../contexts/cards.context";

const CardsCreate = () => {
   const [serverError, setServerError] = useState("");
   const navigate = useNavigate();
   const { createCard } = useCards();

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
         description: Joi.string().min(2).max(200).required(),
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
         web: Joi.string().allow("").label("Website"),
         image: {
            url: Joi.string().allow("").label("Image url"),
            alt: Joi.string().max(40).allow("").label("Image alt"),
         },
         address: {
            state: Joi.string().min(2).max(50).label("State").allow(""),
            country: Joi.string().min(2).max(50).required().label("Country"),
            city: Joi.string().min(2).max(50).required().label("City"),
            street: Joi.string().min(2).max(50).required().label("Street"),
            houseNumber: Joi.number()
               .max(99999)
               .required()
               .label("House number"),
            zip: Joi.number().max(9999999999).required().label("Zip"),
         },
      }),
      async onSubmit(values) {
         try {
            await createCard(values);
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

         {serverError && (
            <div className="alert alert-danger">{serverError}</div>
         )}
         <form onSubmit={form.handleSubmit} className="row row-cols-2">
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
            />
            <Input
               {...form.getFieldProps("image.url")}
               type="text"
               label="Picture Url"
               error={form.touched.image?.url && form.errors.url}
            />
            <Input
               {...form.getFieldProps("image.alt")}
               type="text"
               label="Picture Alt"
               error={form.touched.image?.alt && form.errors.alt}
            />
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
               label="HouseNumber"
               required
               error={
                  form.touched.address?.houseNumber && form.errors.houseNumber
               }
            />
            <Input
               {...form.getFieldProps("address.zip")}
               type="text"
               label="Zip"
               required
               error={form.touched.address?.zip && form.errors.zip}
            />
            <div className="col-12 text-center my-4">
               <button
                  type="submit"
                  className="btn btn-primary  mx-3"
                  disabled={!form.isValid}
               >
                  Create
               </button>
               <button
                  type="reset"
                  onClick={() => form.resetForm()}
                  className="btn btn-warning  mx-3"
               >
                  Reset fields
               </button>
            </div>
         </form>
      </>
   );
};

export default CardsCreate;
