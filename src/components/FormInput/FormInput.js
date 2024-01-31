import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormInput.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function FormInput({
    labelIcon,
    id,
    type,
    setEyeIcon,
    errorMessage,
    onChange,
    handleValidation,
    ...passProps
}) {
    const props = {
        ...passProps,
    };
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
                    {...props}
                    type={setEyeIcon ? typeForPW : type}
                    onChange={onChange}
                    onBlur={handleValidation}
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

FormInput.propTypes = {
    labelIcon: PropTypes.object,
    id: PropTypes.number,
    type: PropTypes.string,
    setEyeIcon: PropTypes.bool,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func,
    handleValidation: PropTypes.func,
};

export default FormInput;
