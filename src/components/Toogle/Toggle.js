import React from 'react';
import { Switch, ConfigProvider } from 'antd';

const onChange = (checked) => {
    console.log(`switch to ${checked}`);
};

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
            <Switch defaultChecked onChange={onChange} />
        </ConfigProvider>
    );
}
