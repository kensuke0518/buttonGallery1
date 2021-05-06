import { useState, useCallback, useContext } from 'react';
import { Sheet } from '../Integrate';

//角丸
//https://coliss.com/articles/build-websites/operation/css/css-border-radius-can-do-that.html
export function BorderRadius() {
    //CSSレデューサーを取得
    const [styleState, setStyleDispatch] = useContext(Sheet);
    
    const style = {
        background: '#24c7f0',
        padding: '2em'
    }

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
        setState({
            ...state,
            horizonVertical: e.target.checked
        })
    }

    //各頂点を使うかどうか
    const radiusUseFunc = e => {
        //チェックされた要素がaかbかを判断する
        const targetValue = e.target.value;
        setState({
            ...state,
            style: {
                ...state.style,
                [targetValue]: {
                    ...state.style[targetValue],
                    check: e.target.checked
                }
            }
        })
        brCSS();
    }

    //サイズの調整
    const sizeFunc = e => {
        const targetValue = e.target.name;
        setState({
            ...state,
            style: {
                ...state.style,
                [targetValue]: {
                    ...state.style[targetValue],
                    size: e.target.value
                }
            }
        })
        brCSS();
    }

    //単位の設定
    const unitFunc = e => {
        const targetValue = e.target.name;
        setState({
            ...state,
            style: {
                ...state.style,
                [targetValue]: {
                    ...state.style[targetValue],
                    unit: e.target.value
                }
            }
        })
        brCSS();
    }

    //最終的なCSSの抽出
    const brCSS = () => {
        const obj = {}
        const stateStyles = state.style;
        let brValue = '';
        for (let i in stateStyles) {
            if (stateStyles[i].check === true) {
                brValue = `${brValue} ${stateStyles[i].size}${stateStyles[i].unit}`
            }
        }
        obj['borderRadius'] = brValue;
        setStyleDispatch({ type: 'br', value: obj })
    }
    return (
        <div style={style}>
            <div>
                <input type="checkbox" onClick={horizonVerticalFunc} />「水平半径/垂直半径」を使用する。
            </div>
            <div>
                <input type="checkbox" value="a" onChange={radiusUseFunc} defaultChecked />A<br />
                <input type="range" name="a" onChange={sizeFunc} />
                <div>{state.style.a.size}</div>
                <div>
                    <input type="radio" value="px" name="a" onChange={unitFunc} defaultChecked />px
                    <input type="radio" value="%" name="a" onChange={unitFunc} />%
                    <input type="radio" value="rem" name="a" onChange={unitFunc} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="b" onChange={radiusUseFunc} />B<br />
                <input type="range" name="b" onChange={sizeFunc} />
                <div>{state.style.b.size}</div>
                <div>
                    <input type="radio" value="px" name="b" onChange={unitFunc} defaultChecked />px
                    <input type="radio" value="%" name="b" onChange={unitFunc} />%
                    <input type="radio" value="rem" name="b" onChange={unitFunc} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="c" onChange={radiusUseFunc} />C<br />
                <input type="range" name="c" onChange={sizeFunc} />
                <div>{state.style.c.size}</div>
                <div>
                    <input type="radio" value="px" name="c" onChange={unitFunc} defaultChecked />px
                    <input type="radio" value="%" name="c" onChange={unitFunc} />%
                    <input type="radio" value="rem" name="c" onChange={unitFunc} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="d" onChange={radiusUseFunc} />D<br />
                <input type="range" name="d" onChange={sizeFunc} />
                <div>{state.style.d.size}</div>
                <div>
                    <input type="radio" value="px" name="d" onChange={unitFunc} defaultChecked />px
                    <input type="radio" value="%" name="d" onChange={unitFunc} />%
                    <input type="radio" value="rem" name="d" onChange={unitFunc} />rem
                </div>
            </div>
        </div>
    )
}



