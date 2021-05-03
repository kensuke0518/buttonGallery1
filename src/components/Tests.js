import { useState, useEffect } from 'react';

function Box(props) {
    const style = {
        display: 'inline-block',
        padding: props.padding + 'px',
        background: props.bgcolor,
        color: '#fff',
    }
    /*
    useEffect(() => {
        console.log(style)
    })
    */
    return (
        <div className="box" style={style}>こんにちは</div>
    )
}

const aaa = (ev, kansu) => {
    kansu(ev.target.value);
}

function BgColor(props) {
    return (
        <div>
            <div><input type="color" value={props.bgcolor} onChange={props.doBgChange} /></div>
            <div>{props.bgcolor}</div>
        </div>
    )
}


export function Tests() {
    const [state, setState] = useState({
        bgcolor: '#000000',
        padding:10,
    })
    const doBgChange = e => {
        setState({
            ...state, //こちらを先に書かなければいけない。
            bgcolor:e.target.value,
        });
    }
    const doPaddingChange = e => {
        setState({
            ...state, //こちらを先に書かなければいけない。
            padding: e.target.value,
        });
    }
    return (
        <>
            <Box bgcolor={state.bgcolor} padding={state.padding} />
            <BgColor bgcolor={state.bgcolor} doBgChange={doBgChange} />
            <div>
                <input id="rangeInput" type="range" value={state.padding} min="0" max="100" onChange={doPaddingChange} />
                <div>{state.padding}</div>
            </div>
        </>
    )
}