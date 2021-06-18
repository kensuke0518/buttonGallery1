import { useState, useContext } from 'react';
import { Sheet } from './Integrate';

export function Preview() {
    //ストアと繋ぐ
    const [styleState] = useContext(Sheet)

    //背景色のステート
    const [bgColorState, setBgColorState] = useState('#edfee3')

    //コンポーネントのスタイル
    const style = {
        background: bgColorState,
    }

    //ボタンのスタイルをストアから取得
    const newStyle = styleState.newStyle
    let buttonStyle = {
        display: 'block',
        textAlign: 'center',
        textDecoration: 'none',
    }
    for (let p in newStyle) {
        buttonStyle = {
            ...buttonStyle,
            ...newStyle[p].obj
        }
    }

    //背景色設定
    const bgColorFunc = e => {
        setBgColorState(e.target.value)
    }

    //イベントの停止
    const stopLink = e => e.preventDefault();

    return (
        <div className="c-preview">
            <div className="c-preview__box" style={style}>
                <a href="/" onClick={stopLink} className="preview" style={buttonStyle}>{styleState.character.character}</a>
            </div>
            <input type="color" defaultValue={bgColorState} onChange={ bgColorFunc }/>
        </div>
    )
}