module Requests.Molecule.Internal.FromEntry
    ( fromEntry
    ) where

import Prelude
import Mongo as Mongo
import Data.Maybe (Maybe)
import Data.Foldable (foldM)
import Data.List (List (Nil))
import Data.Map (empty)
import Data.Array (fromFoldable)
import ValidatedMolecule.ChemicalSymbol (chemicalSymbol) as Validated
import ValidatedMolecule.Position (position) as Validated
import Requests.Molecule.Internal.Data (Molecule (Molecule))
import Requests.Molecule.Internal.ToMoleculeEntry (toMoleculeEntry)
import Requests.Utils (maybeFold)

import ValidatedMolecule
    ( Bond
    , Atom
    , atom
    , bond
    , molecule
    ) as Validated

import Requests.Molecule.Internal.MoleculeEntry
    ( AtomEntry
    , BondEntry
    )

fromEntry :: Mongo.Entry -> Maybe Molecule
fromEntry entry = do
    moleculeEntry <- toMoleculeEntry entry
    atoms <- foldM (maybeFold atom) Nil moleculeEntry.atoms
    validated <-
        Validated.molecule
        (fromFoldable atoms)
        (map bond moleculeEntry.bonds)

    pure $ Molecule
        { _keys: empty
        , _properties: empty
        , _molecule: validated
        }

atom :: AtomEntry -> Maybe Validated.Atom
atom ({ atomicNumber }) = do
    chemicalSymbol <- Validated.chemicalSymbol atomicNumber
    pure
        $ Validated.atom
            chemicalSymbol
            (Validated.position 0.0 0.0 0.0)

bond :: BondEntry -> Validated.Bond
bond ({ order, atom1Id, atom2Id })
    = Validated.bond order atom1Id atom2Id