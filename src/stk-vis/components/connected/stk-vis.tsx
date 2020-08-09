import { connect } from 'react-redux';
import {
    props,
    StkVis as State,
    Props,
} from 'StkVis.StkVis';
import * as Action from 'StkVis.Action';
import {
    MongoData
} from 'MongoConfigurator.UpdateFields.MongoData';
import {
    PageData,
} from 'MoleculeBrowser.UpdateMoleculePage.PageData';
import {
    StkVis as StkVisBase,
} from 'stk-vis/styled/stk-vis';
import {
    DispatchProps,
    CoreProps,
} from 'stk-vis/base/stk-vis';
import {
    UpdateMoleculePage,
} from 'RequestManager.UpdateMoleculePage';


function mapStateToProps<a>(
    state: State,
)
    : Props<Action.Action>
{
    return {
        ...props({
            updateMoleculePage:
                (payload: UpdateMoleculePage) =>
                    Action.updateMoleculePage(payload)
        })(state)
    };
}


function mapDispatchToProps(
    dispatch: (action: Action.Action) => void,
)
    : DispatchProps<Action.Action>
{
    return { dispatch };
}


export const StkVis
    = connect(mapStateToProps, mapDispatchToProps)
    (
        StkVisBase as
        React.FunctionComponent<CoreProps<Action.Action>>
    );
