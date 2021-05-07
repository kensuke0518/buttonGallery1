import { useState, useCallback, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//余白
export function Padding() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    const [state, setState] = useState({
        size: '10',
        unit: 'px',
    })

    const sizeFunc = e => {
        const newState = {
            ...state,
            size: e.target.value,
        }
        setState({
            ...newState
        })
        pdCSS(newState);
    }

    const pdCSS = (newState = state) => {
        //オブジェクトで示す
        const obj = {}
        obj['padding'] = `${newState.size}${newState.unit}`

        //CSSで示す
        let css = 'padding:';
        for (let property in obj) {
            css = css + obj[property];
        }
        css = `${css}\n`

        //ストアへ渡す形を作る
        const value = {
            obj,
            css
        }

        setStyleDispatch({ type: 'pd', value })
    }

    useEffect(() => { pdCSS() }, [])

    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>余白</p>
            <input type="range" value={state.size} min="0" max="100" onChange={sizeFunc} />
            <div>{state.size}px</div>
        </div>
    )
}

