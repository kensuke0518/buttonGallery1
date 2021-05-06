import { useState, useCallback, useContext } from 'react';
import { Sheet } from '../Integrate';

//背景色
export function Background() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    const [state, setState] = useState({
        bgcolor: '',
    })

    const bgColorFunc = e => {
        setState({
            ...state,
            bgcolor:e.target.value,
        })
        bgFunc();
    }

    const bgFunc = () => {
        const obj = {}
        obj['background'] = state.bgcolor
        setStyleDispatch({ type: 'bg', value: obj });
    }

    return (
        <div>
            <div><input type="color" value={state.bgcolor} onChange={bgColorFunc} /></div>
            <div>{state.bgcolor}</div>
        </div>
    )
}
