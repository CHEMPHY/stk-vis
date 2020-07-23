module MoleculeBrowser.MoleculeBrowser.Internal.InitialState
    ( initialState
    ) where

import MoleculeBrowser.MoleculeBrowser.Internal.MoleculeBrowser
    ( MoleculeBrowser (..)
    )

import Molecules.Molecules (initialState) as Molecules
import RequestManager.RequestManager (initialState) as RequestManager

initialState :: MoleculeBrowser
initialState = MoleculeBrowser
    { _requestManager: RequestManager.initialState
    , _molecules: Molecules.initialState
    }
