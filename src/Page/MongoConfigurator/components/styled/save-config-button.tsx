import * as React from 'react';
import PublishIcon from '@material-ui/icons/Publish';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/Button';
import {
    SaveConfigButton as SaveConfigButtonBase,
    ButtonProps,
} from '../base/save-config-button';



export function SaveConfigButton()
{
    return <SaveConfigButtonBase
        button={StyledButton}
    />;
}



const StyledButton: React.FunctionComponent<ButtonProps>
    = props => (
        <Grid item>
            <ButtonBase
                variant='contained'
                color='secondary'
                startIcon={<PublishIcon />}
                {...props}
            >
                Export Config
            </ButtonBase>
        </Grid>
    );
