const ListTwoCols = ({ title, content }) => {
   // if (title === "Account plan") console.log(content);
   return (
      <ul className="list-group list-group-horizontal pb-3">
         <li className="list-group-item bg-body-secondary">
            <b>{title}:</b>
         </li>
         <li className="list-group-item flex-fill">{content}</li>
      </ul>
   );
};

export default ListTwoCols;
