import { useState, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//ストアで管理するステートの値
export const crState = {
    color:'#ffffff'
}

//余白
export function Color() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    //ストアを変数に代入
    const crComp = styleState.newStyle.color.comp;

    const colorFunc = e => {
        const newState = {
            ...crComp,
            color: e.target.value,
        }
        crCSS(newState);
    }

    const crCSS = (newState = crComp) => {
        //オブジェクトで示す
        const obj = {}
        obj['color'] = newState.color

        //CSSで示す
        let css = 'color:';
        for (let property in obj) {
            css = css + obj[property];
        }
        css = `${css};\n`

        //各項目のステートをレデューサーへ送る準備を示す
        const comp = newState

        //CSSの状態をレデューサーへ（あるいはアクションクリエイターへ）渡す
        const value = {
            obj,
            css,
            comp,
        }
        setStyleDispatch({ type: 'cr', value });
    }

    useEffect(() => { crCSS() }, [])

    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>文字色</p>
            <div><input type="color" value={crComp.color} onChange={colorFunc} /></div>
            <div>{crComp.color}</div>
        </div>
    )
}
