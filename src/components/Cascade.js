import { useState, useCallback, useContext } from 'react';
import { Sheet } from './Integrate';


//CSS抽出
export function Cascade() {
    const [styleState, setStyleState] = useContext(Sheet)

    const style = {
        width: '20em',
        height: '10em',
    }

    console.log(styleState)
/*
    const bg = 'background:' + cascade.bgcolor;
    const pd = 'padding:' + cascade.padding + 'px';
    const text =
        `.preview{
    ${bg};
    ${cascade.padding === '0' ? '' : pd+';'}
}`
*/
    return (
        <div>
            <textarea style={style} readOnly></textarea>
        </div>
    )
}