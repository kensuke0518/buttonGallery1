import { useState, useEffect, useReducer } from 'react';
import { Character } from './blocks/Character';
import { BgColor } from './blocks/BgColor';
import { Padding } from './blocks/Padding';
import { Border } from './blocks/Border';
import { BorderRadius } from './blocks/BorderRadius';
import { Preview } from './Preview';
import { Cascade } from './Cascade';

//レデューサー
const reducer = (state, action) => {
    switch (action.type) {
        case 'bg':
            return {
                ...state,
                bgcolor:action.event.target.value
            }
        case 'pd':
            return {
                ...state,
                padding: action.event.target.value
            }
        case 'chara':
            return {
                ...state,
                character: action.event.target.value
            }
        case 'bdCheck':
            //ボーダーの方向
            const [...check] = state.border.check;
            const num = check.indexOf(action.event.target.value);
            if (num === -1) {
                check.push(action.event.target.value)
            }
            else{
                check.splice(num, 1)
            }
            return {
                ...state,
                border: {
                    ...state.border,
                    check: check,
                }
            }
        case 'bdSize':
            return {
                ...state,
                border: {
                    ...state.border,
                    size: action.event.target.value,
                }
            }
        case 'bdColor':
            return {
                ...state,
                border: {
                    ...state.border,
                    color: action.event.target.value,
                }
            }
    }
}

//ステートと統合
export function Integrate() {
    const [state, dispatch] = useReducer(reducer, {
        character: '送信',
        bgcolor: '#000000',
        padding: '10',
        border:{
            check: ['left'],
            size: '3',
            color: '#ff0000',
        },
    })
    return (
        <>
            <Preview style={state} />
            <Character character={ state.character } doAction={e => dispatch({ type: 'chara', event: e }) } />
            <BgColor bgcolor={state.bgcolor} doAction={e=>dispatch({type:'bg',event:e})} />
            <Padding padding={state.padding} doAction={e => dispatch({ type: 'pd', event: e })} />
            <Border border={state.border} doColorAction={e => dispatch({ type: 'bdColor', event: e })} doSizeAction={e => dispatch({ type: 'bdSize', event: e })} doAction={e => dispatch({ type: 'bdCheck', event: e })} />
            <BorderRadius />
            <Cascade cascade={state} />
        </>
    )
}