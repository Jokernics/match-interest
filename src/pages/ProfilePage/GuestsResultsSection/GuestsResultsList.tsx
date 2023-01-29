import { guestType } from "../../../types/types"
import GuestResultListItem from "./GuestResultListItem"

type props = {
  results: guestType[]
}

export default function GuestsResultsList({results}: props) {
  return (
    <div className="flex gap-3 flex-wrap">
      {results.map((result, index) => 
        <GuestResultListItem key={index} {...{result, index}} />
      )}
    </div>
  )
}