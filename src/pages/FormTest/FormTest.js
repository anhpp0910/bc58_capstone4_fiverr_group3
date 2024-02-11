import React from 'react';
import classNames from 'classnames/bind';
import styles from './FormTest.module.scss';

const cx = classNames.bind(styles);

const data = [
    { id: '1', tabTitle: 'Tab 1', tabContent: 'Tab Content 1' },
    { id: '2', tabTitle: 'Tab 2', tabContent: 'Tab Content 2' },
    { id: '3', tabTitle: 'Tab 3', tabContent: 'Tab Content 3' },
];

export default function FormTest() {
    const data = [
        { id: '1', tabTitle: 'Tab 1', tabContent: 'Tab Content 1' },
        { id: '2', tabTitle: 'Tab 2', tabContent: 'Tab Content 2' },
        { id: '3', tabTitle: 'Tab 3', tabContent: 'Tab Content 3' },
    ];

    const [visibleTab, setVisibleTab] = React.useState(data[0].id);

    const listTitles = data.map((item) => (
        <li
            onClick={() => setVisibleTab(item.id)}
            className={
                visibleTab === item.id
                    ? cx('tab-title', 'tab-title--active')
                    : cx('tab-title')
            }
        >
            {item.tabTitle}
        </li>
    ));

    const listContent = data.map((item) => (
        <p style={visibleTab === item.id ? {} : { display: 'none' }}>
            {item.tabContent}
        </p>
    ));

    return (
        <div className={cx('tabs')}>
            <ul className={cx('tabs-titles')}>{listTitles}</ul>
            <div className={cx('tab-content')}>{listContent}</div>
        </div>
    );
}
