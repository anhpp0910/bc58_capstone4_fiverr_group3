import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { message, Rate } from 'antd';
import moment from 'moment';

import * as httpsRequest from '../../../../utils/request';
import Avatar from '../../../../components/Avatar/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import Button from '../../../../components/Button/Button';

const cx = classNames.bind(styles);

function Comments({ maCongViec }) {
    let user = useSelector((state) => state.userSlice.user);
    const [comments, setComments] = useState([]);
    const [noiDungBinhLuan, setNoiDungBinhLuan] = useState('');
    const [saoBinhLuan, setSaoBinhLuan] = useState(0);

    useEffect(() => {
        if (maCongViec) {
            getComments(maCongViec);
        }
    }, [maCongViec]);

    const getComments = () => {
        httpsRequest
            .get(`binh-luan/lay-binh-luan-theo-cong-viec/${maCongViec}`)
            .then((res) => setComments(res.content))
            .catch((err) => console.log(err));
    };

    const handleSubmit = () => {
        if (user) {
            let thongTinBinhLuan = {
                maCongViec: maCongViec,
                maNguoiBinhLuan: user.id,
                ngayBinhLuan: new Date(),
                noiDung: noiDungBinhLuan,
                saoBinhLuan: saoBinhLuan,
            };
            httpsRequest
                .post('binh-luan', thongTinBinhLuan)
                .then((res) => {
                    getComments();
                    setNoiDungBinhLuan('');
                    setSaoBinhLuan(0);
                    message.success({
                        content:
                            'Your comment has been submitted successfully!',
                        duration: 3,
                        style: {
                            fontSize: '1.6rem',
                            color: 'var(--text-color)',
                            fontFamily: '"Montserrat", sans-serif',
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                    message.error({
                        content:
                            'Comment submit failed! Please check your account and try again!',
                        duration: 3,
                        style: {
                            fontSize: '1.6rem',
                            color: 'var(--text-color)',
                            fontFamily: '"Montserrat", sans-serif',
                        },
                    });
                });
        } else {
            message.warning({
                content: `You are not signed in yet. Please sign in to continue!`,
                duration: 3,
                style: {
                    fontSize: '1.6rem',
                    color: 'var(--text-color)',
                    fontFamily: '"Montserrat", sans-serif',
                },
            });
        }
    };

    const renderComments = () => {
        return comments.map((comment) => {
            return (
                <div key={comment.id} className={cx('commentWrapper')}>
                    <div className={cx('commentInner')}>
                        <div className={cx('commenterInfo')}>
                            <Avatar
                                className={cx('commenterAvatar')}
                                src={comment.avatar}
                                alt={comment.tenNguoiBinhLuan}
                            />
                            <div>
                                <span className={cx('commenterName')}>
                                    {comment.tenNguoiBinhLuan}
                                </span>
                                <span className={cx('saoBinhLuan')}>
                                    <FontAwesomeIcon
                                        className={cx('starIcon')}
                                        icon={faStar}
                                    />
                                    {comment.saoBinhLuan}
                                </span>
                                <div className={cx('commenterNationality')}>
                                    <Avatar
                                        className={cx('flag')}
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/1200px-Flag_of_Vietnam.svg.png"
                                        alt="Vietnam"
                                    />
                                    <span>Vietnam</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('commentContent')}>
                            <div className={cx('ngayBinhLuan')}>
                                {moment(comment.ngayBinhLuan).format(
                                    'DD/MM/YYYY - HH:mm',
                                )}
                            </div>
                            <div className={cx('comment')}>
                                {comment.noiDung}
                            </div>
                            <div className={cx('like')}>
                                <Button
                                    text
                                    className={cx('likeBtn')}
                                    leftIcon={
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                    }
                                >
                                    Helpful
                                </Button>
                                <Button
                                    text
                                    className={cx('likeBtn')}
                                    leftIcon={
                                        <FontAwesomeIcon icon={faThumbsDown} />
                                    }
                                >
                                    Not Helpful
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            <div className={cx('reviews')}>
                <h3>{comments.length} Reviews</h3>
                <div className={cx('content')}>
                    <div>
                        <Rate
                            className={cx('rate')}
                            disabled
                            defaultValue={5}
                        />
                        <span className={cx('saoBinhLuan')}>
                            {
                                comments.filter((cmt) => cmt.saoBinhLuan == 5)
                                    .length
                            }
                        </span>
                    </div>
                    <div>
                        <Rate
                            className={cx('rate')}
                            disabled
                            defaultValue={4}
                        />
                        <span className={cx('saoBinhLuan')}>
                            {
                                comments.filter((cmt) => cmt.saoBinhLuan == 4)
                                    .length
                            }
                        </span>
                    </div>
                    <div>
                        <Rate
                            className={cx('rate')}
                            disabled
                            defaultValue={3}
                        />
                        <span className={cx('saoBinhLuan')}>
                            {
                                comments.filter((cmt) => cmt.saoBinhLuan == 3)
                                    .length
                            }
                        </span>
                    </div>
                    <div>
                        <Rate
                            className={cx('rate')}
                            disabled
                            defaultValue={2}
                        />
                        <span className={cx('saoBinhLuan')}>
                            {
                                comments.filter((cmt) => cmt.saoBinhLuan == 2)
                                    .length
                            }
                        </span>
                    </div>
                    <div>
                        <Rate
                            className={cx('rate')}
                            disabled
                            defaultValue={1}
                        />
                        <span className={cx('saoBinhLuan')}>
                            {
                                comments.filter((cmt) => cmt.saoBinhLuan == 1)
                                    .length
                            }
                        </span>
                    </div>
                </div>
                <div className={cx('sortByBar')}>
                    <span className={cx('title')}>Sort by</span>
                    <select>
                        <option>All reviews</option>
                        <option value="mostRelevant">Most relevant</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>
            </div>
            <>{renderComments()}</>
            <div className={cx('writeComment')}>
                <div className={cx('heading')}>
                    <h3>Please give us your feedback</h3>
                    <h3>
                        <span className={cx('ratingText')}>Rating</span>
                        <Rate
                            value={saoBinhLuan}
                            className={cx('rate')}
                            onChange={(e) => setSaoBinhLuan(e)}
                        />
                    </h3>
                </div>
                <form>
                    <textarea
                        placeholder="Enter your comments..."
                        value={noiDungBinhLuan}
                        cols="80"
                        rows="8"
                        spellCheck={false}
                        onChange={(e) => setNoiDungBinhLuan(e.target.value)}
                    />
                </form>
                <Button
                    primary
                    disabled={saoBinhLuan == 0 ? true : false}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </>
    );
}

Comments.propTypes = {
    maCongViec: PropTypes.number,
};

export default Comments;
