import { useState, useCallback, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//文言
export function Character() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    const [state, setState] = useState({
        character: '',
    })

    const characterFunc = e => {
        const newState = {
            ...state,
            character: e.target.value,
        }
        setState({
            ...newState,
        })
        chFunc(newState);
    }

    const chFunc = (newState = state) => {
        const obj = {}
        obj['character'] = newState.character
        setStyleDispatch({ type: 'ch', value: obj });
    }

    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>ボタンに入る文字</p>
            <input type="text" value={state.character} onChange={characterFunc} />
        </div>
    )
}
