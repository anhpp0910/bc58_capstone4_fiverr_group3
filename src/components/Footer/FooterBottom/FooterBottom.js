import React from 'react';
import classNames from 'classnames/bind';
import styles from './FooterBottom.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faPinterest,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faPerson } from '@fortawesome/free-solid-svg-icons';

import images from '../../../assets/images';
import Button from '../../Button/Button';

const cx = classNames.bind(styles);

export default function FooterBottom() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <img src={images.logoFooter} alt="fiverr" />
                    <span>© Fiverr International Ltd. 2024</span>
                </div>
                <div className={cx('right')}>
                    <div className={cx('socials')}>
                        <Button className={cx('socialIcon')} text>
                            <FontAwesomeIcon icon={faTwitter} />
                        </Button>
                        <Button className={cx('socialIcon')} text>
                            <FontAwesomeIcon icon={faFacebook} />
                        </Button>
                        <Button className={cx('socialIcon')} text>
                            <FontAwesomeIcon icon={faLinkedin} />
                        </Button>
                        <Button className={cx('socialIcon')} text>
                            <FontAwesomeIcon icon={faPinterest} />
                        </Button>
                        <Button className={cx('socialIcon')} text>
                            <FontAwesomeIcon icon={faInstagram} />
                        </Button>
                    </div>
                    <div className={cx('settings')}>
                        <Button
                            text
                            leftIcon={<FontAwesomeIcon icon={faGlobe} />}
                        >
                            English
                        </Button>
                        <Button text>US$ USD</Button>
                        <Button
                            className={cx('personIcon')}
                            text
                            leftIcon={<FontAwesomeIcon icon={faPerson} />}
                        ></Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
