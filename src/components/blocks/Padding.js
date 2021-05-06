//余白
export function Padding(props) {
    return (
        <div>
            <input type="range" value={props.padding} min="0" max="100" onChange={props.doAction} />
            <div>{props.padding}</div>
        </div>
    )
}

