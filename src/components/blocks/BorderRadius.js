import { useState, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//ストアで管理するステートの値
export const brState = {
    horizonVertical: false,
    style: {
        a: {
            check: true,
            size: '10',
            unit: [
                { value: 'px', checked: true },
                { value: '%', checked: false },
                { value: 'rem', checked: false },
            ],
        },
        b: {
            check: false,
            size: '10',
            unit: [
                { value: 'px', checked: true },
                { value: '%', checked: false },
                { value: 'rem', checked: false },
            ],
        },
        c: {
            check: false,
            size: '10',
            unit: [
                { value: 'px', checked: true },
                { value: '%', checked: false },
                { value: 'rem', checked: false },
            ],
        },
        d: {
            check: false,
            size: '10',
            unit: [
                { value: 'px', checked: true },
                { value: '%', checked: false },
                { value: 'rem', checked: false },
            ],
        },
    },
    sampling: false
}

//角丸
//https://coliss.com/articles/build-websites/operation/css/css-border-radius-can-do-that.html
export function BorderRadius() {
    //CSSレデューサーを取得
    const [styleState, setStyleDispatch] = useContext(Sheet);

    //ストアのデータを変数に代入
    const brComp = styleState.newStyle.borderRadius.comp;

    //水平垂直
    const horizonVerticalFunc = e => {
        const newState = {
            ...brComp,
            horizonVertical: e.target.checked
        }
    }

    //各頂点を使うかどうか
    const radiusUseFunc = e => {
        //チェックされた要素がaかbかを判断する
        const targetName = e.target.value;
        const newState = {
            ...brComp,
            style: {
                ...brComp.style,
                [targetName]: {
                    ...brComp.style[targetName],
                    check: e.target.checked
                }
            },
            sampling: false
        }
        brCSS(newState);
    }

    //サイズの調整
    const sizeFunc = e => {
        const targetName = e.target.name;
        const newState = {
            ...brComp,
            style: {
                ...brComp.style,
                [targetName]: {
                    ...brComp.style[targetName],
                    size: e.target.value
                }
            },
            sampling: false
        }
        brCSS(newState);
    }

    //単位の設定
    const unitFunc = e => {
        const targetName = e.target.name;
        const targetValue = e.target.value;

        const array = []
        for (let i = 0; i < brComp.style[targetName].unit.length; i++){
            if (brComp.style[targetName].unit[i].value === targetValue) {
                array.push({ value: brComp.style[targetName].unit[i].value, checked: true })
            }
            else {
                array.push({ value: brComp.style[targetName].unit[i].value, checked: false })
            }
        }

        const newState = {
            ...brComp,
            style: {
                ...brComp.style,
                [targetName]: {
                    ...brComp.style[targetName],
                    unit: array
                }
            },
            sampling: false
        }

        brCSS(newState);
    }

    //最終的なCSSの抽出
    const brCSS = (newState = brComp) => {
        const obj = {}
        const stateStyles = newState.style;
        let brValue = '';
        let array = []
        let size, unit;
        console.log(stateStyles)
        for (let p in stateStyles) {
            if (stateStyles[p].check === false) {
                array.push(0)
                continue;
            }
            for (let i = 0; i < stateStyles[p].unit.length; i++) {
                if (stateStyles[p].unit[i].checked === true) {
                    size = stateStyles[p].size
                    unit = stateStyles[p].unit[i].value;
                    array.push(`${stateStyles[p].size}${unit}`)
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


        obj['borderRadius'] = brValue;

        //CSSで示す
        let css;
        if (obj['borderRadius'] !== '') {
            css = 'border-radius:'
            for (let property in obj) {
                css = css + obj[property];
            }
            css = `${css};\n`
        }
        else {
            css = '';
        }

        //各項目のステートをレデューサーへ送る準備を示す
        const comp = newState

        //ストアへ渡す形を作る
        const value = {
            obj,
            css,
            comp,
        }

        setStyleDispatch({ type: 'br', value })
    }

    useEffect(() => {
        brCSS();
    }, [])

    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>角丸</p>
            <div>
                <input type="checkbox" onClick={horizonVerticalFunc} />「水平半径/垂直半径」を使用する。
            </div>
            <div>
                <input type="checkbox" value="a" onChange={radiusUseFunc} checked={brComp.style.a.check} />A<br />
                <input type="range" name="a" value={brComp.style.a.size} onChange={sizeFunc} />
                <div>{brComp.style.a.size}</div>
                <div>
                    <input type="radio" value="px" name="a" checked={brComp.style.a.unit[0].checked} onChange={unitFunc} />px
                    <input type="radio" value="%" name="a" checked={brComp.style.a.unit[1].checked} onChange={unitFunc} />%
                    <input type="radio" value="rem" name="a" checked={brComp.style.a.unit[2].checked} onChange={unitFunc} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="b" onChange={radiusUseFunc} checked={brComp.style.b.check} />B<br />
                <input type="range" name="b" value={brComp.style.b.size} onChange={sizeFunc} />
                <div>{brComp.style.b.size}</div>
                <div>
                    <input type="radio" value="px" name="b" checked={brComp.style.b.unit[0].checked} onChange={unitFunc} />px
                    <input type="radio" value="%" name="b" checked={brComp.style.b.unit[1].checked} onChange={unitFunc} />%
                    <input type="radio" value="rem" name="b" checked={brComp.style.b.unit[2].checked} onChange={unitFunc} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="c" onChange={radiusUseFunc} checked={brComp.style.c.check} />C<br />
                <input type="range" name="c" value={brComp.style.c.size} onChange={sizeFunc} />
                <div>{brComp.style.c.size}</div>
                <div>
                    <input type="radio" value="px" name="c" checked={brComp.style.c.unit[0].checked} onChange={unitFunc} />px
                    <input type="radio" value="%" name="c" checked={brComp.style.c.unit[1].checked} onChange={unitFunc} />%
                    <input type="radio" value="rem" name="c" checked={brComp.style.c.unit[2].checked} onChange={unitFunc} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="d" onChange={radiusUseFunc} checked={brComp.style.d.check} />D<br />
                <input type="range" name="d" value={brComp.style.d.size} onChange={sizeFunc} />
                <div>{brComp.style.d.size}</div>
                <div>
                    <input type="radio" value="px" name="d" checked={brComp.style.d.unit[0].checked} onChange={unitFunc} />px
                    <input type="radio" value="%" name="d" checked={brComp.style.d.unit[1].checked} onChange={unitFunc} />%
                    <input type="radio" value="rem" name="d" checked={brComp.style.d.unit[2].checked} onChange={unitFunc} />rem
                </div>
            </div>
        </div>
    )
}