import React from 'react'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'
import '../assets/styles/horizontalMenu.css'
import useDrag from '../hooks/useDrag'

function HorizontalMenu({ children }) {
  // NOTE: for drag by mouse
  const { dragStart, dragStop, dragMove } = useDrag()

  function onWheel(apiObj, ev) {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15

    if (isThouchpad) {
      ev.stopPropagation()
      return
    }

    if (ev.deltaY < 0) {
      apiObj.scrollNext()
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev()
    }
  }
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff
        }
      })

  return (
    <div>

    <div className="bg-purple-8  my-4 py-4" onMouseLeave={dragStop}>
      <ScrollMenu
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
      >
        {children}
      </ScrollMenu>
    </div>
    </div>
  )
}
export default HorizontalMenu
