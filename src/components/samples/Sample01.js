import { useContext } from 'react';
import { init } from '../Integrate';
import { Sheet } from '../Integrate';
import { sampleValidFunc } from './Sample';

//サンプルデータのCSS in JS
const style = {
    width: '200px',
    background: '#2c51db',
    padding: '40px 30px',
    borderRadius:'20px',
    border:'5px solid #ffffff',
    color: '#f00',
    boxShadow: '#FC0 10px 10px 10px',
    textAlign: 'center',
    display: 'block',
}


export const Sample01 = () => {
    const [styleState, setStyleDispatch] = useContext(Sheet);
    const defaultData = init()

    const selectSampleFunc = () => {
        sampleValidFunc(defaultData, style)
        setStyleDispatch({ type: 'sample', value: defaultData });
    }

    return (
        <div>
            
            <a href="#" style={style}>サンプル01</a>
            <button onClick={selectSampleFunc}>このサンプルを選択する</button>
        </div>
    )
}