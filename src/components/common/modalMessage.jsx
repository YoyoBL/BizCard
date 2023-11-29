import { useAlert } from "../../contexts/alert.context";

const ModalMessage = ({ onConfirm = () => {} }) => {
   const { activateAlert, modalContent } = useAlert();

   if (!modalContent) return;

   async function activateFn() {
      try {
         await modalContent.fnToDo();
         onConfirm();
         activateAlert("Changes saved");
      } catch (err) {
         if (err.response?.status === 400) {
            activateAlert(err);
         }
      }
   }

   return (
      <div
         className="modal fade"
         id="exampleModal"
         tabIndex="-1"
         aria-labelledby="exampleModalLabel"
         aria-hidden="true"
      >
         <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
               <div className={`modal-header bg-${modalContent.btnColor}`}>
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                     {modalContent.title}
                  </h1>
                  <button
                     type="button"
                     className="btn-close"
                     data-bs-dismiss="modal"
                     aria-label="Close"
                  ></button>
               </div>
               <div className="modal-body">
                  {modalContent.message} <br /> Are you sure you want to
                  proceed?
               </div>
               <div className="modal-footer justify-content-center">
                  <button
                     onClick={() => activateFn()}
                     type="button"
                     className={`btn btn-${modalContent.btnColor}`}
                     data-bs-dismiss="modal"
                  >
                     {modalContent.btnText}
                  </button>

                  <button
                     type="button"
                     className="btn btn-secondary"
                     data-bs-dismiss="modal"
                  >
                     Close
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ModalMessage;
