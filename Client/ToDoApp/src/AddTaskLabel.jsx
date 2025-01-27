const AddTaskLabel = ({
    labelValue = '', 
    labelClassname = 'default-label',
    isRequired = false,
    maxTextLength = 50,
    onChangeFunc,
    onInvalidFunc = () => {}
}) => {
    return (
        <>
            <label htmlFor={labelClassname}>
                <h2>Name</h2>
                <input
                    onChange={onChangeFunc} 
                    type="text" 
                    id="item"
                    required={isRequired}
                    maxLength={maxTextLength}
                    onInvalid={onInvalidFunc}
                /> 
            </label>
            <div style={{ fontSize: '0.8rem', color: 'gray' }}>
                {labelValue.length}/{maxTextLength} characters
            </div>
        </>
    );
};

export default AddTaskLabel;