import * as React from 'react';
import {
    CoreProps as ConfiguratorProps
} from '../../MongoConfigurator/components/base/mongo-configurator';
import {
    CoreProps as BrowserProps
} from '../../MoleculeBrowser/Props/components/base';
import {
    Props as BaseProps,
    Action,
} from 'Page.StkVis';


export interface DispatchProps
{
    dispatch: (action: Action) => void;
}

export type CoreProps = BaseProps & DispatchProps;


interface Props extends BaseProps, DispatchProps
{
    mongoConfigurator:
        React.FunctionComponent<ConfiguratorProps<Action>>;

    moleculeBrowser:
        React.FunctionComponent<BrowserProps<Action>>;

}

export function StkVis<a>(
    props: Props,
)
{
    if (props.value0.type === "Mongo Configurator")
    {
        return <props.mongoConfigurator
            dispatch={props.dispatch}
            {...props.value0}
        />;
    }
    if (props.value0.type === "Molecule Browser")
    {
        return <props.moleculeBrowser
            dispatch={props.dispatch}
            {...props.value0}
        />;
    }
    return <div>YOU SHOULD NEVER SEE THIS!!</div>;
}
