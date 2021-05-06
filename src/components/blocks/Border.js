import { useState, useCallback, useContext } from 'react';
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
        setState({
            ...state,
            check: check,
        })
        bdCSS();
    }

    //サイズ
    const sizeFunc = e => {
        setState({
            ...state,
            size: e.target.value,
        })
        bdCSS();
   }

    //カラー
    const colorFunc = e => {
        setState({
            ...state,
            color: e.target.value,
        })
        bdCSS();
    }

    //CSS
    function bdCSS() {
        const obj = {}
        if (state.check.length === 4) {
            obj['border'] = `${state.size}px solid ${state.color}`
        }
        else if (1 < state.check.length < 4) {
            state.check.map(tblr => {
                const newTblr = tblr.charAt(0).toUpperCase() + tblr.slice(1);
                obj['border' + newTblr] = `${state.size}px solid ${state.color}`
            })
        }
        else if (state.check.length === 0) {
            obj = {}
        }
        if (state.size === 0) {
            obj = {}
        }
        console.log(obj)
        setStyleDispatch({ type: 'bd', value: obj });
    }

    
    return (
        <div>
            <div>
                <input type="checkbox" name="" value="top" id="borderTop" onClick={directionFunc} />上
                <input type="checkbox" name="" value="bottom" id="borderBottom" onClick={directionFunc} />下
                <input type="checkbox" name="" value="left" id="borderLeft" defaultChecked onClick={directionFunc} />左
                <input type="checkbox" name="" value="right" id="borderRight" onClick={directionFunc} />右
            </div>
            <input type="range" value={state.size} min="0" max="10" onChange={sizeFunc} />
            <div>{state.size}</div>
            <input type="color" value={state.color} onChange={colorFunc} />
            <div>{state.color}</div>
        </div>
    )
}


/**
 */



