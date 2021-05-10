import { useContext } from 'react';
import { init } from '../Integrate';
import { Sheet } from '../Integrate';

const defaultData = init()
console.log(defaultData)


export const Sample01 = () => {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    //サンプルデータのCSS in JS
    const style = {
        background: '#2c51db',
        padding: '40px',
        borderRadius:'20px 20px',
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
            case 'background':
                //オブジェクト
                object = { [prop]: style[prop] }
                //スタイルシート
                cascade = `${prop}: ${style[prop]};\n`
                //コンポーネントで使用する値
                component = { bgcolor: style[prop] }
                //追加
                simple(object, cascade, component)
                break;

            case 'padding':
                //オブジェクト
                object = { [prop]: style[prop] }
                //スタイルシート
                cascade = `${prop}: ${style[prop]};\n`
                //コンポーネントで使用する値
                const size = style[prop].replace(/px/g, '');
                const unit = style[prop].replace(/\d/g, '');
                component = {
                    size,
                    unit
                }
                //追加
                simple(object, cascade, component)
                break;

            case 'borderRadius':
                //オブジェクト
                object = { [prop]: style[prop] }
                //スタイルシート
                cascade = `${prop}: ${style[prop]};\n`
                //コンポーネントで使用する値
                //追加
                simple(object, cascade, component)
                break;

            default:
                break;
        }
    }

    const sampleData = {
        background: {
            obj: { background: '#2c51db' },
            css: 'background:#2c51db;\n',
            comp: { bgcolor: '#2c51db' }
        },
        padding: {
            obj: { padding: '40px' },
            css: 'padding:40px;\n',
            comp: {
                size: '40',
                unit: 'px',
            }
        },
        borderRadius: {
            obj: {},
            css: '',
            comp: {
                horizonVertical: false,
                style: {
                    a: {
                        check: false,
                        size: '0',
                        unit: [
                            { value: 'px', checked: true },
                            { value: '%', checked: false },
                            { value: 'rem', checked: false },
                        ]
                    },
                    b: {
                        check: false,
                        size: '0',
                        unit: [
                            { value: 'px', checked: true },
                            { value: '%', checked: false },
                            { value: 'rem', checked: false },
                        ]
                    },
                    c: {
                        check: false,
                        size: '0',
                        unit: [
                            { value: 'px', checked: true },
                            { value: '%', checked: false },
                            { value: 'rem', checked: false },
                        ]
                    },
                    d: {
                        check: false,
                        size: '0',
                        unit: [
                            { value: 'px', checked: true },
                            { value: '%', checked: false },
                            { value: 'rem', checked: false },
                        ]
                    },
                },
                sampling:true
            }
        },
        otherStyle: {
            obj: {
                color: '#f00',
                textShadow: '#FC0 1px 0 10px',
            },
            css: 'color:#f00;\ntext-shadow:#FC0 1px 0 10px;\n'
        }
    }

    const selectSampleFunc = () => {
        setStyleDispatch({ type: 'sample', value: sampleData });
    }

    return (
        <div>
            <a>サンプル01</a>
            <button onClick={selectSampleFunc}>このサンプルを選択する</button>
        </div>
    )
}