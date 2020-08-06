module MoleculeBrowser.MoleculeBrowser.Internal.Reducer.Internal.InitializeMolecules
    ( initializeMolecules
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (MoleculeBrowser)
    )

import MoleculeBrowser.InitializeMolecules
    ( InitializeMolecules
    , toMolecules
    )

import Molecules.Molecules as Molecules
import Molecules.Action as Action

initializeMolecules
    :: MoleculeBrowser -> InitializeMolecules -> MoleculeBrowser

initializeMolecules
    (MoleculeBrowser { _requestManager, _molecules })
    payload
    = MoleculeBrowser
        { _requestManager
        , _molecules:
            Molecules.reducer
                _molecules
                (Action.initializeMolecules (toMolecules payload))
        }