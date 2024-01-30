import React from 'react';
import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Button from '../Button/Button';

const cx = classNames.bind(styles);

export default function Dropdown({ children }) {
    return (
        <Button
            className={cx('dropdownStyle')}
            outline
            rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
        >
            {children}
        </Button>
    );
}
