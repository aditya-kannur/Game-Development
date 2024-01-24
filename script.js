document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid")
  let squares = Array.from(document.querySelectorAll("#grid div"))
  var scoresDisplay = document.getElementById("scores")
  var linesDisplay = document.getElementById("lines")
  let nextRandom = 0
  let timerId;
  let scores = 0
  let lines = 0
  const colors = [
    'orange',
    'red',
    'purple',
    'green',
    'pink'
  ]
  
  const width = 10

  // All tetriminoes and their rotations
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

  currentPosition = 4
  currentrotation = 0

  // randomly selecting tetromino
  random = Math.floor(Math.random()*theTetriminos.length)
  current = theTetriminos[random][currentrotation]
  
  //draw tetromino
  function draw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.add("tetromino")
      squares[currentPosition + index].style.backgroundColor = colors[random]
    })
  }

  //undraw tetromino
  function undraw () {
    current.forEach(index=> {
      squares[currentPosition + index].classList.remove("tetromino")
      squares[currentPosition + index].style.backgroundColor = ''
    })
  }

  // make tetromino move down every half second
  timerId = setInterval(movedown, 500) 

  // assign functions of the keycodes
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
    else if (e.keyCode === 32) {
      pause()
    }
  }
  document.addEventListener('keyup', control);


  // stop the tetromino once they reach bottom line
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

  //movedown
  function movedown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  //move tetromino left, unless at edge
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
    if (!isAtLeftEdge) currentPosition -= 1;
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1;
    }
    draw();
  }
  
  //move tetromino right, unless at edge
  function moveRight() {
    undraw();   
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
    if (!isAtRightEdge) currentPosition += 1;
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1;
    }
    draw();
  }

  // rotate tetromino
  function rotate() {
    undraw()
    currentrotation ++
    if (currentrotation === current.length) {
      currentrotation = 0
    }current = theTetriminos[random][currentrotation]
    draw()
  }


  // show up next tetromino in mini-grid display
  const displaySquares = document.querySelectorAll(".display")
  const displayWidth = 4
  let displayIndex = 1

  // tetromino without rotation
  const upNextTetrominoes = [
    [1, displayWidth+1, displayWidth*2+1, 2], //ltetromino  
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino     
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino  
    [0, 1, displayWidth, displayWidth+1], //oTetromino    
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino     
  ]

  // display shape in mini-grid
  function displayShape() {
    displaySquares.forEach(squares => {
      squares.classList.remove("tetromino")
      squares.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add("tetromino")
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }
  displayShape()

  // pause and play button
  function pause() {
    if (timerId){
      clearInterval(timerId)
      timerId = null

    }else {
      draw()
      timerId = setInterval(movedown, 500)
      displayShape()
    }
  }


  // add scores
  function addscore() {
    for (var i=0; i<199; i+=width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
      if (row.every(index => squares[index].classList.contains("taken"))) {
        scores += 10
        lines += 1
        linesDisplay.innerHTML = lines
        scoresDisplay.innerHTML = scores
        row.forEach(index => {
          squares[index].classList.remove("taken")
          squares[index].classList.remove("tetromino")
          squares[index].style.backgroundColor = ''
        })
        const sqaureRemoved = squares.splice(i, width)
        squares = sqaureRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  // game over function
  function gameOver() {
    if (current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
      // scoresDisplay.innerHTML = "NO"
      clearInterval(timerId)
      window.location.href="./gameOver.html"
    }
    localStorage.setItem("scores", scores);
    localStorage.setItem("lines", lines)
  }
})

// Game-Development/assets/05. C-Type Music.mp3