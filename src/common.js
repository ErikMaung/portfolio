import React from 'react';

function money(num) {
    return ((Math.round(100.0 * num) / 100.0).toFixed(2)).toLocaleString("en-US");
}

export default money;