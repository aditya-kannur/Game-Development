document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid")
  let squares = Array.from(document.querySelectorAll("#grid div"))
  // console.log(squares)
  // const startButton = document.getElementById("start-button")
  var scoresDisplay = document.getElementById("scores")
  let nextRandom = 0
  let timerId;
  let scores = 0
  
  const width = 10

  const lTetromino = [
    [1,width+1,width*2+1,2],
    [width,width+1,width+2,width*2+2],
    [1,width+1,width*2+1,width*2],
    [width,width*2,width*2+1,width*2+2]
  ]

  const zTetromino = [
    [0,width,width+1, width*2+1],
    [width+1,width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1,width+2,width*2,width*2+1]
  ]

  const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]


  const theTetriminos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
  // console.log(theTetriminos[0][0])

  currentPosition = 4

  currentrotation = 0

  random = Math.floor(Math.random()*theTetriminos.length)

  current = theTetriminos[random][currentrotation]
  console.log(current)

  function draw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.add("tetrimino")
    })
  }

  function undraw () {
    current.forEach(index=> {
      squares[currentPosition + index].classList.remove("tetrimino")
    })
  }

  timerId = setInterval(movedown, 400) 


  function freeze () {
    if(current.some(index => squares[currentPosition+index+width].classList.contains("taken"))){
      current.forEach(index => squares[currentPosition + index].classList.add("taken"))
      random = nextRandom
      nextRandom = Math.floor(Math.random()*theTetriminos.length)
      current = theTetriminos[random][currentrotation]
      currentPosition = 4
      draw()
      displayShape()
      addscore()
      gameOver()
    }
  }

  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    }else if (e.keyCode === 40) {
      movedown();
    }
  }
  
  document.addEventListener('keyup', control);
  

  function movedown() {
    undraw()
    currentPosition += width
    draw()
    freeze()

  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
    if (!isAtLeftEdge) currentPosition -= 1;
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    draw();
  }
  
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
    if (!isAtRightEdge) currentPosition += 1;
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }
    draw();
  }
  function rotate() {
    undraw()
    currentrotation ++
    if (currentrotation === current.length) {
      currentrotation = 0
    }current = theTetriminos[random][currentrotation]
    draw()
  }
  const displaySquares = document.querySelectorAll(".display")
  const displayWidth = 4
  let displayIndex = 1

  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //ltetromino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
    [0, 1, displayWidth, displayWidth+1], //oTetromino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
  ]

  function displayShape() {
    displaySquares.forEach(squares => {
      squares.classList.remove("tetrimino")
    })
    upNextTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add("tetrimino")
      // displaySquares[displayIndex + index].classList.add("tetrimin")
    })
  }


  // startButton.addEventListener("click", () => {
  //   if (timerId){
  //     clearInterval(timerId)
  //     timerId = null
  //   }else {
  //     draw()
  //     timerId = setInterval(movedown, 500)
  //     nextRandom = Math.floor(Math.random() * theTetriminos.length)
  //     displayShape()
  //   }

  // })

  function addscore() {
    for (var i=0; i<199; i+=width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

      if (row.every(index => squares[index].classList.contains("taken"))) {
        scores += 10
        scoresDisplay.innerHTML = scores
        row.forEach(index => {
          squares[index].classList.remove("taken")
          squares[index].classList.remove("tetrimino")
  
        })
        const sqaureRemoved = squares.splice(i, width)
        squares = sqaureRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
      // scoresDisplay.innerHTML = "NO"
      clearInterval(timerId)
      window.location.href="./gameOver.html"
    }
    localStorage.setItem("scores", scores);

  }
  

})