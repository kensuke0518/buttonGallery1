function border(bdStyle) {
    const obj = {}
    if (bdStyle.check.length === 4) {
        obj['border'] = `${bdStyle.size}px solid ${bdStyle.color}`
    }
    else if (0 < bdStyle.check.length < 4) {
        bdStyle.check.map(tblr => {
            const newTblr = tblr.charAt(0).toUpperCase() + tblr.slice(1);
            obj['border' + newTblr] = `${bdStyle.size}px solid ${bdStyle.color}`
        })
    }
    return obj;
}

export function Preview(props) {
    const styleState = props.style;

    const style = {
        display: 'inline-block',
        padding: styleState.padding + 'px',
        background: styleState.bgcolor,
        ...border(styleState.border),
        color: '#fff',
        textDecoration: 'none',
    }
    console.log(style)
    const stopLink = e => {
        e.preventDefault();
    }
    /*
    useEffect(() => {
        console.log(style)
    })
    */
    return (
        <a href="" onClick={stopLink} className="preview" style={style}>{props.style.character}</a>
    )
}