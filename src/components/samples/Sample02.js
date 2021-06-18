import { useContext } from 'react';
import { init } from '../Integrate';
import { Sheet } from '../Integrate';
import { sampleValidFunc } from './Sample';

//サンプルデータのCSS in JS
const style = {
    width: '150px',
    background: '#e4f500',
    padding: '10px 5px',
    borderLeft: '3px solid #Df00fE',
    borderRight: '3px solid #Df00fE',
    color: '#666',
    textAlign:'center',
    textDecoration: 'none',
    display:'block'
}


export const Sample02 = () => {
    const [, setStyleDispatch] = useContext(Sheet);
    const defaultData = init()

    const selectSampleFunc = () => {
        sampleValidFunc(defaultData, style)
        setStyleDispatch({ type: 'sample', value: defaultData });
    }

    return (
        <div className="c-sample c-sample02">
            <a href="/" style={style}>サンプル02</a>
            <button onClick={selectSampleFunc} className="c-sample__button">このサンプルを選択する</button>
        </div>
    )
}