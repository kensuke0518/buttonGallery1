import { useState, useEffect, useReducer } from 'react';
//文言
export function Character(props) {
    return (
        <div>
            <input type="text" value={props.character} onChange={props.doAction} />
        </div>
    )
}

//背景色
export function BgColor(props) {
    return (
        <div>
            <div><input type="color" value={props.bgcolor} onChange={props.doAction} /></div>
            <div>{props.bgcolor}</div>
        </div>
    )
}

//余白
export function Padding(props) {
    return (
        <div>
            <input type="range" value={props.padding} min="0" max="100" onChange={props.doAction} />
            <div>{props.padding}</div>
        </div>
    )
}

//ボーダー
export function Border(props) {
    //e.target.checked
    //e.target.value
    return (
        <div>
            <div>
                <input type="checkbox" name="" value="top" id="borderTop" onClick={props.doAction} />上
                <input type="checkbox" name="" value="bottom" id="borderBottom" onClick={props.doAction} />下
                <input type="checkbox" name="" value="left"id="borderLeft" defaultChecked onClick={props.doAction} />左
                <input type="checkbox" name="" value="right" id="borderRight" onClick={props.doAction} />右
            </div>
            <input type="range" value={props.border.size} min="0" max="10" onChange={props.doSizeAction} />
            <div>{props.border.size}</div>
            <input type="color" value={props.border.color} onChange={props.doColorAction} />
            <div>{props.border.color}</div>
        </div>
    )
}

//角丸
//https://coliss.com/articles/build-websites/operation/css/css-border-radius-can-do-that.html
export function BorderRadius(props) {
    const style = {
        background: '#24c7f0',
        padding: '2em'
    }
    const [state, setState] = useState({
        borderRadius: {
            horizonVertical: false,
            style: {
                a: {
                    check: true,
                    size: '50',
                    unit: 'px',
                },
                b: {
                    check: false,
                    size: '25',
                    unit: 'px',
                },
                c: {
                    check: false,
                    size: '25',
                    unit: 'px',
                },
                d: {
                    check: false,
                    size: '25',
                    unit: 'px',
                },
            }
        },
    })
    const doHV = e => {
        setState({
            ...state,
            borderRadius: {
                ...state.borderRadius,
                horizonVertical: e.target.checked
            }
        })
    }
    const doUse = e => {
        console.log(e.target.checked)
        //チェックされた要素がaかbかを判断する
        console.log(e.target.value)
        const targetValue = e.target.value;
        setState({
            ...state,
            borderRadius: {
                ...state.borderRadius,
                style: {
                    ...state.borderRadius.style,
                    [targetValue]: {
                        ...state.borderRadius.style[targetValue],
                        check: e.target.checked
                    }
                }
            }
        })
    }
    const doSize = e => {
        const targetValue = e.target.name;
        setState({
            ...state,
            borderRadius: {
                ...state.borderRadius,
                style: {
                    ...state.borderRadius.style,
                    [targetValue]: {
                        ...state.borderRadius.style[targetValue],
                        size: e.target.value
                    }
                }
            }
        })
    }
    const doRadio = e => {
        console.log(e.target.name)
        const targetValue = e.target.name;
        setState({
            ...state,
            borderRadius: {
                ...state.borderRadius,
                style: {
                    ...state.borderRadius.style,
                    [targetValue]: {
                        ...state.borderRadius.style[targetValue],
                        unit: e.target.value
                    }
                }
            }
        })
    }
    const borCSS = () => {
        const bbb = state.borderRadius.style;
        let ddd = '';
        for (const aaa in bbb) {
            if (bbb[aaa].check === true) {
                ddd = `${ddd} ${bbb[aaa].size}${bbb[aaa].unit}`
            }
            //console.log(ddd);
        }
        return { borderRadius: ddd }
    }
    const boxStyle = {
        background: '#f00',
        padding: '2em',
        display: 'block',
        ...borCSS(),
    }
    return (
        <div style={style}>
            <div><a href="" className="preview" style={boxStyle}>あああ</a></div>
            <div>
                <input type="checkbox" onClick={doHV} />「水平半径/垂直半径」を使用する。
            </div>
            <div>
                <input type="checkbox" value="a" onChange={doUse} defaultChecked />A<br />
                <input type="range" name="a" onChange={doSize} />
                <div>{state.borderRadius.style.a.size}</div>
                <div>
                    <input type="radio" value="px" name="a" onChange={doRadio} defaultChecked />px
                    <input type="radio" value="%" name="a" onChange={doRadio} />%
                    <input type="radio" value="rem" name="a" onChange={doRadio} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="b" onChange={doUse} />B<br />
                <input type="range" name="b" onChange={doSize} />
                <div>{state.borderRadius.style.b.size}</div>
                <div>
                    <input type="radio" value="px" name="b" onChange={doRadio} defaultChecked />px
                    <input type="radio" value="%" name="b" onChange={doRadio} />%
                    <input type="radio" value="rem" name="b" onChange={doRadio} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="c" onChange={doUse} />C<br />
                <input type="range" name="c" onChange={doSize} />
                <div>{state.borderRadius.style.c.size}</div>
                <div>
                    <input type="radio" value="px" name="c" onChange={doRadio} defaultChecked />px
                    <input type="radio" value="%" name="c" onChange={doRadio} />%
                    <input type="radio" value="rem" name="c" onChange={doRadio} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="d" onChange={doUse} />D<br />
                <input type="range" name="d" onChange={doSize} />
                <div>{state.borderRadius.style.d.size}</div>
                <div>
                    <input type="radio" value="px" name="d" onChange={doRadio} defaultChecked />px
                    <input type="radio" value="%" name="d" onChange={doRadio} />%
                    <input type="radio" value="rem" name="d" onChange={doRadio} />rem
                </div>
            </div>
        </div>
    )
}



