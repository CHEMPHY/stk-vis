module Requests.Molecule.Internal.MoleculeEntry
    ( MoleculeEntry
    , AtomEntry
    , BondEntry
    ) where

import Data.Map (Map)

type AtomEntry =
    { atomicNumber :: Int
    , charge       :: Int
    }

type BondEntry =
    { order   :: Int
    , atom1Id :: Int
    , atom2Id :: Int
    }

type MoleculeEntry a b =
    { keys  :: Map String String
    , atoms :: Array a
    , bonds :: Array b
    }