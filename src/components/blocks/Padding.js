import { useState, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//ストアで管理するステートの値
export const pdState = {
    top: {
        checked: true,
        size: '10',
        unit: 'px',
    },
    bottom: {
        checked: true,
        size: '10',
        unit: 'px',
    },
    left: {
        checked: true,
        size: '10',
        unit: 'px',
    },
    right: {
        checked: true,
        size: '10',
        unit: 'px',
    },
}

//余白
export function Padding() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    //ストアを変数に代入
    const pdComp = styleState.newStyle.padding.comp;

    const sizeFunc = e => {
        const newState = {
            ...pdComp,
            size: e.target.value,
        }
        pdCSS(newState);
    }

    const pdCSS = (newState = pdComp) => {
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
        const comp = newState

        //ストアへ渡す形を作る
        const value = {
            obj,
            css,
            comp,
        }

        setStyleDispatch({ type: 'pd', value })
    }

    useEffect(() => {
        pdCSS()
    }, [])

    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>余白</p>
            <input type="range" value={pdComp.size} min="0" max="100" onChange={sizeFunc} />
            <div>{pdComp.size}px</div>

            <div>
                <input type="checkbox" name="" value="top" onClick={directionFunc} />上<br />
                <input type="range" value={pdComp.size} min="0" max="100" onChange={sizeFunc} /><br />
                <input type="checkbox" name="" value="top" onClick={directionFunc} />上<br />
                <input type="range" value={pdComp.size} min="0" max="100" onChange={sizeFunc} /><br />
                <input type="checkbox" name="" value="top" onClick={directionFunc} />上<br />
                <input type="range" value={pdComp.size} min="0" max="100" onChange={sizeFunc} /><br />
                <input type="checkbox" name="" value="top" onClick={directionFunc} />上<br />
                <input type="range" value={pdComp.size} min="0" max="100" onChange={sizeFunc} /><br />
            </div>

        </div>
    )
}

