import React, { useContext } from 'react'
import { algoContext } from './Grids'


function Header({
  handleDijkastra,
  handleReset
}) {
  const { selectedAlgo, setSelectedAlgo } = useContext(algoContext)
  return (
    <div className="header">
      <div>
        {/* <label>Pathfinder algo</label> */}
        <select>
          <option value="">---</option>
          <option value="dijkstra" onClick={() => setSelectedAlgo(() => handleDijkastra)}>Dijkstra</option>
        </select>
      </div>
      <button onClick={selectedAlgo}>Find path</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Header