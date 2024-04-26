import React from 'react';

const Widget = ({ children, width, mobileWidth, height }) => {
    return (
        <div className={`w-${mobileWidth} md:w-${width} h-${height} flex items-center justify-center`}>
            {children}
        </div>
    );
};

export default Widget;