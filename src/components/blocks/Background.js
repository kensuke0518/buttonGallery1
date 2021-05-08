import { useState, useCallback, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//背景色
export function Background() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    const [state, setState] = useState({
        bgcolor: '#189bdc',
    })

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
            <p style={styleState.componentStyle.heading.a}>ボタンの背景色</p>
            <div><input type="color" value={styleState.newStyle.background.comp.bgcolor} onChange={bgColorFunc} /></div>
            <div>{styleState.newStyle.background.comp.bgcolor}</div>
        </div>
    )
}
