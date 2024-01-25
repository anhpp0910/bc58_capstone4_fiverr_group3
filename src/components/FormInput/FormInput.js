import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormInput.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function FormInput(props) {
    const {
        labelIcon,
        onChange,
        id,
        errorMessage,
        setEyeIcon,
        type,
        ...inputProps
    } = props;

    // Handle show/hide Password
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    let typeForPW = isEyeOpen ? 'text' : 'password';

    const handleToggle = () => {
        setIsEyeOpen(!isEyeOpen);
    };

    return (
        <div className={cx('formInput')}>
            <div className={cx('inputField')}>
                <label className={cx('labelIcon')}>
                    <FontAwesomeIcon icon={labelIcon} />
                </label>
                <input
                    {...inputProps}
                    type={setEyeIcon ? typeForPW : type}
                    onChange={onChange}
                />
                {setEyeIcon ? (
                    <div className={cx('eyeIcon')}>
                        {isEyeOpen === false ? (
                            <FontAwesomeIcon
                                icon={faEyeSlash}
                                onClick={handleToggle}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faEye}
                                onClick={handleToggle}
                            />
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className={cx('errorMessage')}>
                <span>{errorMessage}</span>
            </div>
        </div>
    );
}
