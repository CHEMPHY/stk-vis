import * as React from 'react';
import {
    ThreeDViewerProps,
} from 'MoleculeBrowser.MoleculeBrowser';


export function ThreeDViewer(
    props: ThreeDViewerProps,
)
{
    return (
        <div
            style={{
                height: '10%',
                width: '10%',
                backgroundColor: 'green',
            }}
        >
            3D Viewer
        </div>
    );
}
