import { useState, useContext, useEffect } from 'react';
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
        css = `${css};\n`

        //各項目のステートをレデューサーへ送る準備を示す
        const comp = { ...newState }

        //ストアへ渡す形を作る
        const value = {
            obj,
            css,
            comp,
        }

        setStyleDispatch({ type: 'pd', value })
    }

    useEffect(() => { pdCSS() }, [])

    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>余白</p>
            <input type="range" value={styleState.newStyle.padding.comp.size} min="0" max="100" onChange={sizeFunc} />
            <div>{styleState.newStyle.padding.comp.size}px</div>
        </div>
    )
}

