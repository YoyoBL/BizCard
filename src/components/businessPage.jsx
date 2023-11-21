import { useParams } from "react-router-dom";
import { useCards } from "../contexts/cards.context";
import { useEffect, useState } from "react";
import cardsService from "../services/cardsService";
import PageHeader from "./common/pageHeader";
import ListTwoCols from "./common/listTwoCols";

const BusinessPage = () => {
   const { id } = useParams();
   const [card, setCard] = useState(null);

   useEffect(() => {
      async function getCardsById() {
         const response = await cardsService.getCard(id);
         setCard(response.data);
      }
      getCardsById();
   }, []);

   if (!card) return;

   return (
      <>
         <PageHeader title={card.title} description={card.subtitle} />
         <div className="row mt-3">
            <div className="col-auto col-md-6 hstack">
               <img
                  src={card.image.url}
                  alt={card.image.alt}
                  className="img-fluid rounded-5 p-2 mx-auto"
               />
            </div>
            <div className="col p-3 d-flex flex-column justify-content-center">
               <ListTwoCols title="Description" content={card.description} />
               <ListTwoCols title="Phone" content={card.phone} />
               <ListTwoCols title="Email" content={card.email} />
               <ListTwoCols title="Web" content={card.web} />
               <ListTwoCols
                  title="Address"
                  content={[
                     card.address.street,
                     card.address.houseNumber,
                     card.address.city,
                     card.address.zip,
                  ]
                     .filter((e) => Boolean(e))
                     .join(" ")}
               />
               <ListTwoCols title="Likes" content={card.likes.length} />
            </div>
         </div>
      </>
   );
};

export default BusinessPage;
