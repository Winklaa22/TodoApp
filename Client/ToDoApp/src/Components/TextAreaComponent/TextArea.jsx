import "./TextArea.css";

const TextAreaField = ({ htmlFor, headerText = '', onChange, value, placeholder = '', hasMaxLength = false, maxLength, hasMaxLengthCounter = false }) => {
    return (
        <label htmlFor={htmlFor}>
            {headerText && <h2>{headerText}</h2>}
            <textarea
                value={value}
                onChange={e => onChange(e)}
                maxLength={hasMaxLength ? maxLength : undefined}
                placeholder={placeholder}
                id="item"
            />
            {hasMaxLengthCounter && (
                <div style={{ fontSize: '0.8rem', color: 'gray' }}>
                    {value.length}/{maxLength} characters
                </div>
            )}
        </label>
    );
};

export default TextAreaField;
