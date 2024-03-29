import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import images from '../../assets/images';

const Avatar = forwardRef(({ src, alt, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    useEffect(() => {
        setFallback(src || images.noAvatar);
    }, [src]);

    const handleError = () => {
        setFallback(images.noAvatar);
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

Avatar.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};

export default Avatar;
