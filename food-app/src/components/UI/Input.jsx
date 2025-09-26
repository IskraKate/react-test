const Input = ({ label, id, type = "text", ...props }) => {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required type={type} {...props}></input>
    </div>
  )
}

export default Input
