import { useState, useCallback, useContext } from 'react';
import { Sheet } from '../Integrate';

//角丸
//https://coliss.com/articles/build-websites/operation/css/css-border-radius-can-do-that.html
export function BorderRadius(props) {
    //CSSレデューサーを取得
    const [styleState, setStyleState] = useContext(Sheet);

    const style = {
        background: '#24c7f0',
        padding: '2em'
    }

    const [state, setState] = useState({
        borderRadius: {
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
        },
    })

    //水平垂直
    const doHV = e => {
        setState({
            ...state,
            borderRadius: {
                ...state.borderRadius,
                horizonVertical: e.target.checked
            }
        })
    }

    //各頂点を使うかどうか
    const doUse = e => {
        //チェックされた要素がaかbかを判断する
        const targetValue = e.target.value;
        setState({
            ...state,
            borderRadius: {
                ...state.borderRadius,
                style: {
                    ...state.borderRadius.style,
                    [targetValue]: {
                        ...state.borderRadius.style[targetValue],
                        check: e.target.checked
                    }
                }
            }
        })
    }

    //サイズの調整
    const doSize = e => {
        const targetValue = e.target.name;
        setState({
            ...state,
            borderRadius: {
                ...state.borderRadius,
                style: {
                    ...state.borderRadius.style,
                    [targetValue]: {
                        ...state.borderRadius.style[targetValue],
                        size: e.target.value
                    }
                }
            }
        })
    }

    //単位の設定
    const doRadio = e => {
        console.log(e.target.name)
        const targetValue = e.target.name;
        setState({
            ...state,
            borderRadius: {
                ...state.borderRadius,
                style: {
                    ...state.borderRadius.style,
                    [targetValue]: {
                        ...state.borderRadius.style[targetValue],
                        unit: e.target.value
                    }
                }
            }
        })
    }

    //最終的なCSSの抽出
    const borCSS = () => {
        const bbb = state.borderRadius.style;
        let ddd = '';
        for (const aaa in bbb) {
            if (bbb[aaa].check === true) {
                ddd = `${ddd} ${bbb[aaa].size}${bbb[aaa].unit}`
            }
        }
        return { borderRadius: ddd }
    }
    const boxStyle = {
        background: '#f00',
        padding: '2em',
        display: 'block',
        ...borCSS(),
    }
    return (
        <div style={style}>
            <div><a href="" className="preview" style={boxStyle}>あああ</a></div>
            <div>
                <input type="checkbox" onClick={doHV} />「水平半径/垂直半径」を使用する。
            </div>
            <div>
                <input type="checkbox" value="a" onChange={doUse} defaultChecked />A<br />
                <input type="range" name="a" onChange={doSize} />
                <div>{state.borderRadius.style.a.size}</div>
                <div>
                    <input type="radio" value="px" name="a" onChange={doRadio} defaultChecked />px
                    <input type="radio" value="%" name="a" onChange={doRadio} />%
                    <input type="radio" value="rem" name="a" onChange={doRadio} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="b" onChange={doUse} />B<br />
                <input type="range" name="b" onChange={doSize} />
                <div>{state.borderRadius.style.b.size}</div>
                <div>
                    <input type="radio" value="px" name="b" onChange={doRadio} defaultChecked />px
                    <input type="radio" value="%" name="b" onChange={doRadio} />%
                    <input type="radio" value="rem" name="b" onChange={doRadio} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="c" onChange={doUse} />C<br />
                <input type="range" name="c" onChange={doSize} />
                <div>{state.borderRadius.style.c.size}</div>
                <div>
                    <input type="radio" value="px" name="c" onChange={doRadio} defaultChecked />px
                    <input type="radio" value="%" name="c" onChange={doRadio} />%
                    <input type="radio" value="rem" name="c" onChange={doRadio} />rem
                </div>
            </div>
            <div>
                <input type="checkbox" value="d" onChange={doUse} />D<br />
                <input type="range" name="d" onChange={doSize} />
                <div>{state.borderRadius.style.d.size}</div>
                <div>
                    <input type="radio" value="px" name="d" onChange={doRadio} defaultChecked />px
                    <input type="radio" value="%" name="d" onChange={doRadio} />%
                    <input type="radio" value="rem" name="d" onChange={doRadio} />rem
                </div>
            </div>
        </div>
    )
}



