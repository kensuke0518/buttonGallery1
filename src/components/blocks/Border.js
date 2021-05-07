import { useState, useCallback, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//ボーダー
export function Border() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    const [state, setState] = useState({
        check: ['left'],
        size: '3',
        color: '#ff0000',
    })

    //方向
    const directionFunc = e => {
        const [...check] = state.check;
        const num = check.indexOf(e.target.value);
        if (num === -1) {
            check.push(e.target.value)
        }
        else {
            check.splice(num, 1)
        }
        const newState = {
            ...state,
            check: check,
        }
        setState({
            ...newState,
        })
        bdCSS(newState);
    }

    //サイズ
    const sizeFunc = e => {
        const newState = {
            ...state,
            size: e.target.value,
        }
        setState({
            ...newState,
        })
        bdCSS(newState);
   }

    //カラー
    const colorFunc = e => {
        const newState = {
            ...state,
            color: e.target.value,
        }
        setState({
            ...newState,
        })
        bdCSS(newState);
    }

    //CSS
    function bdCSS(newState = state) {
        //オブジェクトで示す。
        const obj = {}
        if (newState.check.length === 4) {
            obj['border'] = `${newState.size}px solid ${newState.color}`
        }
        else if (1 < newState.check.length < 4) {
            newState.check.map(tblr => {
                const newTblr = tblr.charAt(0).toUpperCase() + tblr.slice(1);
                obj['border' + newTblr] = `${newState.size}px solid ${newState.color}`
            })
        }
        else if (newState.check.length === 0) {
            obj = {}
        }
        if (newState.size === 0) {
            obj = {}
        }

        //CSSで示す
        let css = '';
        for (let property in obj) {
            let direction = property.replace(/border/g, '').toLowerCase();
            direction === '' ? direction = 'border' : direction = `border-${direction}`;
            css = css + direction + ': ' + obj[property] + '\n';
        }
        
        //ストアへ渡す形を作る
        const value = {
            obj,
            css
        }
        
        setStyleDispatch({ type: 'bd', value });
    }

    useEffect(() => { bdCSS() }, [])
    
    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>ボーダー</p>
            <div>
                <input type="checkbox" name="" value="top" id="borderTop" onClick={directionFunc} />上
                <input type="checkbox" name="" value="bottom" id="borderBottom" onClick={directionFunc} />下
                <input type="checkbox" name="" value="left" id="borderLeft" defaultChecked onClick={directionFunc} />左
                <input type="checkbox" name="" value="right" id="borderRight" onClick={directionFunc} />右
            </div>
            <input type="range" value={state.size} min="0" max="10" onChange={sizeFunc} />
            <div>{state.size}px</div>
            <input type="color" value={state.color} onChange={colorFunc} />
            <div>{state.color}</div>
        </div>
    )
}
