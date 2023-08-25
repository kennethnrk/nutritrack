import React from 'react';

function Formlabel({text}) {
    return (
        <label style={styles.label}>
            {text}
        </label>
    );
}

const styles = {
    label: {
        fontSize: '5vh',
        color:'#fec600',
        fontFamily:'Roboto',
}
}
export default Formlabel;
