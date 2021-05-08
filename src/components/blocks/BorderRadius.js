import { useState, useContext, useEffect } from 'react';
import { Sheet } from '../Integrate';

//角丸
//https://coliss.com/articles/build-websites/operation/css/css-border-radius-can-do-that.html
export function BorderRadius() {
    //CSSレデューサーを取得
    const [styleState, setStyleDispatch] = useContext(Sheet);
    
    const [state, setState] = useState({
        horizonVertical: false,
        style: {
            a: {
                check: true,
                size: '50',
                unit: 'px',
            },
            b: {
                check: false,
                size: '25',
                unit: 'px',
            },
            c: {
                check: false,
                size: '25',
                unit: 'px',
            },
            d: {
                check: false,
                size: '25',
                unit: 'px',
            },
        }
    })

    //水平垂直
    const horizonVerticalFunc = e => {
        const newState = {
            ...state,
            horizonVertical: e.target.checked
        }
        setState({
            ...newState,
        })
    }

    //各頂点を使うかどうか
    const radiusUseFunc = e => {
        //チェックされた要素がaかbかを判断する
        const targetValue = e.target.value;
        const newState = {
            ...state,
            style: {
                ...state.style,
                [targetValue]: {
                    ...state.style[targetValue],
                    check: e.target.checked
                }
            }
        }
        setState({
            ...newState,
        })
        brCSS(newState);
    }

    //サイズの調整
    const sizeFunc = e => {
        const targetValue = e.target.name;
        const newState = {
            ...state,
            style: {
                ...state.style,
                [targetValue]: {
                    ...state.style[targetValue],
                    size: e.target.value
                }
            }
        }
        setState({
            ...newState,
        })
        brCSS(newState);
    }

    //単位の設定
    const unitFunc = e => {
        const targetValue = e.target.name;
        const newState = {
            ...state,
            style: {
                ...state.style,
                [targetValue]: {
                    ...state.style[targetValue],
                    unit: e.target.value
                }
            }
        }
        setState({
            ...newState,
        })
        brCSS(newState);
    }

    //最終的なCSSの抽出
    const brCSS = (newState = state) => {
        const obj = {}
        const stateStyles = newState.style;
        let brValue = '';
        for (let i in stateStyles) {
            if (stateStyles[i].check === true) {
                brValue = `${brValue} ${stateStyles[i].size}${stateStyles[i].unit}`
            }
        }
        obj['borderRadius'] = brValue;

        //CSSで示す
        let css = 'border-radius:';
        for (let property in obj) {
            css = css + obj[property];
        }
        css = `${css};\n`

        //各項目のステートをレデューサーへ送る準備を示す
        const comp = { ...newState }

        //ストアへ渡す形を作る
        const value = {
            obj,
            css,
            comp,
        }

        setStyleDispatch({ type: 'br', value })
    }

    useEffect(() => { brCSS() }, [])

    const brValue = styleState.newStyle.borderRadius.comp;
    let dispBrValue;
    Object.keys(brValue).length === 0 ? dispBrValue = state : dispBrValue = brValue;

    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>角丸</p>
            <div>
                <input type="checkbox" onClick={horizonVerticalFunc} />「水平半径/垂直半径」を使用する。
            </div>
            <div>
                <input type="checkbox" value="a" onChange={radiusUseFunc} defaultChecked />A<br />
                <input type="range" name="a" onChange={sizeFunc} />
                <div>{dispBrValue.style.a.size}</div>
                <div>
                    <input type="radio" value="px" name="a" onChange={unitFunc} defaultChecked />px
                    <input type="radio" value="%" name="a" onChange={unitFunc} />%
                    <input type="radio" value="rem" name="a" onChange={unitFunc} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="b" onChange={radiusUseFunc} />B<br />
                <input type="range" name="b" onChange={sizeFunc} />
                <div>{dispBrValue.style.b.size}</div>
                <div>
                    <input type="radio" value="px" name="b" onChange={unitFunc} defaultChecked />px
                    <input type="radio" value="%" name="b" onChange={unitFunc} />%
                    <input type="radio" value="rem" name="b" onChange={unitFunc} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="c" onChange={radiusUseFunc} />C<br />
                <input type="range" name="c" onChange={sizeFunc} />
                <div>{dispBrValue.style.c.size}</div>
                <div>
                    <input type="radio" value="px" name="c" onChange={unitFunc} defaultChecked />px
                    <input type="radio" value="%" name="c" onChange={unitFunc} />%
                    <input type="radio" value="rem" name="c" onChange={unitFunc} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="d" onChange={radiusUseFunc} />D<br />
                <input type="range" name="d" onChange={sizeFunc} />
                <div>{dispBrValue.style.d.size}</div>
                <div>
                    <input type="radio" value="px" name="d" onChange={unitFunc} defaultChecked />px
                    <input type="radio" value="%" name="d" onChange={unitFunc} />%
                    <input type="radio" value="rem" name="d" onChange={unitFunc} />rem
                </div>
            </div>
        </div>
    )
}