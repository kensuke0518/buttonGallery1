import { useContext } from 'react';
import { Sheet } from './Integrate';


//CSS抽出
export function Cascade() {
    const [styleState] = useContext(Sheet)

    const newStyle = styleState.newStyle;

    const areaStyle = {
        width: '20em',
        height: '10em',
    }

    let chara = '';
    for (let p in newStyle) {
        if (newStyle[p].css !== undefined) {
            chara = chara + newStyle[p].css;
        }
    }

    const text = '.preview{\n' + chara + '}';
    const html = '<a href="#" class="preview">' + styleState.character.character + '</a>'

    return (
        <div>
            <p style={styleState.componentStyle.heading.a}>下のコードをコピーして貼り付けてください</p>
            <textarea style={areaStyle} value={text} readOnly></textarea>
            <textarea style={areaStyle} value={html} readOnly></textarea>
        </div>
    )
}