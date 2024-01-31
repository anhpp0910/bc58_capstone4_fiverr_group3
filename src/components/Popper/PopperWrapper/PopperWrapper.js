import React from 'react';
import classNames from 'classnames/bind';
import styles from './PopperWrapper.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function PopperWrapper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

PopperWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PopperWrapper;
