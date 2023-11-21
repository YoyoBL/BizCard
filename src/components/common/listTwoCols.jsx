const ListTwoCols = ({ title, content }) => {
   if (content === "") return;
   return (
      <ul className="list-group list-group-horizontal pb-3">
         <li className="list-group-item">
            <b>{title}:</b>
         </li>
         <li className="list-group-item flex-fill">{content}</li>
      </ul>
   );
};

export default ListTwoCols;
