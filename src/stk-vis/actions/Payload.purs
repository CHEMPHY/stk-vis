module StkVis.Payload
    ( Payload (..)
    , updateMoleculePage
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    , setSorted
    , setUnsorted
    , selectMolecule
    , initializeMongoConfigurator
    ) where

import Prelude
import StkVis.UpdateMoleculePage as StkVis
import RequestManager.UpdateMoleculePage as Manager

import StkVis.InitializeMoleculeBrowser.UnsortedAll
    ( InitializeUnsortedAll
    )
import StkVis.InitializeMoleculeBrowser.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )
import StkVis.InitializeMoleculeBrowser.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    )
import StkVis.SetSorted
    ( SetSorted
    )
import StkVis.SetUnsorted
    ( SetUnsorted
    )
import StkVis.SelectMolecule
    ( SelectMolecule
    )
import StkVis.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    )


data Payload
    = UpdateMoleculePage StkVis.UpdateMoleculePage
    | InitializeUnsortedAll InitializeUnsortedAll
    | InitializeUnsortedBuildingBlocks InitializeUnsortedBuildingBlocks
    | InitializeUnsortedConstructedMolecules
        InitializeUnsortedConstructedMolecules
    | SetSorted SetSorted
    | SetUnsorted SetUnsorted
    | SelectMolecule SelectMolecule
    | InitializeMongoConfigurator InitializeMongoConfigurator

updateMoleculePage :: Manager.UpdateMoleculePage -> Payload
updateMoleculePage = UpdateMoleculePage <<< StkVis.updateMoleculePage

initializeUnsortedAll :: InitializeUnsortedAll -> Payload
initializeUnsortedAll = InitializeUnsortedAll

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks
    -> Payload

initializeUnsortedBuildingBlocks = InitializeUnsortedBuildingBlocks

initializeUnsortedConstructedMolecules
    :: InitializeUnsortedConstructedMolecules
    -> Payload

initializeUnsortedConstructedMolecules
    = InitializeUnsortedConstructedMolecules

setSorted :: SetSorted -> Payload
setSorted = SetSorted

setUnsorted :: SetUnsorted -> Payload
setUnsorted = SetUnsorted

selectMolecule :: SelectMolecule -> Payload
selectMolecule = SelectMolecule

initializeMongoConfigurator :: InitializeMongoConfigurator -> Payload
initializeMongoConfigurator = InitializeMongoConfigurator
