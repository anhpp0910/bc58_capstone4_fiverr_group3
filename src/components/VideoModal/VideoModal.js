import React, { useState } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './VideoModal.module.scss';

const cx = classNames.bind(styles);

export default function VideoModal({
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
                <div className={classes}>
                    <video
                        src={videoSrc}
                        preload="auto"
                        autoplay=""
                        style={{ width: '100%', height: 'auto' }}
                    ></video>
                </div>
            </Modal>
        </div>
    );
}
