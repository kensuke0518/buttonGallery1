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
    const buttonStyle = 'display:block;\ntext-align:center;\ntext-decoration:none;\n'
    for (let p in newStyle) {
        if (newStyle[p].css !== undefined) {
            chara = chara + newStyle[p].css;
        }
    }
    chara = chara + buttonStyle;

    const text = '.preview{\n' + chara + '}';
    const html = '<a href="#" class="preview">' + styleState.character.character + '</a>'

    return (
        <div className="c-cascade">
            <p style={styleState.componentStyle.heading.a}>下のコードをコピーして貼り付けてください</p>
            <div>
                <textarea style={areaStyle} value={text} readOnly></textarea>
            </div>
            <div>
                <textarea style={areaStyle} value={html} readOnly></textarea>
            </div>
        </div>
    )
}