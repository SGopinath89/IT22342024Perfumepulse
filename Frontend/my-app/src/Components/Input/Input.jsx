//There is no any affect from this Code.

const Input = ({ handleChange, value, title, name}) => {
    return (
        <label className="sidebar-label-container">
            <input onChange={handleChange} type="checkbox" value={value} name={name} />
            <span className="checkmark"></span>
            {title}
        </label>    
     );
};

export default Input;