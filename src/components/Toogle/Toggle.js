import React from 'react';
import { Switch, ConfigProvider } from 'antd';

export default function Toogle() {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Switch: {
                        colorPrimary: 'var(--primary)',
                        colorPrimaryHover: 'var(--primary)',
                        colorTextTertiary: 'var(--background-gray)',
                        fontSize: 12,
                    },
                },
            }}
        >
            <Switch />
        </ConfigProvider>
    );
}
