import { useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//初期値
export const bdInitState = {
    property: 'border',
    value: {
        check: [],
        size: '0',
        color: '#000000',
    }
}
//ストアで管理するステートの値
export const bdState = {
    property: 'border',
    value: {
        check: ['left'],
        size: '3',
        color: '#ff0000',
    }
}

//ボーダー
export function Border() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    //ストアのデータを変数に代入
    const bdComp = styleState.newStyle.border.comp;

    //方向
    const directionFunc = e => {
        const [...check] = bdComp.check;
        const num = check.indexOf(e.target.value);
        if (num === -1) {
            check.push(e.target.value)
        }
        else {
            check.splice(num, 1)
        }
        const newState = {
            ...bdComp,
            check: check,
        }
        bdCSS(newState);
    }

    //サイズ
    const sizeFunc = e => {
        const newState = {
            ...bdComp,
            size: e.target.value,
        }
        bdCSS(newState);
   }

    //カラー
    const colorFunc = e => {
        const newState = {
            ...bdComp,
            color: e.target.value,
        }
        bdCSS(newState);
    }

    //CSS
    function bdCSS(newState = bdComp) {
        //オブジェクトで示す。
        let obj = {}
        if (newState.check.length === 4) {
            obj['border'] = `${newState.size}px solid ${newState.color}`
        }
        else if (1 < newState.check.length < 4) {
            newState.check.forEach(tblr => {
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
            css = css + direction + ': ' + obj[property] + ';\n';
        }
        
        //各項目のステートをレデューサーへ送る準備を示す
        const comp = newState

        //ストアへ渡す形を作る
        const value = {
            obj,
            css,
            comp
        }
        
        setStyleDispatch({ type: 'bd', value });
    }

    useEffect(() => { bdCSS() }, [])
    
    return (
        <div>
            <p>ボーダー</p>
            <div>
                <input type="checkbox" name="" value="top" id="borderTop" checked={bdComp.check.includes('top') ? true : false} onClick={directionFunc} />上
                <input type="checkbox" name="" value="bottom" id="borderBottom" checked={bdComp.check.includes('bottom') ? true : false} onClick={directionFunc} />下
                <input type="checkbox" name="" value="left" id="borderLeft" checked={bdComp.check.includes('left') ? true : false} onClick={directionFunc} />左
                <input type="checkbox" name="" value="right" id="borderRight" checked={bdComp.check.includes('right') ? true : false} onClick={directionFunc} />右
            </div>
            <input type="range" value={bdComp.size} min="0" max="10" onChange={sizeFunc} />
            <div>{bdComp.size}px</div>
            <input type="color" value={bdComp.color} onChange={colorFunc} />
            <div>{bdComp.color}</div>
        </div>
    )
}
