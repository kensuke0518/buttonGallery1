import React,{ useReducer } from 'react';
import { Character, chState } from './blocks/Character';
import { Width, wdState } from './blocks/Width';
import { Color, crState } from './blocks/Color';
import { Background, bgState } from './blocks/Background';
import { Padding, pdState } from './blocks/Padding';
import { Border, bdState } from './blocks/Border';
import { BorderRadius, brState } from './blocks/BorderRadius';
import { Preview } from './Preview';
import { Cascade } from './Cascade';
import { Sample } from './samples/Sample';
import './style.css';

export const Sheet = React.createContext()

//下記関数はexport const にするとSampleで呼び出す際にエラーになる。理由を調べておく
export function init() {
    const states = [wdState, crState, bgState, pdState, bdState, brState];
    const stateObj = {};
    states.map(data => {
        stateObj[data.property] = {
            obj: {}, //Preview用
            css: '', //Cascade用
            comp: data.value, //コンポーネントの値 + Sample用
        }
    })
    stateObj['otherStyle'] = {
            obj: { },
            css: '',
            comp: { },
    }
    return stateObj;
}
//新しいスタイル:newStyle
export const newStyle = init();

//ステート
//ステートには「プロパティ名:{プロパティ:値,...}というオブジェクトを渡して、Preview.jsで展開する。
//作業開始前にまず何より「ステートの設計」を重視してやった方がいい。あとで全てのコンポーネントに支障が出る。
const initialState = {
    character: chState,
    newStyle,
    componentStyle: {
        heading: {
            a: {
                borderLeft: '4px solid #58d510',
                background: '#fff',
                paddingLeft: '.5em'
            }
        }
    }
}

//レデューサー（CSSの取得のみにしたい）
const reducer = (state, action) => {
    switch (action.type) {
        case 'br':
            return {
                ...state,
                newStyle: {
                    ...state.newStyle,
                    borderRadius: action.value
                }
            }
        case 'bd': 
            return {
                ...state,
                newStyle: {
                    ...state.newStyle,
                    border:action.value
                }
            }
        case 'wd':
            return {
                ...state,
                newStyle: {
                    ...state.newStyle,
                    width: action.value
                }
            }
        case 'pd':
            return {
                ...state,
                newStyle: {
                    ...state.newStyle,
                    padding: action.value
                }
            }
        case 'bg':
            return {
                ...state,
                newStyle: {
                    ...state.newStyle,
                    background: action.value
                }
            }
        case 'cr':
            return {
                ...state,
                newStyle: {
                    ...state.newStyle,
                    color: action.value
                }
            }
        case 'ch':
            return {
                ...state,
                character: action.value
            }
        case 'cu': 
            return {
                ...state,
                componentUnit: {
                    ...state.componentUnit,
                    ...action.value
                }
            }
        case 'sample':
            console.log(action.value)
            return {
                ...state,
                newStyle: {
                    ...state.newStyle,
                    ...action.value
                }
            }
        defalut:
            break;
    }
}

//ステートと統合
export function Integrate() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Sheet.Provider value={[state, dispatch]}>
            <Sample />
            <Preview />
            <Cascade />
            <div className="block">
                <Character />
                <Width />
                <Color />
                <Background />
                <Border />
                <Padding />
                <BorderRadius />
            </div>
        </Sheet.Provider>
    )
}
