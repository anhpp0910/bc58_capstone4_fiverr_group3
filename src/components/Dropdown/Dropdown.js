import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { PopperWrapper } from '../../components/Popper/Popper';

const cx = classNames.bind(styles);

export default function Dropdown({ children }) {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
        <div className={cx('wrapper')}>
            <Tippy
                interactive="true"
                placement="bottom-start"
                trigger="click"
                render={(attrs) => (
                    <PopperWrapper
                        style={{ display: showDropdown ? 'block' : 'none' }}
                        onClickOutside={() => {
                            setShowDropdown(!showDropdown);
                        }}
                    >
                        <div
                            className={cx('dropdownContent')}
                            tabIndex="-1"
                            {...attrs}
                        >
                            <NavLink className={cx('active')}>
                                All Categories
                            </NavLink>
                            <NavLink>
                                Web Programing <span>(20,566)</span>
                            </NavLink>
                            <NavLink>
                                Data Entry <span>(12,566)</span>
                            </NavLink>
                        </div>
                    </PopperWrapper>
                )}
            >
                <button className={cx('dropdownStyle')}>
                    {children}
                    <span>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                </button>
            </Tippy>
        </div>
    );
}
