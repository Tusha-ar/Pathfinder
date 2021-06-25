function Dijkastra(grid, start, end) {
  grid[start.row][start.col].distance = 0
  let nodesToBeVisit = getAllNodes(grid)
  const nodesVisited = []
  //distance from start node to every other node will be infinity 
  //which is set by default but distance from start to start will be 0
  while (nodesToBeVisit.length) {
    nodesToBeVisit = sortByDistance(nodesToBeVisit)
    const currentNode = nodesToBeVisit.shift()
    if (currentNode.isWall) continue
    if (currentNode.distance === Infinity) return nodesVisited
    currentNode.isVisited = true
    if (currentNode.col === end.col && currentNode.row === end.row) {
      return nodesVisited
    }
    nodesVisited.push(currentNode)
    updateUnvisitedNeighbors(currentNode, grid);
  }
  return nodesVisited
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.prevNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function sortByDistance(nodes) {
  return nodes.sort((a, b) => a.distance - b.distance)
}


function getAllNodes(grid) {
  const nodes = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      nodes.push(grid[i][j])
    }
  }
  return nodes
}

function getShortestPath(lastNode) {
  let shortestPath = []
  let currentNode = lastNode
  while (currentNode.prevNode !== null) {
    shortestPath.unshift(currentNode)
    currentNode = currentNode.prevNode
  }
  return shortestPath
}



export { Dijkastra, getShortestPath }