import { Popover } from "@mui/material";
import * as React from 'react';

export function PopOver({ children, open, anchorRef }) {
    return (
        <Popover
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            open={open}
            anchorEl={anchorRef.current}
        >
            {children}
        </Popover>
    )
}