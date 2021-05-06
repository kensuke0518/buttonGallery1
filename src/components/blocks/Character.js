//文言
export function Character(props) {
    return (
        <div>
            <input type="text" value={props.character} onChange={props.doAction} />
        </div>
    )
}
