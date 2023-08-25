import React from 'react';

function Thebutton(props) {
    return (
        <button type="button" className="btn btn-lg" style={{
            background: '#6f61c0',
            color: '#fff',
            width: '100%',
            fontFamily: 'Exo',
            fontWeight: 'Bold',
            ...props.style
        }}
                onClick={props.onClick}
        >{props.text}</button>

    );
}

export default Thebutton;
