//ボーダー
export function Border(props) {
    return (
        <div>
            <div>
                <input type="checkbox" name="" value="top" id="borderTop" onClick={props.doAction} />上
                <input type="checkbox" name="" value="bottom" id="borderBottom" onClick={props.doAction} />下
                <input type="checkbox" name="" value="left" id="borderLeft" defaultChecked onClick={props.doAction} />左
                <input type="checkbox" name="" value="right" id="borderRight" onClick={props.doAction} />右
            </div>
            <input type="range" value={props.border.size} min="0" max="10" onChange={props.doSizeAction} />
            <div>{props.border.size}</div>
            <input type="color" value={props.border.color} onChange={props.doColorAction} />
            <div>{props.border.color}</div>
        </div>
    )
}

