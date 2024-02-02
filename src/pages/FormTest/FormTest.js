import React from 'react';
import AvatarEditor from 'react-avatar-editor';

function FormTest() {
    return (
        <div>
            <AvatarEditor
                image="https://avatars.githubusercontent.com/u/13477686?v=4"
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1.2}
                rotate={0}
            />
        </div>
    );
}

export default FormTest;
