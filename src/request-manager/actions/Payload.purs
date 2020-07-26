module RequestManager.Payload
    ( Payload (..)
    , initializeRequestManager
    ) where

import RequestManager.InitializeRequestManager
    ( InitializeRequestManager
    )

data Payload
    = InitializeRequestManager InitializeRequestManager

initializeRequestManager :: InitializeRequestManager -> Payload
initializeRequestManager = InitializeRequestManager