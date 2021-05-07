import React,{ useState, useEffect, useReducer } from 'react';
import { Character } from './blocks/Character';
import { Background } from './blocks/Background';
import { Padding } from './blocks/Padding';
import { Border } from './blocks/Border';
import { BorderRadius } from './blocks/BorderRadius';
import { Preview } from './Preview';
import { Cascade } from './Cascade';

export const Sheet = React.createContext()

//ステート
//ステートには「プロパティ名:{プロパティ:値,...}というオブジェクトを渡して、Preview.jsで展開する。
//作業開始前にまず何より「ステートの設計」を重視してやった方がいい。あとで全てのコンポーネントに支障が出る。
const initialState = {
    character: {character:'送信'},
    background: {
        obj:{}, //Preview用
        css:'' //Cascade用
    },
    padding: {
        obj: {}, //Preview用
        css: '' //Cascade用
    },
    border: { //複数borderが指定されたオブジェクトが渡される。
        obj: {}, //Preview用
        css: '' //Cascade用
    },
    borderRadius: {
        obj: {}, //Preview用
        css: '' //Cascade用
    }
    
}

//レデューサー（CSSの取得のみにしたい）
const reducer = (state, action) => {
    switch (action.type) {
        case 'br': {
            return {
                ...state,
                borderRadius: action.value
            }
        }
        case 'bd': 
            return {
                ...state,
                border:action.value
            }
        case 'pd':
            return {
                ...state,
                padding: action.value
            }
        case 'bg':
            return {
                ...state,
                background:action.value
            }
        case 'ch':
            return {
                ...state,
                character: action.value
            }
    }
}

//ステートと統合
export function Integrate() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Sheet.Provider value={[state, dispatch]}>
            <BorderRadius />
            <Border />
            <Padding />
            <Background />
            <Character />
            <Preview />
            <Cascade />
        </Sheet.Provider>
    )
}