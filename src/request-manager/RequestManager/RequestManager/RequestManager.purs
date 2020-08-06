module RequestManager.RequestManager
    ( module Exports
    , reducer
    , initialState
    , nextButtonProps
    , backButtonProps
    , sortButtonProps
    ) where

import RequestManager.Action (Action)
import RequestManager.RequestResult (RequestResult)

import RequestManager.RequestManager.Internal.RequestManager
    ( RequestManager
    ) as Exports

import RequestManager.RequestManager.Internal.Props
    ( NextButtonProps
    , BackButtonProps
    , SortButtonProps
    ) as Exports

import RequestManager.RequestManager.Internal.Props
    ( nextButtonProps
    , backButtonProps
    , sortButtonProps
    ) as Props

import RequestManager.RequestManager.Internal.InitialState
    ( initialState
    ) as InitialState

import RequestManager.RequestManager.Internal.Reducer
    ( reducer
    ) as Reducer

reducer :: Exports.RequestManager -> Action -> Exports.RequestManager
reducer = Reducer.reducer

initialState :: Exports.RequestManager
initialState = InitialState.initialState

nextButtonProps :: Exports.RequestManager -> Exports.NextButtonProps
nextButtonProps = Props.nextButtonProps

backButtonProps
    :: forall a
    .  (RequestResult -> a)
    -> Exports.RequestManager
    -> Exports.BackButtonProps a

backButtonProps = Props.backButtonProps

sortButtonProps :: Exports.RequestManager -> Exports.SortButtonProps
sortButtonProps = Props.sortButtonProps
