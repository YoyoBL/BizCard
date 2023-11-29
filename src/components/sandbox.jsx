import { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import TableRow from "./common/tableRow";
import usersService from "../services/usersServices";
import ModalMessage from "./common/modalMessage";

const Sandbox = () => {
   const [users, setUsers] = useState([]);
   const [serverError, setServerError] = useState("");

   async function getUsers() {
      try {
         const response = await usersService.getAllUsers();
         setUsers(response.data);
      } catch (err) {
         if (err.response?.status === 400) {
            setServerError(err);
         }
      }
   }

   useEffect(() => {
      getUsers();
   }, []);

   if (!users) return;

   return (
      <>
         <ModalMessage onConfirm={() => getUsers()} />

         {serverError && (
            <div className="alert alert-danger">{serverError}</div>
         )}

         <PageHeader
            title="SANDBOX"
            description="Users CRM system - ADMIN only"
         />
         <div className="table-responsive mt-3">
            <table className="table table-sm">
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Full name</th>
                     <th scope="col">Mail</th>
                     <th scope="col">Phone</th>
                     <th scope="col">Address</th>
                     <th scope="col">Joined at</th>
                     <th scope="col">Status</th>
                     <th scope="col">CRM</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user, index) => (
                     <TableRow key={index} user={user} index={index} />
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default Sandbox;
