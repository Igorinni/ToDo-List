
function Error({errorText, handleErrorText }) {

    setTimeout( () => handleErrorText(''), 3000);

    return (
        <div className="errorAdd">
            <p>{errorText}</p>
        </div>
    )
}

export default Error;