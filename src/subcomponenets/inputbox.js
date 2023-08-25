import React from 'react';

function Inputbox({type, className, placeholder, onChange, rows, value}) {
    return (
        <input
            type={type}
            className={className}
            placeholder={placeholder}
            style={styles.inputbx}
            onChange={onChange}
            rows={rows}
            value={value}
        />
    );
}

const styles = {
    inputbx:{
        fontSize:'3vh',
    }
}

export default Inputbox;
