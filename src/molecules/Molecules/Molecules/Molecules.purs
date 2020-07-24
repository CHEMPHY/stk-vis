module Molecules.Molecules
    ( module Exports
    , initialState
    , moleculeTableProps
    , twoDViewerProps
    , threeDViewerProps
    , get
    ) where

import Data.Map (Map, lookup) as Map
import Data.Maybe (Maybe (Nothing, Just))

import Molecules.Molecules.Internal.Molecules
    ( Molecules
    ) as Exports

import Molecules.Molecules.Internal.InitialState
    ( initialState
    ) as InitialState

import Molecules.Molecules.Internal.Props
    ( MoleculeTableProps
    , TwoDViewerProps
    , ThreeDViewerProps
    ) as Exports

import Molecules.Molecules.Internal.Props
    ( moleculeTableProps
    , twoDViewerProps
    , threeDViewerProps
    ) as Props

initialState :: Exports.Molecules
initialState = InitialState.initialState

moleculeTableProps :: Exports.Molecules -> Exports.MoleculeTableProps
moleculeTableProps = Props.moleculeTableProps

twoDViewerProps :: Exports.Molecules -> Exports.TwoDViewerProps
twoDViewerProps = Props.twoDViewerProps

threeDViewerProps :: Exports.Molecules -> Exports.ThreeDViewerProps
threeDViewerProps = Props.threeDViewerProps

get :: Map.Map String String -> String -> String
get map key =
    case Map.lookup key map of
        Nothing -> ""
        Just string -> string
