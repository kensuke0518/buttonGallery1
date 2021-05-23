import { useState, useCallback, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//初期値
export const bgInitState = {
    property: 'background',
    value: {
        bgcolor: '#000000',
    }
}
//デフォルト値：ストアで管理するステートの値
export const bgState = {
    property: 'background',
    value: {
        bgcolor: '#189bdc',
    }
}

//背景色
export function Background() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    //ストアを変数に代入
    const bgComp = styleState.newStyle.background.comp;

    const bgColorFunc = e => {
        const newState = {
            ...bgComp,
            bgcolor: e.target.value,
        }
        bgCSS(newState);
    }

    const bgCSS = (newState = bgComp) => {
        //オブジェクトで示す
        const obj = {}
        obj['background'] = newState.bgcolor

        //CSSで示す
        let css = 'background:';
        for (let property in obj) {
            css = css + obj[property];
        }
        css = `${css};\n`

        //各項目のステートをレデューサーへ送る準備を示す
        const comp = { ...newState }

        //CSSの状態をレデューサーへ（あるいはアクションクリエイターへ）渡す
        const value = {
            obj,
            css,
            comp,
        }
        setStyleDispatch({ type: 'bg', value });
    }

    useEffect(() => { bgCSS() }, [])
    
    return (
        <div>
            <p>ボタンの背景色</p>
            <div><input type="color" value={bgComp.bgcolor} onChange={bgColorFunc} /></div>
            <div>{bgComp.bgcolor}</div>
        </div>
    )
}
