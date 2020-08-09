module StkVis.StkVis.Internal.Reducer.Internal.InitializeUnsortedAll
    ( initializeUnsortedAll
    ) where

import Prelude
import StkVis.StkVis.Internal.StkVis as StkVis
import MoleculeBrowser.MoleculeBrowser as MoleculeBrowser
import MoleculeBrowser.Action as MB.Action

import StkVis.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    , toMoleculeBrowser
    )

initializeUnsortedAll
    :: StkVis.StkVis
    -> InitializeUnsortedAll
    -> StkVis.StkVis

initializeUnsortedAll
    stkVis
    payload
    = StkVis.MoleculeBrowser $ MoleculeBrowser.reducer
        MoleculeBrowser.initialState
        (MB.Action.initializeUnsortedAllMoleculeBrowser
            (toMoleculeBrowser payload)
        )