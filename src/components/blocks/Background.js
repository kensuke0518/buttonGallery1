import { useState, useCallback, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//背景色
export function Background() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    const [state, setState] = useState({
        bgcolor: '#189bdc',
    })

    //useEffect(() => bgCSS());

    const bgColorFunc = e => {
        const newState = {
            ...state,
            bgcolor: e.target.value,
        }
        setState({ //setStateが遅い。。。
            ...newState,
        })
        bgCSS(newState);
    }

    const bgCSS = (newState = state) => {
        //オブジェクトで示す
        const obj = {}
        obj['background'] = newState.bgcolor

        //CSSで示す
        let css = 'background:';
        for (let property in obj) {
            css = css + obj[property];
        }
        css = `${css}\n`

        //ストアへ渡す形を作る
        const value = {
            obj,
            css
        }
        //レデューサーへ（あるいはアクションクリエイターへ）渡す
        setStyleDispatch({ type: 'bg', value });
    }

    useEffect(()=>{bgCSS()},[])

    return (
        <div>
            <div><input type="color" value={state.bgcolor} onChange={bgColorFunc} /></div>
            <div>{state.bgcolor}</div>
        </div>
    )
}
