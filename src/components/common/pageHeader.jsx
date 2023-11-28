const PageHeader = ({ title, description }) => {
   return (
      <>
         <header
            className="row text-center flex-nowrap justify-content-center"
            style={{ whiteSpace: "nowrap" }}
         >
            <div className="col-5 px-0 vstack">
               <hr className="border border-primary border-1 opacity-75 my-auto" />
            </div>
            <div className="col-auto">
               <h1>{title}</h1>
            </div>
            <div className="col-5 px-0 vstack">
               <hr className="border border-primary border-1 opacity-75 my-auto" />
            </div>
         </header>
         <div className="row">
            <div className="col-12 text-center">
               {description && <div className="col-12">{description}</div>}
            </div>
         </div>
      </>
   );
};

export default PageHeader;
