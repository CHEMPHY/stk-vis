module RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.SortedAll
    ( sortButtonProps
    ) where

import RequestManager.RequestManager.Internal.Props.Internal.SortButton.Internal.Props
    ( SortButtonProps (SortButtonProps)
    )

import RequestManager.RequestManager.Internal.RequestManager.SortedAll
    ( SortedAll (SortedAll)
    )

import Requests.SortedAll as Request

sortButtonProps
    :: forall a r
    .  ActionCreators a r
    -> SortedAll
    -> SortButtonProps a

sortButtonProps
    actionCreators
    (SortedAll
        { _url: url
        , _database: database
        , _moleculeKey: moleculeKey
        , _moleculeCollection: moleculeCollection
        , _positionMatrixCollection: positionMatrixCollection
        , _buildingBlockPositionMatrixCollection:
            buildingBlockPositionMatrixCollection
        , _pageIndex
        , _numEntriesPerPage: numEntriesPerPage
        , _ignoredCollections: ignoredCollections
        , _pageKind: pageKind
        , _sortedCollection: sortedCollection
        , _sortType: sortType
        }
    )
    = SortButtonProps
    { collections: valueCollections requestManager
    , setSorted: setSorted'
    , setUnsorted: setUnsorted'
    , updateMoleculePage: updateMoleculePage'
    }
  where
    setSorted' dispatch collection sortType
        = dispatch
            (actionCreators.setSorted
                (setSorted collection sortType)
            )

    setUnsorted' dispatch
        = dispatch (actionCreators.setUnsorted setUnsorted)

    pageIndex = 0

    request :: Deferred => Promise Request.Result
    request = Request.request
        { url
        , database
        , moleculeKey
        , moleculeCollection
        , positionMatrixCollection
        , buildingBlockPositionMatrixCollection
        , pageIndex
        , numEntriesPerPage
        , ignoredCollections
        , sortedCollection
        , sortType: toRequest sortType
        }


    updateMoleculePage'
        :: Deferred => (a -> Effect Unit) -> Promise (Effect Unit)
    updateMoleculePage' dispatch = do
        result <- request

        let
            (Request.Result
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
