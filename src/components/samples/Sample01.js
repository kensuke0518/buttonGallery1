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
        borderRadius:'20px',
        border:'5px solid #ffffff',
        /*
        borderLeft: '1px solid #Df00fE',
        borderRight: '1px solid #Df00fE',
        */
        color: '#f00',
        boxShadow: '#FC0 10px 10px 10px',
        display: 'block',
    }

    let otherCSS = []
    let borderCSS = '';
    const borderCheck = [];
    //変数styleをステートへ送信できる形にする
    const sampleFunc = () => {
        for (let prop in style) {
            //変数
            let object, cascade, component;
            //関数
            const simple = (prop, object, cascade, component) => {
                defaultData[prop]['obj'] = object;
                defaultData[prop]['css'] = cascade
                defaultData[prop]['comp'] = component
            }
            //各プロパティのステートを抽出。
            switch (prop) {
                case 'width': {
                    //オブジェクト
                    object = { [prop]: style[prop] }
                    //スタイルシート
                    cascade = `${prop}: ${style[prop]};\n`
                    //コンポーネントで使用する値
                    let size = style[prop].replace(/(\d+).*/g, '$1')
                    let unit = style[prop].replace(/\d+(.*)/g, '$1')
                    component = {
                        size,
                        unit
                    }
                    //追加
                    simple(prop, object, cascade, component)
                    break;
                }

                case 'border':
                case 'borderTop':
                case 'borderBottom':
                case 'borderLeft':
                case 'borderRight': {
                    if (prop === 'border') {
                        //オブジェクト
                        object = { [prop]: style[prop] }
                        //スタイルシート
                        cascade = `${prop}: ${style[prop]};\n`
                        //コンポーネントで使用する値
                        const check = ['top', 'bottom', 'left', 'right'];
                        const size = style[prop].replace(/.*?(\d+?).*/g, '$1');
                        const color = style[prop].replace(/^.*(#[0-9a-zA-Z]*)/g, '$1');
                        component = {
                            ...component,
                            check,
                            size,
                            color
                        };
                        simple(prop, object, cascade, component)
                    }
                    else {
                        //オブジェクト
                        object = {
                            ...object,
                            [prop]: style[prop]
                        }
                        //スタイルシート
                        let propLower = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                        borderCSS = `${propLower}: ${style[prop]};\n`
                        console.log(borderCSS)
                        //コンポーネントで使用する値
                        const dir = prop.replace(/border(.+)/g, '$1').toLowerCase();
                        borderCheck.push(dir);
                        const size = style[prop].replace(/.*?(\d+?).*/g, '$1');
                        const color = style[prop].replace(/.*?(#[0-9a-zA-Z]+).*/g, '$1');
                        component = {
                            ...component,
                            check: borderCheck,
                            size,
                            color
                        };
                        //追加

                        defaultData['border'] = {
                            ...defaultData.border,
                            obj: {
                                ...defaultData.border.obj,
                                ...object
                            },
                            css: borderCSS,
                            comp: {
                                ...defaultData.border.comp,
                                ...component
                            },
                        };
                        console.log(defaultData)
                    }
                }
                    break;

                case 'background': {
                    //オブジェクト
                    object = { [prop]: style[prop] }
                    //スタイルシート
                    cascade = `${prop}: ${style[prop]};\n`
                    //コンポーネントで使用する値
                    if (style[prop].length < 6) {
                        const bgcolor = style[prop].replace(/#([0-9a-zA-Z])([0-9a-zA-Z])([0-9a-zA-Z])/g, '#$1$1$2$2$3$3')
                        component = { bgcolor }
                    }
                    else {
                        component = { bgcolor: style[prop] }
                    }
                    //追加
                    simple(prop, object, cascade, component)
                    break;
                }

                case 'color': {
                    //オブジェクト
                    object = { [prop]: style[prop] }
                    //スタイルシート
                    cascade = `${prop}: ${style[prop]};\n`
                    //コンポーネントで使用する値
                    if (style[prop].length < 6) {
                        const color = style[prop].replace(/#([0-9a-zA-Z])([0-9a-zA-Z])([0-9a-zA-Z])/g, '#$1$1$2$2$3$3')
                        component = { color }
                    }
                    else {
                        component = { bgcolor: style[prop] }
                    }
                    //追加
                    simple(prop, object, cascade, component)
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

                    //追加
                    simple(prop, object, cascade, component)
                    break;
                }

                case 'borderRadius': {
                    object = { [prop]: style[prop] }
                    //スタイルシート
                    let propLower = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
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
                        const bbb = ['px', '%', 'rem'];
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

                        //値が一つのみ割り当てられている場合
                        if (am.length === 1) {
                            for (let k = i + 1; k < abcd.length; k++){
                                component['style'][abcd[k]] = add
                            }
                            break;
                        }
                    }
                    component['sampling'] = true;
                    component['horizonVertical'] = false;
                    //追加
                    simple(prop, object, cascade, component)
                    break;
                }

                default: {
                    //オブジェクトで示す
                    defaultData['otherStyle'].obj = {
                        ...defaultData['otherStyle'].obj,
                        [prop]: style[prop]
                    };
                    //スタイルで示す
                    let propLower;
                    if (/[A-Z]/g.test(prop)) {
                        propLower = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                    }
                    else {
                        propLower = prop
                    }
                    otherCSS.push(`${propLower}:${style[prop]};\n`);
                    defaultData['otherStyle'].css = otherCSS.join('');
                    //各項目
                    defaultData['otherStyle'].comp = {
                        ...defaultData['otherStyle'].comp,
                        [prop]: style[prop]
                    }
                    break;
                }
            }
        }
    }

    const selectSampleFunc = () => {
        sampleFunc()
        setStyleDispatch({ type: 'sample', value: defaultData });
    }

    return (
        <div>
            <a>サンプル01</a>
            <button onClick={selectSampleFunc}>このサンプルを選択する</button>
        </div>
    )
}