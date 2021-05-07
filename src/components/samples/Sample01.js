import { useContext } from 'react';
import { Sheet } from '../Integrate';

export const Sample01 = () => {
    const [styleState, setStyleDispatch] = useContext(Sheet);

    const sampleData = {
        background: {
            obj: { background: '#2c51db' },
            css: 'background:#2c51db',
        },
        otherStyle: {
            obj: {
                color: '#f00',
                textShadow: '#FC0 1px 0 10px',
            },
            color: 'color:#f00;\ntext-shadow:#FC0 1px 0 10px;\n'
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