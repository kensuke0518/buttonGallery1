import { useState, useEffect, useReducer } from 'react';

function Box(props) {
    const style = {
        display: 'inline-block',
        padding: props.style.padding + 'px',
        background: props.style.bgcolor,
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
function BgColor(props) {
    return (
        <div>
            <div><input type="color" value={props.bgcolor} onChange={props.doBgChange} /></div>
            <div>{props.bgcolor}</div>
        </div>
    )
}
function Padding(props) {
    return (
        <div>
            <input id="rangeInput" type="range" value={props.padding} min="0" max="100" onChange={props.doPaddingChange} />
            <div>{props.padding}</div>
        </div>
    )
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'bg':
            return {
                ...state,
                bgcolor:action.event.target.value
            }
        case 'pd':
            return {
                ...state,
                padding: action.event.target.value
            }
    }
}

export function Tests() {
    const [state, dispatch] = useReducer(reducer,{
        bgcolor: '#000000',
        padding:10,
    })
    return (
        <>
            <Box style={state} />
            <BgColor bgcolor={state.bgcolor} doBgChange={e=>dispatch({type:'bg',event:e})} />
            <Padding padding={state.padding} doPaddingChange={e => dispatch({ type: 'pd', event: e })} />
        </>
    )
}