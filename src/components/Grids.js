/* eslint-disable eqeqeq */
import React, { createContext, useEffect, useState } from 'react'
import { Dijkastra, getShortestPath } from '../Algorithms/Dijkstra'
import Node from './node'
import Header from './Header'

export const algoContext = createContext()

function Grids() {

  const cols = 40
  const rows = 20
  const startPointRow = 10
  const startPointCol = 10
  const endPointRow = 10
  const endPointCol = 30

  const [selectedAlgo, setSelectedAlgo] = useState(null)
  const [isClicked, setisClicked] = useState(false)
  const [grid, setGrid] = useState([])
  const [passBy, setPassBy] = useState(undefined)


  useEffect(() => {
    Init()
  }, [])

  function Init() {
    const tempGrid = []
    for (let i = 0; i < rows; i++) {
      const col = []
      for (let j = 0; j < cols; j++) {
        col.push(createNode(j, i))
      }
      tempGrid.push(col)
    }
    setGrid(tempGrid)
  }



  function wallToggleChange(row, col, e) {
    let newGrid = grid;
    newGrid[row][col].isWall = !newGrid[row][col].isWall
    return newGrid
  }

  function handleWallClick(e, rows, cols) {
    if (!(e.target.classList.contains("startBox") || e.target.classList.contains("endBox"))) {
      // e.target.classList.toggle("wall")
      setGrid(wallToggleChange(rows, cols, e))
    }
    setisClicked(true)
  }

  function handleWallHover(e, rows, cols) {
    let temp = grid
    if (!(e.target.classList.contains("startBox") || e.target.classList.contains("endBox")))
      if (isClicked) {
        // e.target.classList.toggle("wall")
        temp = wallToggleChange(rows, cols, e)
        setGrid(temp)
      }
  }

  function handleWallUp(e) {
    if (isClicked) {
      setisClicked(false)
    }
  }

  function createNode(col, row) {
    return {
      col,
      row,
      isStart: col === startPointCol && row === startPointRow,
      isEnd: col === endPointCol && row === endPointRow,
      distance: Infinity,
      isWall: false,
      prevNode: null,
      isVisited: false
    }
  }

  function animateAllVisited(allVisited) {
    const done = new Promise(resolve => {
      for (let i = 0; i < allVisited.length; i++) {
        let j = i
        setTimeout(() => {
          if (allVisited[j - 1])
            document.getElementById(`${allVisited[j - 1].row}-${allVisited[j - 1].col}`).classList.remove("current")
          document.getElementById(`${allVisited[j].row}-${allVisited[j].col}`).classList.add("visited")
          document.getElementById(`${allVisited[j].row}-${allVisited[j].col}`).classList.add("current")
          if (j === allVisited.length - 1) resolve("done")
        }, 25 * j)
      }
    })

    return done
  }

  function animateShortestPath(path) {
    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        document.getElementById(`${path[i].row}-${path[i].col}`).classList.add('path')
      }, 20 * i);
    }
  }

  function handleReset() {
    setSelectedAlgo(null)
    Init()
    const testedNodes = document.querySelectorAll('.visited')
    testedNodes.forEach(v => {
      v.classList.remove('visited')
    })
    const pathNodes = document.querySelectorAll('.path')
    pathNodes.forEach(v => {
      v.classList.remove('path')
    })
    const current = document.querySelectorAll('.current')
    current.forEach(v => {
      v.classList.remove('current')
    })
  }

  var handleDijkastra = function () {
    if (typeof passBy === "undefined") {
      const allVisited = Dijkastra(grid, grid[startPointRow][startPointCol], grid[endPointRow][endPointCol])
      // console.log(allVisited)
      animateAllVisited(allVisited)
        .then(() => {
          document.querySelectorAll(".current").forEach(v => v.classList.remove('current'))
          const shortestPath = getShortestPath(grid[endPointRow][endPointCol])
          animateShortestPath(shortestPath)
        })
    }
    else {
      const visitedToPassBy = Dijkastra(grid, grid[startPointRow][startPointCol], passBy)
      animateAllVisited(visitedToPassBy)
        .then(() => {
          const passByToEnd = Dijkastra(grid, passBy, grid[endPointRow][endPointCol])
          animateAllVisited(passByToEnd)
            .then(() => {
              document.querySelectorAll(".current").forEach(v => v.classList.remove('current'))
              const shortestPath1 = getShortestPath(grid[endPointRow][endPointCol])
              animateShortestPath(shortestPath1)
              const shortestPath2 = getShortestPath(passBy)
              animateShortestPath(shortestPath2)
            })
        })
    }
  }

  function handlePassBy() {
    if (document.querySelectorAll('.passBy').length === 0) {
      const randomRow = Math.floor(Math.random() * rows)
      const randomCol = Math.floor(Math.random() * cols)
      setPassBy(grid[randomRow][randomCol])
      document.getElementById(`${randomRow}-${randomCol}`).classList.add("passBy")
    }
  }

  return (
    <>
      <algoContext.Provider value={{ selectedAlgo, setSelectedAlgo }}>
        <Header
          handleDijkastra={handleDijkastra}
          handleReset={handleReset} />
      </algoContext.Provider>
      {/* <button onClick={handlePathFinder}>shortest path</button> */}
      <div className="grid">
        <Node
          grid={grid}
          handleWallClick={handleWallClick}
          handleWallHover={handleWallHover}
          handleWallUp={handleWallUp}
        />
      </div>
      <button onClick={handlePassBy}>Add A pass by node</button>
    </>
  )
}

export default Grids