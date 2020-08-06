module RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.SortedConstructedMolecules
    ( backButtonProps
    ) where

import Prelude

import RequestManager.RequestManager.Internal.RequestManager.SortedConstructedMolecules
    ( SortedConstructedMolecules (SortedConstructedMolecules)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Props
    ( BackButtonProps (..)
    )

import RequestManager.RequestManager.Internal.Props.Internal.BackButton.Internal.Utils
    ( disabled
    , previousPageIndex
    ) as Utils

import RequestManager.PageKind (fromRequest)
import RequestManager.SortType (toRequest)

import RequestManager.UpdateMoleculePage
    ( UpdateMoleculePage
    , updateMoleculePage
    )

import RequestManager.RequestResult as RequestResult
import Requests.SortedConstructedMolecules as Request
import Data.Array as Array


backButtonProps
    :: forall a
    .  (UpdateMoleculePage -> a)
    -> SortedConstructedMolecules
    -> BackButtonProps a

backButtonProps
    createAction
    (SortedConstructedMolecules
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
        , _sortedCollection: sortedCollection
        , _sortType: sortType
        }
    )
    = BackButtonProps
        { disabled: Utils.disabled pageKind
        , request: RequestResult.SortedConstructedMolecules request
        , onClick
        }
  where
    pageIndex = Utils.previousPageIndex _pageIndex
    request = Request.request
        { url
        , database
        , moleculeKey
        , moleculeCollection
        , constructedMoleculeCollection
        , positionMatrixCollection
        , pageIndex
        , numEntriesPerPage
        , ignoredCollections
        , sortedCollection
        , sortType: toRequest sortType
        }

    onClick dispatch = do
        result <- request

        let
            (Request.Result
                { valueCollections, molecules, pageKind' }
            ) = result

            payload = updateMoleculePage
                { columns:
                    Array.concat [[moleculeKey], valueCollections]
                , moleculeKey
                , molecules
                , pageIndex
                , pageKind: fromRequest pageKind'
                }

        pure (dispatch (createAction payload))
