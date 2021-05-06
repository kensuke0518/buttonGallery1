import { useState, useCallback, useContext } from 'react';
import { Sheet } from './Integrate';

export function Preview() {
    const [styleState, setStyleState] = useContext(Sheet)

    const style = {
        ...styleState.border,
        ...styleState.borderRadius,
        ...styleState.padding,
        ...styleState.background,
        color: '#fff',
        display: 'inline-block',
        textDecoration: 'none',
    }
    
    const stopLink = e => e.preventDefault();
    
    //console.log(styleState.character.character )
    return (
        <a href="" onClick={stopLink} className="preview" style={style}>送信</a>
    )
}