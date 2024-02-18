import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import images from '../../assets/images';

const Avatar = forwardRef(({ src, alt, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    useEffect(() => {
        // Set the fallback to the default image if src is falsy
        setFallback(src || images.noAvatar);
    }, [src]);

    const handleError = () => {
        setFallback(images.noAvatar);
    };

    return (
        <img
            ref={ref}
            src={fallback}
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
