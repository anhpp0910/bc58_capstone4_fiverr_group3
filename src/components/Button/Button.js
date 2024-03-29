import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    round = false,
    danger = false,
    text = false,
    disabled = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = NavLink;
    } else if (href) {
        props.to = href;
        Comp = 'a';
    }

    const location = useLocation();
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        round,
        danger,
        text,
        disabled,
        active: to && location.pathname === to, // Check if the route matches
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    round: PropTypes.bool,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;
