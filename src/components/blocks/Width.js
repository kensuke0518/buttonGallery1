import { useState, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//ストアで管理するステートの値
export const wdState = {
    size: '300',
    unit: 'px',
}

//余白
export function Width() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    //ストアを変数に代入
    const wdComp = styleState.newStyle.width.comp;

    const sizeFunc = e => {
        const newState = {
            ...wdComp,
            size: e.target.value,
        }
        wdCSS(newState);
    }

    const wdCSS = (newState = wdComp) => {
        //オブジェクトで示す
        const obj = {}
        obj['width'] = `${newState.size}${newState.unit}`

        //CSSで示す
        let css = 'width:';
        for (let property in obj) {
            css = css + obj[property];
        }
        css = `${css};\n`

        //各項目のステートをレデューサーへ送る準備を示す
        const comp = newState

        //ストアへ渡す形を作る
        const value = {
            obj,
            css,
            comp,
        }

        setStyleDispatch({ type: 'wd', value })
    }

    useEffect(() => {
        wdCSS()
    }, [])

    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>幅</p>
            <input type="range" value={wdComp.size} style={{ width: '300px' }} min="0" max="600" onChange={sizeFunc} />
            <div>{wdComp.size}px</div>
        </div>
    )
}

