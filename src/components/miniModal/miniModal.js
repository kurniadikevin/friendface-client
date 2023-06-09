import './miniModal.css'

const MiniModal=(props)=>{
    return(
        <div className="mini-modal">
            <div className="mini-modal-r1">Are you sure you want to {props.text} ?</div>
            <div className="mini-modal-r2">
                <button onClick={props.yes}>Yes</button>
                <button onClick={props.no}>No</button>
            </div>
        </div>
    )
}

export default MiniModal;