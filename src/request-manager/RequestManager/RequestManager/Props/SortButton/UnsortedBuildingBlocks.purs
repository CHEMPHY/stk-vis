module RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.UnsortedBuildingBlocks
    ( sortButtonProps
    ) where

import RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.Props
    ( SortButtonProps (SortButtonProps)
    , ActionCreators
    , DispatchAction
    , CollectionName
    )

import RequestManager.RequestManager.Internal.RequestManager.UnsortedBuildingBlocks
    ( UnsortedBuildingBlocks (UnsortedBuildingBlocks)
    )

import Prelude
import Data.Array as Array
import Requests.UnsortedBuildingBlocks as UnsortedRequest
import Requests.SortedBuildingBlocks as SortedRequest
import RequestManager.SetSorted (setSorted)
import RequestManager.SetUnsorted (setUnsorted)
import RequestManager.UpdateMoleculePage (updateMoleculePage)
import Effect.Promise (class Deferred, Promise)
import RequestManager.PageKind (fromRequest)
import RequestManager.SortType (SortType, toRequest)
import Effect (Effect)

sortButtonProps
    :: forall a r
    .  ActionCreators a r
    -> UnsortedBuildingBlocks
    -> SortButtonProps a

sortButtonProps
    actionCreators
    (UnsortedBuildingBlocks
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _constructedMoleculeCollection: constructedMoleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
        , _pageIndex
        , _numEntriesPerPage: numEntriesPerPage
        , _ignoredCollections: ignoredCollections
        , _pageKind: pageKind
        , _valueCollections
        }
    )
    = SortButtonProps
        { collections: _valueCollections
        , setSorted: setSorted'
        , setUnsorted: setUnsorted'
        }
  where
    pageIndex = 0

    setSorted'
        :: Deferred
        => DispatchAction a
        -> CollectionName
        -> SortType
        -> Promise (Effect Unit)

    setSorted' dispatch collection sortType' = do
        _ <- pure
            (dispatch
                (actionCreators.setSorted
                    (setSorted collection sortType')
                )
            )

        result <- SortedRequest.request
            { url
            , database
            , moleculeKey
            , moleculeCollection
            , constructedMoleculeCollection
            , positionMatrixCollection
            , pageIndex
            , numEntriesPerPage
            , ignoredCollections
            , sortedCollection: collection
            , sortType: toRequest sortType'
            }

        let
            (SortedRequest.Result
                { valueCollections, molecules, pageKind: pageKind' }
            ) = result

            payload = updateMoleculePage
                { columns:
                    Array.concat [[moleculeKey], valueCollections]
                , moleculeKey
                , molecules
                , pageIndex
                , pageKind: fromRequest pageKind'
                , valueCollections
                }

        pure (dispatch (actionCreators.updateMoleculePage payload))

    setUnsorted'
        :: Deferred
        => DispatchAction a
        -> Promise (Effect Unit)

    setUnsorted' dispatch = do
        _ <- pure (dispatch (actionCreators.setUnsorted setUnsorted))

        result <- UnsortedRequest.request
            { url
            , database
            , moleculeKey
            , moleculeCollection
            , constructedMoleculeCollection
            , positionMatrixCollection
            , pageIndex
            , numEntriesPerPage
            , ignoredCollections
            }

        let
            (UnsortedRequest.Result
                { valueCollections, molecules, pageKind: pageKind' }
            ) = result

            payload = updateMoleculePage
                { columns:
                    Array.concat [[moleculeKey], valueCollections]
                , moleculeKey
                , molecules
                , pageIndex
                , pageKind: fromRequest pageKind'
                , valueCollections
                }

        pure (dispatch (actionCreators.updateMoleculePage payload))
