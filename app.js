let table = document.querySelector('#table')
let table_arr = []
let map = []
let true_time = 300
let time = true_time
let time_short = true_time/5
let height = 20
let width = 14
let block
let colors = ['gray','red','green','blue']
let blocks = [
    [
        [
            [1,1],
            [1,1]
        ],
        [
            [1,1],
            [1,1]
        ],
        [
            [1,1],
            [1,1]
        ],
        [
            [1,1],
            [1,1]
        ]
    ],
    [
        [
            [2,2,2,2]
        ],
        [
            [2],
            [2],
            [2],
            [2]
        ],
        [
            [2,2,2,2]
        ],
        [
            [2],
            [2],
            [2],
            [2]
        ]
    ],
    [
        [
            [3,3],
            [3,0]
        ],
        [
            [3,3],
            [0,3]
        ],
        [
            [0,3],
            [3,3]
        ],
        [
            [3,0],
            [3,3]
        ]
    ],
    [
        [
            [3,3],
            [3,0],
            [3,0]
        ],
        [
            [3,3,3],
            [0,0,3]
        ],
        [
            [0,3],
            [0,3],
            [3,3]
        ],
        [
            [3,0,0],
            [3,3,3]
        ]
    ]
]
function randomNumber(max){
    return Math.floor((Math.random())*max)
}

for(let a = 0; a < height; a++){
    let tr = document.createElement('tr')
    let help_arr = []
    let help_map_arr = []
    for(let b = 0; b < width; b++){
        let td = document.createElement('td')
        tr.appendChild(td)
        help_arr.push(td)
        help_map_arr.push(0)
    }
    table.appendChild(tr)
    table_arr.push(help_arr)
    map.push(help_map_arr)
}

function drawMap(){
    for(let a = 0; a < height; a++){ 
        for(let b = 0; b < width; b++){
            table_arr[a][b].style.backgroundColor = colors[map[a][b]]
        }
    }
}

let y
let x

let direction = 0
let move_direction = 0
let help_map = []
let flag_rotate = false
document.addEventListener('keydown', (e)=>{
    if(flag_rotate == false){
        flag_rotate = true
        if(e.key == 'w' || e.key == 'W' || e.key == 'ц' || e.key == 'Ц' || e.key == 'ArrowUp'){
            let new_x = block[move_direction][0].length/2
            if(block[move_direction][0].length % 2 == 1){
                new_x = Math.ceil(new_x)
            }
            if(move_direction % 2 == 1){
                x-=Math.ceil(block[0][0].length/2)-1
            }else{
                x+=new_x-1
            }
            move_direction++
        }
        if(e.key == 's' || e.key == 'S' || e.key == 'ы' || e.key == 'Ы' || e.key == 'ArrowDown'){
            move_direction--
        }
        if(move_direction < 0){
            move_direction = 3
        }
        if(move_direction > 3){
            move_direction = 0
        }  
    }
    if(e.key == ' '){
        time = time_short
    }
    if(e.key == 'a' || e.key == 'A' || e.key == 'ф' || e.key == 'Ф' || e.key == 'ArrowLeft'){
        direction = -1
    }
    if(e.key == 'd' || e.key == 'D' || e.key == 'в' || e.key == 'В' || e.key == 'ArrowRight'){
        direction = +1
    }

})
function spawnBlock(){
    help_map = []
    for(let a = 0; a<map.length; a++){
        let arr = []
        for(let b = 0; b<map[a].length;b++){
            arr.push(map[a][b])
        }
        help_map.push(arr)
    }
    block = blocks[randomNumber(blocks.length)]
    y = 0
    x = Math.floor(width/2) - Math.floor(block[move_direction][0].length/2)
    for(let a = 0; a<block[move_direction].length; a++){
        for(let b = 0; b<block[move_direction][a].length;b++){
            if(help_map[a][b] != 0){
                flag_touch = true
            }
        }

    }
    
    if(y == 0 & flag_touch == true){
        alert('sdf')
    }else{
        drawBlock()
    }
}
let flag_touch = false
function drawBlock(){
    let help_y = y
    x+=direction
    for(let a = 0; a<block[move_direction].length; a++){
        
        let help_x = x
        
        for(let b = 0; b<block[move_direction][a].length; b++){
            if(block[move_direction][a][b] != 0){
                map[y][x] = block[move_direction][a][b]
                
            }
            x++
        }
        y++
        x = help_x
    }
    y = help_y
    direction = 0
    drawMap()
    flag_rotate = false
    let h
    let block_arr = []
    for(let l = 0; l <block[move_direction][block[move_direction].length-1].length;l++){

        if(y != height-block[move_direction].length & y != 0){
            for(h = block[move_direction].length; map[y+h-1][x+l] == 0; h--){
                
            }
            block_arr.push(h-1)
        }  
    }

    for(let b_l = 0; b_l<block_arr.length; b_l++){
        if(y != height-block[move_direction].length){
            if(map[y+block_arr[b_l]+1][x+b_l] != 0){
                flag_touch = true
            }
        }
    }
    if(y == height-block[move_direction].length || flag_touch == true){
        flag_touch = false
        move_direction = 0
        spawnBlock()
    }else{
        drawMap()
        setTimeout(moveBlock, time)
        time = true_time 
    }
    
}
function moveBlock(){
    for(let a = 0; a<help_map.length; a++){
        for(let b = 0; b<help_map[a].length;b++){
            map[a][b] = help_map[a][b]
        }
    }
    y++
    drawBlock()
}

spawnBlock()