import { useContext } from 'react';
import { init } from '../Integrate';
import { Sheet } from '../Integrate';

const defaultData = init()

export const Sample01 = () => {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    //サンプルデータのCSS in JS
    const style = {
        width: '200px',
        background: '#2c51db',
        padding: '40px 30px',
        borderRadius:'20px 20px 0 0',
        border: '1px solid #000000',
        color: '#f00',
        textShadow: '#FC0 1px 0 10px',
    }

    //変数styleをステートへ送信できる形にする
    for (let prop in style) {
        //変数
        let object, cascade, component;
        //関数
        const simple = (object, cascade, component) => {
            defaultData[prop].obj = object;
            defaultData[prop].css = cascade
            defaultData[prop].comp = component
        }
        //各プロパティのステートを抽出。
        switch (prop) {
            case 'width': {
                //オブジェクト
                object = { [prop]: style[prop] }
                //スタイルシート
                cascade = `${prop}: ${style[prop]};\n`
                //コンポーネントで使用する値
                component = { width: style[prop] }
                //追加
                simple(object, cascade, component)
                break;
            }

            case 'border' || 'border-top' || 'border-bottom' || 'border-left' || 'border-right': {
                //オブジェクト
                if (prop === 'border') {
                    object = { [prop]: style[prop] }
                }
                //スタイルシート
                cascade = `${prop}: ${style[prop]};\n`
                //コンポーネントで使用する値
                component = {},
                component['size'],
                component['color'],
                component['size'],

                //追加
                simple(object, cascade, component)
                break;
            }

            case 'background': {
                //オブジェクト
                object = { [prop]: style[prop] }
                //スタイルシート
                cascade = `${prop}: ${style[prop]};\n`
                //コンポーネントで使用する値
                component = { bgcolor: style[prop] }
                //追加
                simple(object, cascade, component)
                break;
            }

            case 'color': {
                //オブジェクト
                object = { [prop]: style[prop] }
                //スタイルシート
                cascade = `${prop}: ${style[prop]};\n`
                //コンポーネントで使用する値
                component = { color: style[prop] }
                //追加
                simple(object, cascade, component)
                break;
            }

            case 'padding': {
                //オブジェクト
                object = { [prop]: style[prop] }
                //スタイルシート
                cascade = `${prop}: ${style[prop]};\n`
                //コンポーネントで使用する値
                component = {};
                component['style'] = {};
                const abcd = ['top', 'right', 'bottom', 'left',]
                let am = style[prop].split(' ');
                switch (am.length) {
                    case 1: 
                        for (let i = 0; i < 3; i++) {
                            am.push(am[0])
                        }
                        break;
                    case 2:
                        am.push(am[0])
                        am.push(am[1])
                        break;
                    case 3:
                        am.push(am[1])
                        break;
                    default:
                        break;
                }
                for (let i = 0; i < am.length; i++) {
                    component['style'][abcd[i]] = {}
                    let size = am[i].replace(/(\d+).*/g, '$1')
                    let unitCharacter = am[i].replace(/\d+(.*)/g, '$1')
                    const bbb = ['px', '%', 'rem']
                    let unit = [];
                    let checked;
                    for (let j = 0; j < bbb.length; j++) {
                        let ddd;
                        if (size === '0') {
                            unit = [
                                { value: 'px', checked: true },
                                { value: '%', checked: false },
                                { value: 'rem', checked: false },
                            ]
                            checked = false;
                            break;
                        }
                        if (bbb[j] === unitCharacter) {
                            ddd = { value: unitCharacter, checked: true }
                            unit.push(ddd);
                        }
                        else {
                            ddd = { value: bbb[j], checked: false }
                            unit.push(ddd);
                        }
                        checked = true;
                    }

                    const add = {
                        checked,
                        size,
                        unit,
                    }

                    component['style'][abcd[i]] = add
                }
                component['sampling'] = true;

                console.log(component)
                //追加
                simple(object, cascade, component)
                break;
            }

            case 'borderRadius': {
                object = { [prop]: style[prop] }
                //スタイルシート
                let propLower = prop.replace(/(\u)/g, '-$1').toLowerCase();
                cascade = `${propLower}: ${style[prop]};\n`
                //コンポーネントで使用する値
                component = {};
                component['style'] = {};
                const abcd = ['a', 'b', 'c', 'd',]
                let am = style[prop].split(' ');
                for (let i = 0; i < am.length; i++) {
                    component['style'][abcd[i]] = {}
                    let size = am[i].replace(/(\d+).*/g, '$1')
                    let unitCharacter = am[i].replace(/\d+(.*)/g, '$1')
                    const bbb = ['px', '%', 'rem']
                    let unit = [];
                    let checked;
                    for (let j = 0; j < bbb.length; j++) {
                        let ddd;
                        if (size === '0') {
                            unit = [
                                { value: 'px', checked: true },
                                { value: '%', checked: false },
                                { value: 'rem', checked: false },
                            ]
                            checked = false;
                            break;
                        }
                        if (bbb[j] === unitCharacter) {
                            ddd = { value: unitCharacter, checked: true }
                            unit.push(ddd);
                        }
                        else {
                            ddd = { value: bbb[j], checked: false }
                            unit.push(ddd);
                        }
                        checked = true;
                    }

                    const add = {
                        checked,
                        size,
                        unit,
                    }

                    component['style'][abcd[i]] = add
                }
                component['sampling'] = true;
                component['horizonVertical'] = false;
                //追加
                simple(object, cascade, component)
                break;
            }

            default: {
                //オブジェクトで示す
                defaultData['otherStyle'].obj = {
                    ...defaultData['otherStyle'].obj,
                    prop: style[prop]
                };
                //スタイルで示す
                let propLower = prop.replace(/(\u)/g, '-$1').toLowerCase();
                defaultData['otherStyle'].css = `${defaultData['otherStyle'].css}`+`${propLower}:${style[prop]};\n`;
                //各項目
                defaultData['otherStyle'].comp = {
                    ...defaultData['otherStyle'].comp,
                    prop: style[prop]
                }
                break;
            }
        }
    }
    console.log(defaultData)

    const selectSampleFunc = () => {
        setStyleDispatch({ type: 'sample', value: defaultData });
    }

    return (
        <div>
            <a>サンプル01</a>
            <button onClick={selectSampleFunc}>このサンプルを選択する</button>
        </div>
    )
}