const Input = ({ label, error, ...rest }) => {
   return (
      <div className="col my-1">
         <label htmlFor={rest.name}>
            {label}
            {rest.required && <span className="text-danger">*</span>}
         </label>
         <input
            {...rest}
            id={rest.name}
            className={["form-control", error && "is-invalid"].join(" ")}
         />
         <span className="invalid-feedback">{error}</span>
      </div>
   );
};

export default Input;
