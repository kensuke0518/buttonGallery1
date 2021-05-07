import { useState, useCallback, useContext } from 'react';
import { Sheet } from './Integrate';

export function Preview() {
    const [styleState, setStyleState] = useContext(Sheet)

    //const newStyle = styleState.newStyle

    const style = {
        ...styleState.border.obj,
        ...styleState.borderRadius.obj,
        ...styleState.padding.obj,
        ...styleState.background.obj,
        color: '#fff',
        display: 'inline-block',
        textDecoration: 'none',
    }
    
    const stopLink = e => e.preventDefault();

    return (
        <a href="" onClick={stopLink} className="preview" style={style}>{styleState.character.character}</a>
    )
}