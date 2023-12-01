import { useAlert } from "../contexts/alert.context";

const AlertMessage = () => {
   const { alertMessage } = useAlert();

   return (
      <div
         id="alert-message"
         className="fade-in alert alert-success mt-3 position-absolute start-50 translate-middle "
      >
         {alertMessage}
      </div>
   );
};

export default AlertMessage;
