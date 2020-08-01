module Requests.Molecule.Internal.ToMoleculeEntry
    ( toMoleculeEntry
    ) where

import Prelude
import Data.List (List (Nil))
import Data.Maybe (Maybe (Nothing, Just))
import Data.Array (fromFoldable, (!!))
import Data.Foldable (foldM)
import Requests.Utils (maybeFold)
import Mongo as Mongo
import Requests.Molecule.Internal.MoleculeKey (MoleculeKey)

import Requests.Molecule.Internal.MoleculeEntry
    ( MoleculeEntry
    , AtomEntry
    , BondEntry
    )


toAtomEntry :: Array Int -> Maybe AtomEntry
toAtomEntry entry = do
    atomicNumber <- entry !! 0
    charge <- entry !! 1
    pure { atomicNumber, charge }

toBondEntry :: Array Int -> Maybe BondEntry
toBondEntry entry = do
    atom1Id <- entry !! 0
    atom2Id <- entry !! 1
    order   <- entry !! 1
    pure { atom1Id, atom2Id, order }

type Helpers =
    { nothing :: Maybe (MoleculeEntry Unit Unit)
    , just    :: Unit -> Maybe Unit
    }

foreign import toUncheckedMoleculeEntry
    :: Helpers
    -> MoleculeKey
    -> Mongo.Entry
    -> Maybe (MoleculeEntry (Array Int) (Array Int))

toMoleculeEntry
    :: MoleculeKey
    -> Mongo.Entry
    -> Maybe (MoleculeEntry AtomEntry BondEntry)

toMoleculeEntry moleculeKey entry = do

    let
        helpers =
            { nothing: Nothing
            , just: Just
            }

    unchecked <- toUncheckedMoleculeEntry helpers moleculeKey entry
    atomEntries <- foldM (maybeFold toAtomEntry) Nil unchecked.atoms
    bondEntries <- foldM (maybeFold toBondEntry) Nil unchecked.bonds
    pure (
        { keys: unchecked.keys
        , atoms: fromFoldable atomEntries
        , bonds: fromFoldable bondEntries
        }
    )
