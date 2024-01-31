import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './VideoModal.module.scss';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const cx = classNames.bind(styles);

function VideoModal({
    thumbnailImg,
    thumnailAlt,
    videoSrc,
    wholeScreen = false,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            padding: 0,
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const classes = cx('inner', {
        wholeScreen,
    });

    return (
        <div>
            <button className={cx('videoBtn')} onClick={openModal}>
                <img src={thumbnailImg} alt={thumnailAlt} />
            </button>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <video
                    className={classes}
                    src={videoSrc}
                    preload="auto"
                    autoplay=""
                ></video>
            </Modal>
        </div>
    );
}

VideoModal.propTypes = {
    thumbnailImg: PropTypes.string,
    thumnailAlt: PropTypes.string,
    videoSrc: PropTypes.string,
    wholeScreen: PropTypes.bool,
};

export default VideoModal;
