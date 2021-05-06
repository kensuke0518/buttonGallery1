//背景色
export function BgColor(props) {
    return (
        <div>
            <div><input type="color" value={props.bgcolor} onChange={props.doAction} /></div>
            <div>{props.bgcolor}</div>
        </div>
    )
}
