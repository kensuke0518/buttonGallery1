import { useState, useContext } from 'react';
import { Sheet } from './Integrate';

export function Preview() {
    //ストアと繋ぐ
    const [styleState] = useContext(Sheet)

    //背景色のステート
    const [bgColorState, setBgColorState] = useState('#edfee3')

    //コンポーネントのスタイル
    const style = {
        width: '500px',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #ddd',
        background: bgColorState,
    }

    //ボタンのスタイルをストアから取得
    const newStyle = styleState.newStyle
    const buttonStyle = {
        display: 'inline-block',
        textAlign: 'center',
        textDecoration: 'none',
        ...newStyle.width.obj,
        ...newStyle.border.obj,
        ...newStyle.borderRadius.obj,
        ...newStyle.padding.obj,
        ...newStyle.background.obj,
        ...newStyle.otherStyle.obj,
    }
    
    //背景色設定
    const bgColorFunc = e => {
        setBgColorState(e.target.value)
    }

    //イベントの停止
    const stopLink = e => e.preventDefault();

    return (
        <div>
            <div style={style}>
                <a href="#" onClick={stopLink} className="preview" style={buttonStyle}>{styleState.character.character}</a>
            </div>
            <input type="color" defaultValue={bgColorState} onChange={ bgColorFunc }/>
        </div>
    )
}