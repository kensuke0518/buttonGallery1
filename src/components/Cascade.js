import { useState, useCallback, useContext } from 'react';
import { Sheet } from './Integrate';


//CSS抽出
export function Cascade() {
    const [styleState, setStyleState] = useContext(Sheet)

    //const newStyle = styleState.newStyle;

    const style = {
        width: '20em',
        height: '10em',
    }

    let chara = '';
    for (let p in styleState) {
        if (styleState[p].css !== undefined) {
            chara = chara + styleState[p].css;
        }
    }

    const text = '.preview{\n' + chara + '}';

    return (
        <div>
            <textarea style={style} value={text} readOnly></textarea>
        </div>
    )
}