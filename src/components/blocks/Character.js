import { useState, useCallback, useContext } from 'react';
import { Sheet } from '../Integrate';

//文言
export function Character() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    const [state, setState] = useState({
        character: '',
    })

    const characterFunc = e => {
        setState({
            ...state,
            character: e.target.value,
        })
        chFunc();
    }

    const chFunc = () => {
        const obj = {}
        obj['character'] = state.character
        setStyleDispatch({ type: 'ch', value: obj });
    }

    return (
        <div>
            <input type="text" value={state.character} onChange={characterFunc} />
        </div>
    )
}
