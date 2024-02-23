import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import images from '../../assets/images';

const Image = forwardRef(({ src, alt, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    useEffect(() => {
        setFallback(src || images.noImage);
    }, [src]);

    const handleError = () => {
        setFallback(images.noImage);
    };

    return (
        <img
            ref={ref}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};

export default Image;
