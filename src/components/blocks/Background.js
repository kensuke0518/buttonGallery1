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

        //CSSの状態をレデューサーへ（あるいはアクションクリエイターへ）渡す
        const value = {
            obj,
            css
        }
        setStyleDispatch({ type: 'bg', value });

        //各項目の状態をレデューサーへ（あるいはアクションクリエイターへ）渡す
        const valueUnit = {
            background: state
        }
        setStyleDispatch({ type: 'cu', value: valueUnit });
    }

    useEffect(()=>{bgCSS()},[])

    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>ボタンの背景色</p>
            <div><input type="color" value={state.bgcolor} onChange={bgColorFunc} /></div>
            <div>{state.bgcolor}</div>
        </div>
    )
}
