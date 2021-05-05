//CSS抽出
export function Cascade(props) {
    const style = {
        width: '20em',
        height: '10em',
    }
    const bg = 'background:' + props.cascade.bgcolor;
    const pd = 'padding:' + props.cascade.padding + 'px';
    const text =
        `.preview{
    ${bg};
    ${props.cascade.padding === '0' ? '' : pd+';'}
}`
    return (
        <div>
            <textarea style={style} value={text} readOnly></textarea>
        </div>
    )
}