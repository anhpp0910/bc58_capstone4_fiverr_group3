import React from 'react';
import { Collapse, ConfigProvider } from 'antd';

const answer = (
    <p
        style={{
            paddingLeft: 24,
        }}
    >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
);

const faq = [
    {
        key: '1',
        label: 'Do you provide regular updates on order?',
        children: answer,
    },
    {
        key: '2',
        label: 'How do you guarantee product quality and reliability?',
        children: answer,
    },
    {
        key: '3',
        label: 'Do you give post-development support?',
        children: answer,
    },
    {
        key: '4',
        label: 'Do you convert PSD to HTML?',
        children: answer,
    },
];

export default function FAQ() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Collapse: {
                        colorBorder: 'var(--border-color)',
                        headerBg: 'var(--white)',
                        fontSize: '1.6rem',
                        colorText: 'var(--gray)',
                        colorTextHeading: 'var(--gray)',
                    },
                },
            }}
        >
            <Collapse items={faq} bordered={false} size="large" />
        </ConfigProvider>
    );
}
