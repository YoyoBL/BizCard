import { useAlert } from "../../contexts/alert.context";
import { useAuth } from "../../contexts/auth.context";

const TableRow = ({
   user: { name, email, phone, address, createdAt, isBusiness, _id } = {},
   index = 1,
}) => {
   const { setModalContent } = useAlert();
   const { patchUserStatus, deleteUser } = useAuth();

   if (!name) return;

   const joinedAt = new Date(createdAt);

   return (
      <tr>
         <th scope="row">{index}</th>
         <td>
            {name.first} {name?.middle} {name.last}
         </td>
         <td>{email}</td>
         <td>{phone}</td>
         <td>
            {[
               address.street,
               address.houseNumber,
               address.city,
               address?.zip,
               address?.state,
            ]
               .filter(
                  (address) => Boolean(address) && address !== "not defined"
               )
               .join(" ")}
         </td>
         <td>{`${joinedAt.getDate()}/${joinedAt.getMonth()}/${joinedAt.getFullYear()}`}</td>

         <td>{isBusiness ? "Business" : "Standard"}</td>

         <td className="hstack gap-2">
            {/* edit */}

            <button
               onClick={() =>
                  setModalContent({
                     title: "Warning",
                     message: "You are about to change this user status.",
                     btnText: "Change status",
                     btnColor: "warning",
                     fnToDo: () => patchUserStatus(_id),
                  })
               }
               className="btn btn-sm btn-outline-warning"
               data-bs-toggle="modal"
               data-bs-target="#exampleModal"
            >
               <i className="bi bi-pencil-square"></i>
            </button>
            {/* delete */}
            <button
               onClick={() =>
                  setModalContent({
                     title: "Warning",
                     message:
                        "You are about to delete this user, this is irreversible.",
                     btnText: "Delete user",
                     btnColor: "danger",
                     fnToDo: () => deleteUser(_id),
                  })
               }
               className="btn btn-sm btn-outline-danger"
               data-bs-toggle="modal"
               data-bs-target="#exampleModal"
            >
               <i className="bi bi-trash3"></i>
            </button>
         </td>
      </tr>
   );
};

export default TableRow;
