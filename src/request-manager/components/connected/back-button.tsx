import { connect } from 'react-redux';
import {
    backButtonProps,
    RequestManager,
    BackButtonProps,
} from 'RequestManager.RequestManager';
import {
    BackButton as BackButtonBase,
} from 'request-manager/styled/back-button';

import * as Action
from 'RequestManager.Action';
import {
    DispatchProps,
} from 'request-manager/base/back-button';


function mapStateToProps(
    state: RequestManager,
)
    : BackButtonProps
{
    // Reconstruct as plain object to prevent react/redux warnings.
    return { ...backButtonProps(state) };
}


function mapDispatchToProps(
    dispatch: (action: Action.Action) => void,
)
    : DispatchProps
{
    return {
        handleResult: result => console.log(result),
    };
}


export const BackButton
    = connect
    (mapStateToProps, mapDispatchToProps)
    (BackButtonBase);
