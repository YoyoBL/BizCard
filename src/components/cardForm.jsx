import { validateFormikUsingJoi } from "../utils/validateFormikUsingJoi";
import Input from "./common/input";
import PageHeader from "./common/pageHeader";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useFormik } from "formik";
import Joi from "joi";
import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";
import { useCards } from "../contexts/cards.context";
import { useAlert } from "../contexts/alert.context";
import Card from "./card";
import { filterEmptyKeys } from "../utils/filterEmptyKeys";

const CardForm = ({ forEditing = false }) => {
   const { id } = useParams();
   const [serverError, setServerError] = useState("");
   const navigate = useNavigate();
   const { createCard, editCard } = useCards();
   const { activateAlert } = useAlert();

   //track if moved from edit to create page
   const location = useLocation();

   useEffect(() => {
      if (!forEditing) return form.resetForm();
      async function setFieldsByCard() {
         try {
            const { data } = await cardsService.getCard(id);
            form.setValues({
               title: data.title,
               subtitle: data.subtitle,
               description: data.description,
               phone: data.phone,
               email: data.email,
               web: data.web || "",
               image: {
                  url: data.image?.url,
                  alt: data.image?.alt,
               },
               address: {
                  state: data.address?.state,
                  country: data.address?.country,
                  city: data.address?.city,
                  street: data.address?.street,
                  houseNumber: data.address?.houseNumber,
                  zip: data.address?.zip,
               },
            });
         } catch (err) {
            setServerError(err);
         }
      }
      setFieldsByCard();
   }, [location]);

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
         title: Joi.string().min(2).max(256).required(),
         subtitle: Joi.string().min(2).max(256).required(),
         description: Joi.string().min(2).max(1024).required(),
         phone: Joi.string()
            .min(9)
            .max(11)
            .required()
            .regex(/^0[2-9]\d{7,8}$/)
            .message('"Phone" must be a standard Israeli phone number'),
         email: Joi.string()
            .min(5)
            .required()
            .email({ tlds: { allow: false } }),
         web: Joi.string().min(14).uri().allow("").required().label("Website"),
         image: {
            url: Joi.string()
               .uri()
               .min(14)
               .uri()
               .allow("")
               .required()
               .label("Image url"),
            alt: Joi.string()
               .min(2)
               .max(256)
               .allow("")
               .required()
               .label("Image alt"),
         },
         address: {
            state: Joi.string().label("State").allow(""),
            country: Joi.string().required().label("Country"),
            city: Joi.string().required().label("City"),
            street: Joi.string().required().label("Street"),
            houseNumber: Joi.number().min(1).required().label("House number"),
            zip: Joi.number().allow("").label("Zip"),
         },
      }),
      async onSubmit(values) {
         const filteredValues = filterEmptyKeys(values);

         try {
            if (forEditing) {
               await editCard(id, filteredValues);
               activateAlert("Card edited!");
            } else {
               await createCard(filteredValues);
               activateAlert("Card created!");
            }
            navigate("/my-cards");
         } catch (err) {
            if (err.response?.status === 400) {
               setServerError(err.response.data);
            }
         }
      },
   });
   return (
      <div className="d-flex flex-column">
         <PageHeader title={forEditing ? "Edit Card" : "Create a Card"} />

         <div className="row">
            <div className="order-1 order-md-0 col-12 vstack col-md-6 rounded-5  d-flex justify-content-center align-items-center py-5 ">
               <h3 className="display-5">Card preview</h3>
               <Card card={form.values} />
            </div>

            <form
               className="order-0 order-md-1 col-12 col-md-6"
               onSubmit={form.handleSubmit}
            >
               {serverError && (
                  <div className="alert alert-danger">{serverError}</div>
               )}
               <div className="row row-cols-2">
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
               </div>
               <div className="row row-cols-2 my-5">
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
                     error={
                        form.touched.address?.country && form.errors.country
                     }
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
               <div className="row text-center my-4 g-3">
                  <div className="col-12">
                     <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={!form.isValid}
                     >
                        {forEditing ? "Save changes" : "Create"}
                     </button>
                  </div>
                  <div className="col-6">
                     <button
                        type="reset"
                        onClick={() => form.resetForm()}
                        className="btn btn-warning w-100"
                     >
                        Reset fields
                     </button>
                  </div>
                  <div className="col-6">
                     <button
                        type="button"
                        onClick={() => navigate("/my-cards")}
                        className="btn btn-secondary w-100"
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default CardForm;
