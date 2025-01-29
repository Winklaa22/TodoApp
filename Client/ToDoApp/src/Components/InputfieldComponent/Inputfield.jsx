import "./InputField.css"

const InputField = ({htmlFor, headerText= '', onChange, value, placeholder = '', hasMaxLength = false, maxLength, hasMaxLengthCounter = false}) =>{
    return (
    <label htmlFor={htmlFor}>
        {headerText && <h2>{headerText}</h2>}
        <input
            value={value}
            onChange={e => onChange(e)} 
            maxLength={maxLength}
            placeholder={placeholder}
            type="text" 
            id="item"
        />
        { hasMaxLengthCounter &&
        <div style={{ fontSize: '0.8rem', color: 'gray' }}>
            {value.length}/{maxLength} characters
        </div>
        }
    </label>
    );
}

export default InputField;