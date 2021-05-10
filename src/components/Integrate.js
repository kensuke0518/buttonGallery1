import React,{ useReducer } from 'react';
import { Character } from './blocks/Character';
import { Width, wdState } from './blocks/Width';
import { Background, bgState } from './blocks/Background';
import { Padding, pdState } from './blocks/Padding';
import { Border, bdState } from './blocks/Border';
import { BorderRadius, brState } from './blocks/BorderRadius';
import { Preview } from './Preview';
import { Cascade } from './Cascade';
import { Sample } from './samples/Sample';
import './style.css';

export const Sheet = React.createContext()

//新しいスタイル:newStyle
export const newStyle = {
    width: {
        obj: {}, //Preview用
        css: '', //Cascade用
        comp: wdState, //コンポーネントの値 + Sample用
    },
    background: {
        obj: {}, //Preview用
        css: '', //Cascade用
        comp: bgState, //コンポーネントの値 + Sample用
    },
    padding: {
        obj: {}, //Preview用
        css: '', //Cascade用
        comp: pdState, //コンポーネントの値 + Sample用
    },
    border: { //複数borderが指定されたオブジェクトが渡される。
        obj: {}, //Preview用
        css: '', //Cascade用
        comp: bdState, //コンポーネントの値 + Sample用
    },
    borderRadius: {
        obj: {}, //Preview用
        css: '', //Cascade用
        comp: brState, //コンポーネントの値 + Sample用
    },
    otherStyle: {
        obj: {}, //Preview用
        css: '', //Cascade用
        comp: {}, //コンポーネントの値 + Sample用
    }
}

//ステート
//ステートには「プロパティ名:{プロパティ:値,...}というオブジェクトを渡して、Preview.jsで展開する。
//作業開始前にまず何より「ステートの設計」を重視してやった方がいい。あとで全てのコンポーネントに支障が出る。
const initialState = {
    character: { character: '送信' },
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
        case 'bdChecked':
            return {

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
                <Background />
                <Padding />
                <Border />
                <BorderRadius />
            </div>
        </Sheet.Provider>
    )
}