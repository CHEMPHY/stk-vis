module StkVis.Action
    ( Action
    , updateMoleculePage
    , initializeUnsortedAll
    , initializeUnsortedBuildingBlocks
    , initializeUnsortedConstructedMolecules
    , setSorted
    , setUnsorted
    , selectMolecule
    , initializeMongoConfigurator
    ) where

import RequestManager.UpdateMoleculePage as Manager
import StkVis.Payload as Payload

import MoleculeBrowser.Initialize.UnsortedAll
    ( InitializeUnsortedAll
    )
import MoleculeBrowser.Initialize.UnsortedBuildingBlocks
    ( InitializeUnsortedBuildingBlocks
    )
import MoleculeBrowser.Initialize.UnsortedConstructedMolecules
    ( InitializeUnsortedConstructedMolecules
    )

import RequestManager.SetSorted
    ( SetSorted
    )
import RequestManager.SetUnsorted
    ( SetUnsorted
    )
import Molecules.SelectMolecule
    ( SelectMolecule
    )

import MongoConfigurator.InitializeMongoConfigurator
    ( InitializeMongoConfigurator
    )

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

updateMoleculePage :: Manager.UpdateMoleculePage -> Action
updateMoleculePage payload =
    { type: "UPDATE_MOLECULE_PAGE"
    , payload: Payload.updateMoleculePage payload
    }

initializeUnsortedAll :: InitializeUnsortedAll -> Action
initializeUnsortedAll payload =
    { type: "INITIALIZE_UNSORTED_ALL_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedAll payload
    }

initializeUnsortedBuildingBlocks
    :: InitializeUnsortedBuildingBlocks
    -> Action

initializeUnsortedBuildingBlocks payload =
    { type: "INITIALIZE_UNSORTED_BUILDING_BLOCKS_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedBuildingBlocks payload
    }

initializeUnsortedConstructedMolecules
    :: InitializeUnsortedConstructedMolecules
    -> Action

initializeUnsortedConstructedMolecules payload =
    { type: "INITIALIZE_UNSORTED_CONSTRUCTED_MOLECULES_MOLECULE_BROWSER"
    , payload: Payload.initializeUnsortedConstructedMolecules payload
    }

setSorted :: SetSorted -> Action
setSorted payload =
    { type: "SET_SORTED"
    , payload: Payload.setSorted payload
    }

setUnsorted :: SetUnsorted -> Action
setUnsorted payload =
    { type: "SET_UNSORTED"
    , payload: Payload.setUnsorted payload
    }

selectMolecule :: SelectMolecule -> Action
selectMolecule payload =
    { type: "SELECT_MOLECULE"
    , payload: Payload.selectMolecule payload
    }

initializeMongoConfigurator
    :: InitializeMongoConfigurator -> Action

initializeMongoConfigurator payload =
    { type: "INITIALIZE_MONGO_CONFIGURATOR"
    , payload: Payload.initializeMongoConfigurator payload
    }
