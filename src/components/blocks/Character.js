import { useState, useCallback, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

export const chState = {
    character: '送信',
}

//文言
export function Character() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    //ストアのデータを変数に代入
    const chComp = styleState.character;

    const characterFunc = e => {
        const newState = {
            ...styleState,
            character: e.target.value,
        }
        chFunc(newState);
    }

    const chFunc = (newState = chComp) => {
        const obj = {}
        obj['character'] = newState.character
        setStyleDispatch({ type: 'ch', value: obj });
    }

    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>ボタンに入る文字</p>
            <input type="text" value={chComp.character} onChange={characterFunc} />
        </div>
    )
}
