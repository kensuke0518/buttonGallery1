import { useState, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//ストアで管理するステートの値
export const pdState = {
    style: {
        top: {
            checked: true,
            size: '10',
            unit: [
                { value: 'px', checked: true },
                { value: '%', checked: false },
                { value: 'rem', checked: false },
            ],
        },
        right: {
            checked: true,
            size: '10',
            unit: [
                { value: 'px', checked: true },
                { value: '%', checked: false },
                { value: 'rem', checked: false },
            ],
        },
        bottom: {
            checked: true,
            size: '10',
            unit: [
                { value: 'px', checked: true },
                { value: '%', checked: false },
                { value: 'rem', checked: false },
            ],
        },
        left: {
            checked: true,
            size: '10',
            unit: [
                { value: 'px', checked: true },
                { value: '%', checked: false },
                { value: 'rem', checked: false },
            ],
        },
    },
    sampling:false,
}

//余白
export function Padding() {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    //ストアを変数に代入
    const pdComp = styleState.newStyle.padding.comp;

    const sizeFunc = e => {
        const targetName = e.target.name;
        const newState = {
            ...pdComp,
            style:{
                ...pdComp.style,
                [targetName]: {
                    ...pdComp.style[targetName],
                    size: e.target.value,
                }
            },
            sampling:false
        }
        pdCSS(newState);
    }

    const unitFunc = e => {
        const targetName = e.target.name;
        const targetValue = e.target.value;

        const array = []
        for (let i = 0; i < pdComp.style[targetName].unit.length; i++) {
            if (pdComp.style[targetName].unit[i].value === targetValue) {
                array.push({ value: pdComp.style[targetName].unit[i].value, checked: true })
            }
            else {
                array.push({ value: pdComp.style[targetName].unit[i].value, checked: false })
            }
        }

        const newState = {
            ...pdComp,
            style: {
                ...pdComp.style,
                [targetName]: {
                    ...pdComp.style[targetName],
                    unit: array,
                }
            },
            sampling: false
        }

        pdCSS(newState);
    }

    const directionFunc = e => {
        const targetName = e.target.value;
        const newState = {
            ...pdComp,
            style: {
                ...pdComp.style,
                [targetName]: {
                    ...pdComp.style[targetName],
                    checked: e.target.checked,
                }
            },
            sampling: false
        }
        pdCSS(newState);
    }

    const pdCSS = (newState = pdComp) => {
        const stateStyles = newState.style;
        let brValue = '';
        let array = []
        let size, unit;
        for (let p in stateStyles) {
            if (stateStyles[p].checked === false) {
                array.push(0)
                continue;
            }
            for (let i = 0; i < stateStyles[p].unit.length; i++) {
                if (stateStyles[p].unit[i].checked === true) {
                    size = stateStyles[p].size
                    unit = stateStyles[p].unit[i].value;
                    if (unit === 'rem') size = size.replace(/(\d)$/g, '.$1') //rem対応の有無
                    size === '0' || size === '.0' ? array.push(`0`) : array.push(`${size}${unit}`);
                }
            }
        }
        //全て同じ値指定か検索
        const sameNum = array.every(value => {
            return value === array[0];
        })
        if (sameNum === true) {
            brValue = ` ${array[0]}`
        }
        else {
            for (let i = 0; i < array.length; i++) {
                brValue = `${brValue} ${array[i]}`
            }
        }

        //オブジェクトで示す
        let obj = {}
        obj['padding'] = brValue;


        //CSSで示す
        let css = 'padding:';
        for (let property in obj) {
            css = css + obj[property];
        }
        css = `${css};\n`

        //各項目のステートをレデューサーへ送る準備を示す
        const comp = newState

        //チェックが全てfalseの場合、CSSに反映させず、何も表示させないようにする
        let checkedBoolean;
        for (let p in stateStyles) {
            if (stateStyles[p].checked === true) {
                checkedBoolean = 1;
                break;
            }
            else if (stateStyles[p].checked === false) {
                checkedBoolean = 0;
            }
        }
        if (checkedBoolean === 0) {
            obj = {}
            css = ''
        }
        

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
            <div>
                <input type="checkbox" name="" value="top" checked={pdComp.style.top.checked} onClick={directionFunc} />上<br />
                <input type="range" name="top" value={pdComp.style.top.size} min="0" max="100" onChange={sizeFunc} /><br />
                <div>{pdComp.style.top.unit[2].checked === true ? `${pdComp.style.top.size.replace(/(\d)$/g, '.$1')}` : pdComp.style.top.size}</div>
                <div>
                    <input type="radio" value="px" name="top" checked={pdComp.style.top.unit[0].checked} onChange={unitFunc} />px
                    <input type="radio" value="%" name="top" checked={pdComp.style.top.unit[1].checked} onChange={unitFunc} />%
                    <input type="radio" value="rem" name="top" checked={pdComp.style.top.unit[2].checked} onChange={unitFunc} />rem
                </div>
                <input type="checkbox" name="" value="bottom" checked={pdComp.style.bottom.checked} onClick={directionFunc} />下<br />
                <input type="range" name="bottom"  value={pdComp.style.bottom.size} min="0" max="100" onChange={sizeFunc} /><br />
                <div>{pdComp.style.bottom.unit[2].checked === true ? `${pdComp.style.bottom.size.replace(/(\d)$/g, '.$1')}` : pdComp.style.bottom.size}</div>
                <div>
                    <input type="radio" value="px" name="bottom" checked={pdComp.style.bottom.unit[0].checked} onChange={unitFunc} />px
                    <input type="radio" value="%" name="bottom" checked={pdComp.style.bottom.unit[1].checked} onChange={unitFunc} />%
                    <input type="radio" value="rem" name="bottom" checked={pdComp.style.bottom.unit[2].checked} onChange={unitFunc} />rem
                </div>
                <input type="checkbox" name="" value="left" checked={pdComp.style.left.checked} onClick={directionFunc} />左<br />
                <input type="range" name="left"  value={pdComp.style.left.size} min="0" max="100" onChange={sizeFunc} /><br />
                <div>{pdComp.style.left.unit[2].checked === true ? `${pdComp.style.left.size.replace(/(\d)$/g, '.$1')}` : pdComp.style.left.size}</div>
                <div>
                    <input type="radio" value="px" name="left" checked={pdComp.style.left.unit[0].checked} onChange={unitFunc} />px
                    <input type="radio" value="%" name="left" checked={pdComp.style.left.unit[1].checked} onChange={unitFunc} />%
                    <input type="radio" value="rem" name="left" checked={pdComp.style.left.unit[2].checked} onChange={unitFunc} />rem
                </div>
                <input type="checkbox" name="" value="right" checked={pdComp.style.right.checked} onClick={directionFunc} />右<br />
                <input type="range" name="right"  value={pdComp.style.right.size} min="0" max="100" onChange={sizeFunc} /><br />
                <div>{pdComp.style.right.unit[2].checked === true ? `${pdComp.style.right.size.replace(/(\d)$/g, '.$1')}` : pdComp.style.right.size}</div>
                <div>
                    <input type="radio" value="px" name="right" checked={pdComp.style.right.unit[0].checked} onChange={unitFunc} />px
                    <input type="radio" value="%" name="right" checked={pdComp.style.right.unit[1].checked} onChange={unitFunc} />%
                    <input type="radio" value="rem" name="right" checked={pdComp.style.right.unit[2].checked} onChange={unitFunc} />rem
                </div>
            </div>

        </div>
    )
}

