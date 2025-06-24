document.addEventListener('DOMContentLoaded',() =>{
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('#score')
    const resultDisplay = document.querySelector('#result')
    const reset = document.querySelector('#reset')
    const width = 4
    let squares = []
    let score = 0
    reset.addEventListener('click', resetGame)
    function createborad(){
        for(let i=0;i<width*width;i++){
            const square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
     generate_numbers()
     generate_numbers()
    }
    createborad()

    function generate_numbers(){
        const randomNumber= Math.floor(Math.random()* squares.length)
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2
        }
        else generate_numbers()
    }

    function moveright(){
        for(let i=0;i<16;i++){
            if(i%4==0){
                let total1 = squares[i].innerHTML
                let total2 = squares[i+1].innerHTML
                let total3 = squares[i+2].innerHTML
                let total4 = squares[i+3].innerHTML
                let row = [parseInt(total1),parseInt(total2),parseInt(total3),parseInt(total4)]

                let filterrow =row.filter(num =>num)
                let missing = 4 - filterrow.length
                let zeros = Array(missing).fill(0)
                let nrow  = zeros.concat(filterrow)
                squares[i].innerHTML = nrow[0]
                squares[i+1].innerHTML = nrow[1]
                squares[i+2].innerHTML = nrow[2]
                squares[i+3].innerHTML = nrow[3]
               

            }
        }

    }
    function moveleft(){
        for(let i=0;i<16;i++){
            if(i%4 == 0){
                let total1 = squares[i].innerHTML
                let total2 = squares[i+1].innerHTML
                let total3 = squares[i+2].innerHTML
                let total4 = squares[i+3].innerHTML
                let row = [parseInt(total1),parseInt(total2),parseInt(total3),parseInt(total4)]

                let filterrow =row.filter(num =>num)
                let missing = 4 - filterrow.length
                let zeros = Array(missing).fill(0)
                let nrow  = filterrow.concat(zeros)
                squares[i].innerHTML = nrow[0]
                squares[i+1].innerHTML = nrow[1]
                squares[i+2].innerHTML = nrow[2]
                squares[i+3].innerHTML = nrow[3]
               

            }
        }

    }
    function moveup(){
        for(let i=0;i<4;i++){
            
                let total1 = squares[i].innerHTML
                let total2 = squares[i+width].innerHTML
                let total3 = squares[i+width+width].innerHTML
                let total4 = squares[i+width+width+width].innerHTML
                let column = [parseInt(total1),parseInt(total2),parseInt(total3),parseInt(total4)]

                let filtercolumn =column.filter(num =>num)
                let missing = 4 - filtercolumn.length
                let zeros = Array(missing).fill(0)
                let ncolumn  = filtercolumn.concat(zeros)
                squares[i].innerHTML = ncolumn[0]
                squares[i+width].innerHTML = ncolumn[1]
                squares[i+width+width].innerHTML = ncolumn[2]
                squares[i+width+width+width].innerHTML = ncolumn[3]
               

            
        }

    }
    function movedown(){
        for(let i=0;i<4;i++){
            
                let total1 = squares[i].innerHTML
                let total2 = squares[i+width].innerHTML
                let total3 = squares[i+width+width].innerHTML
                let total4 = squares[i+width+width+width].innerHTML
                let column = [parseInt(total1),parseInt(total2),parseInt(total3),parseInt(total4)]

                let filtercolumn =column.filter(num =>num)
                let missing = 4 - filtercolumn.length
                let zeros = Array(missing).fill(0)
                let ncolumn  = zeros.concat(filtercolumn)
                squares[i].innerHTML = ncolumn[0]
                squares[i+width].innerHTML = ncolumn[1]
                squares[i+width+width].innerHTML = ncolumn[2]
                squares[i+width+width+width].innerHTML = ncolumn[3]
               

            
        }

    }
    function combinecolumn(){
        for(let i =0;i<12;i++){
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let comtotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = comtotal
                squares[i+width].innerHTML = 0
                score += comtotal
                scoreDisplay.innerHTML = score
            }    
        }
        checkwin()
        checkover()
    }
    function combinerow(){
        for(let i =0;i<15;i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let comtotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = comtotal
                squares[i+1].innerHTML = 0
                score += comtotal
                scoreDisplay.innerHTML = score
            }    
        }
        checkwin()
        checkover()
    }

    function control(e){
        if (e.key === 'ArrowLeft'){
            keyleft()
        }
        else if (e.key === 'ArrowRight'){
            keyright()
        }
        else if (e.key === 'ArrowUp'){
            keyup()
        }
        else if (e.key === 'ArrowDown'){
            keydown()
        }
    }
    document.addEventListener('keydown',control)

    function keyleft(){
        moveleft()
        combinerow()
        moveleft()
        generate_numbers()
    }
    function keyright(){
        moveright()
        combinerow()
        moveright()
        generate_numbers()
    }
    function keyup(){
        moveup()
        combinecolumn()
        moveup()
        generate_numbers()
    }
    function keydown(){
        movedown()
        combinecolumn()
        movedown()
        generate_numbers()
    }
    function checkwin(){
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 2048){
                resultDisplay.innerHTML = 'YOU WIN!'
                document.removeEventListener('keydown',control)
                setTimeout(clear(),3000)
            }
        }
    }
    function checkover(){
        let zeross = 0
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 0){
               zeross++
            }
        }
        if (zeross === 0){
            resultDisplay.innerHTML = 'YOU LOSE!'
            document.removeEventListener('keydown',control)
            setTimeout(clear(),3000)
        }
    }
    function resetGame(e) {
    score = 0
    scoreDisplay.innerHTML = score
    resultDisplay.innerHTML = 'Join the numbers to get the <b>2048</b> title!'
    for(let i=0; i < squares.length; i++) {
        squares[i].innerHTML = 0
    }
    generate_numbers()
    generate_numbers()
    document.addEventListener('keydown', control)
    addcolors() 
    clearInterval(timer) 
    timer = setInterval(addcolors, 50)
}
    function clear(){
        clearInterval(timer)
    }
    function addcolors(){
        for(let i=0;i<squares.length;i++){
            if(squares[i].innerHTML == 0)squares[i].style.backgroundColor ='cornflowerblue'
            else if(squares[i].innerHTML == 2)squares[i].style.backgroundColor =' #FFFFFF'
            else if(squares[i].innerHTML == 4)squares[i].style.backgroundColor =' #a3b2d1'
            else if(squares[i].innerHTML == 8)squares[i].style.backgroundColor =' #8980cf'
            else if(squares[i].innerHTML == 16)squares[i].style.backgroundColor ='rgb(122, 56, 245)'
            else if(squares[i].innerHTML == 32)squares[i].style.backgroundColor =' #bd5df5'
            else if(squares[i].innerHTML == 64)squares[i].style.backgroundColor =' #266afc'
            else if(squares[i].innerHTML == 128)squares[i].style.backgroundColor =' #3e4d69'
            else if(squares[i].innerHTML == 256)squares[i].style.backgroundColor =' #6614a8'
            else if(squares[i].innerHTML == 512)squares[i].style.backgroundColor =' #46  3554'
            else if(squares[i].innerHTML == 1024)squares[i].style.backgroundColor =' #0a33ff'
            else if(squares[i].innerHTML == 2048)squares[i].style.backgroundColor =' #f73636'
        }
    }
    addcolors()
    let timer = setInterval(addcolors,50)
})