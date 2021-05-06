import { useState, useCallback, useContext } from 'react';
import { Sheet } from '../Integrate';

//余白
export function Padding() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    const [state, setState] = useState({
        size: '10',
        unit: 'px',
    })

    const sizeFunc = e => {
        setState({
            ...state,
            size:e.target.value,
        })
        pdFunc();
    }

    const pdFunc = () => {
        const obj = {}
        obj['padding'] = `${state.size}${state.unit}`
        setStyleDispatch({type:'pd',value:obj})
    }

    return (
        <div>
            <input type="range" value={state.size} min="0" max="100" onChange={sizeFunc} />
            <div>{state.size}</div>
        </div>
    )
}

