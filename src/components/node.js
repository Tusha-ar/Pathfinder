import React from 'react'


function Node({
  grid,
  handleWallClick,
  handleWallHover,
  handleWallUp,
}) {
  return (

    grid.length && grid.map((rows, rowIndex) =>
      <div key={rowIndex} className="cols">
        {rows.map((cols, colIndex) => (
          <div
            key={colIndex}
            id={`${rowIndex}-${colIndex}`}
            onMouseDown={(e) => handleWallClick(e, rowIndex, colIndex)}
            onMouseOver={e => handleWallHover(e, rowIndex, colIndex)}
            onMouseUp={handleWallUp}
            className={`${cols.isStart ? "startBox" : null} ${cols.isEnd ? "endBox" : null} ${cols.isWall ? "wall" : null}  box`} >
            {console.log(cols.isWall)}
          </div>
        ))}
      </div>
    )

  )
}

export default Node