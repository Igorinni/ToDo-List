
function Error({errorText}) {
    return (
        <div className="errorAdd">
            <button className="errorBbutton">X</button>
            <p>{errorText}</p>
        </div>
    )
}

export default Error;