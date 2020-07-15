module StkVis.Action
    ( Action
    , updateFields
    ) where

import StkVis.Payload (Payload) as Payload

type Action =
    { type    :: String
    , payload :: Payload.Payload
    }

updateFields :: UpdateFields.MongoData -> Action
updateFields data =
    { type: "UPDATE_FIELDS"
    , payload: Payload.updateFields data
    }