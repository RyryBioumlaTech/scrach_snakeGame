let center = document.querySelector('#block');
let snake = document.querySelector("#head");
let xAlea = Math.floor(Math.random()*599 );
let yAlea = Math.floor(Math.random()*599 );
let bodyTab = [snake];
let gameBox = document.querySelector('#gameBox');
let retryBtn = document.querySelector("#retry");
let finalPoint = document.querySelector("#finalPoint");
var food;
var pushed;
let previousKey;
let speed = 10;
let n = 70;
let selfEaten = false;
let r = 'ArrowRight';
let l = 'ArrowLeft';
let u = 'ArrowUp';
let d = 'ArrowDown';
 
function createFood(){
    let xFood = Math.floor(Math.random()*595 );
    let yFood = Math.floor(Math.random()*595 );
    food = document.createElement('div');
    food.id = "food";
    food.style.marginLeft = `${xFood}px`;
    food.style.marginTop = `${yFood}px`;
    center.appendChild(food);
}

function listenCollision(mvmt){
    let abs1 = parseInt(food.style.marginLeft)-4;
    let abs2 = parseInt(food.style.marginLeft) +4;
    let ord1 = parseInt(food.style.marginTop)-4;
    let ord2 = parseInt(food.style.marginTop)+4;
    let absS = parseInt(snake.style.marginLeft);
    let ordS = parseInt(snake.style.marginTop);
    if(food && ((absS>=abs1)&&(absS<=abs2)&&( ordS<=ord2)&&(ordS>=ord1))){
        food.remove();
        let point = Number(document.querySelector("#point").textContent);
        point++;
        document.querySelector("#point").textContent = point;
        let snake_body;
        let previous = bodyTab[bodyTab.length -1];
        if(mvmt == r){
            snake_body = document.createElement("div");
            snake_body.classList.add("snakeBody");
            bodyTab.push(snake_body);
            snake_body.style.marginLeft = `${parseInt(previous.style.marginLeft)-10}px`;
            snake_body.style.marginTop = `${parseInt(previous.style.marginTop)}px`;
            center.appendChild(snake_body);
            setTimeout(()=>{
                snake_body.style.display = "block"
            },100*bodyTab.length)
        }else if(mvmt == l){
            snake_body = document.createElement("div");
            snake_body.classList.add("snakeBody");
            bodyTab.push(snake_body);
            snake_body.style.marginLeft = `${parseInt(previous.style.marginLeft)+10}px`;
            snake_body.style.marginTop = `${parseInt(previous.style.marginTop)}px`;
            center.appendChild(snake_body);
            setTimeout(()=>{
                snake_body.style.display = "block"
            },100*bodyTab.length)
        }else if(mvmt == d){
            snake_body = document.createElement("div");
            snake_body.classList.add("snakeBody");
            bodyTab.push(snake_body);
            snake_body.style.marginLeft = `${parseInt(previous.style.marginLeft)}px`;
            snake_body.style.marginTop = `${parseInt(previous.style.marginTop)-10}px`;
            center.appendChild(snake_body);
            setTimeout(()=>{
                snake_body.style.display = "block"
            },100*bodyTab.length)
        }else if(mvmt == u){
            snake_body = document.createElement("div");
            snake_body.classList.add("snakeBody");
            bodyTab.push(snake_body);
            snake_body.style.marginLeft = `${parseInt(previous.style.marginLeft)}px`;
            snake_body.style.marginTop = `${parseInt(previous.style.marginTop)+10}px`;
            center.appendChild(snake_body);
            setTimeout(()=>{
                snake_body.style.display = "block"
            },100*bodyTab.length)
        }
        createFood();
        if(point%10 == 0){
            console.log(point);
            speed/=1.2;
            // n /= 1.2;
        }
    }
}
        
function stopGame(el,pt){
    clearInterval();
    pt.textContent = count.textContent;
    el.style.display = "block";
    document.removeEventListener("keydown",deplacement);
}

function deplacement(e){
    if(['ArrowLeft','ArrowDown','ArrowRight','ArrowUp'].includes(e.key)){
        e.stopImmediatePropagation();
        e.preventDefault();
    }
    var start = parseInt(snake.style.marginLeft);
    var startY = parseInt(snake.style.marginTop);
    
    switch (e.key) {
        case r:
           if (previousKey != l) {
                if(pushed){
                    clearInterval(pushed);
                }
                pushed = setInterval(() => {
                    if(start === 590 || selfEaten ){
                        stopGame(gameBox, finalPoint);
                    }else{
                        
                        let previousX = parseInt(snake.style.marginLeft);
                        let previousY = parseInt(snake.style.marginTop);
                        start++ ;
                        snake.style.marginLeft = start + 'px';
                        listenCollision(r);
                        for (let k = 1; k <= bodyTab.length - 1; k++) {
                            let bodyCurrentPosX = parseInt(bodyTab[k].style.marginLeft);
                            let bodyCurrentPosY = parseInt(bodyTab[k].style.marginTop);
                            if ((start>=bodyCurrentPosX -3) &&(start<=bodyCurrentPosX +3) && (startY>=bodyCurrentPosY -3) && (startY<=bodyCurrentPosY +3)){
                                selfEaten = true; 
                                
                            } 
                        }
                        for(let i = 1; i<=bodyTab.length -1; i++){
                            setTimeout(() => {            
                                bodyTab[i].style.marginLeft = previousX + 'px';
                                bodyTab[i].style.marginTop = previousY + 'px';
                            }, n*i);
                        }
                    }
                }, speed);
                previousKey = r;
            }
            
            break;
        case d:
            if (previousKey != u) {
                if(pushed){
                    clearInterval(pushed);
                }
                pushed = setInterval(() => {
                    if(startY === 590 || selfEaten){
                        stopGame(gameBox, finalPoint);
                    }else{
                        
                        let previousX = parseInt(snake.style.marginLeft);
                        let previousY = parseInt(snake.style.marginTop);
                        startY++;
                        snake.style.marginTop = startY + 'px';
                        listenCollision(d);
                        for (let k = 1; k <= bodyTab.length - 1; k++) {
                            let bodyCurrentPosX = parseInt(bodyTab[k].style.marginLeft);
                            let bodyCurrentPosY = parseInt(bodyTab[k].style.marginTop);
                            if ((start>=bodyCurrentPosX -3) &&(start<=bodyCurrentPosX +3) && (startY>=bodyCurrentPosY -3) && (startY<=bodyCurrentPosY +3)){
                                selfEaten = true; 
                                
                            }
                           
                        }
                        for(let i = 1; i<=bodyTab.length -1; i++){
                            setTimeout(() => {
                                bodyTab[i].style.marginLeft = previousX + 'px';
                                bodyTab[i].style.marginTop = previousY + 'px';
                            }, n*i);
                        }
                    }
                }, speed);
                previousKey = d;
            }
            
            break;
        case l:
            if (previousKey != r) {
                if(pushed){
                    clearInterval(pushed);
                }
                pushed = setInterval(() => {
                    if(start === 0 || selfEaten){
                        stopGame(gameBox, finalPoint);
                    }else{
                        
                        let previousX = parseInt(snake.style.marginLeft);
                        let previousY = parseInt(snake.style.marginTop);
                        start--;
                        snake.style.marginLeft = start + 'px';
                        listenCollision(l);
                        for (let k = 1; k <= bodyTab.length - 1; k++) {
                            let bodyCurrentPosX = parseInt(bodyTab[k].style.marginLeft);
                            let bodyCurrentPosY = parseInt(bodyTab[k].style.marginTop);
                            if ((start>=bodyCurrentPosX -3) &&(start<=bodyCurrentPosX +3) && (startY>=bodyCurrentPosY -3) && (startY<=bodyCurrentPosY +3)){
                                selfEaten = true;
                                
                            }
                            
                        }
                        for(let i = 1; i<=bodyTab.length -1; i++){
                            setTimeout(() => {   
                                bodyTab[i].style.marginLeft = previousX + 'px';
                                bodyTab[i].style.marginTop = previousY + 'px';
                            }, n*i);
                        }
                    }
                }, speed);
                previousKey = l;
            }
            
            break;
        case u:
            if (previousKey != d) {
                if(pushed){
                    clearInterval(pushed);
                }
                pushed = setInterval(() => {
                    if(startY === 0 || selfEaten){
                        stopGame(gameBox, finalPoint);
                    }else{
                        
                        let previousX = parseInt(snake.style.marginLeft);
                        let previousY = parseInt(snake.style.marginTop);
                        startY--;
                        snake.style.marginTop = startY + 'px';
                        listenCollision(u);
                        for (let k = 1; k <= bodyTab.length - 1; k++) {
                            let bodyCurrentPosX = parseInt(bodyTab[k].style.marginLeft);
                            let bodyCurrentPosY = parseInt(bodyTab[k].style.marginTop);
                            if ((start>=bodyCurrentPosX -3) &&(start<=bodyCurrentPosX +3) && (startY>=bodyCurrentPosY -3) && (startY<=bodyCurrentPosY +3)){
                                selfEaten = true; 
                                
                            } 
                            
                        }
                        for(let i = 1; i<=bodyTab.length -1; i++){
                            setTimeout(() => {
                                bodyTab[i].style.marginLeft = previousX + 'px';
                                bodyTab[i].style.marginTop = previousY + 'px';
                            }, n*i);
                        } 
                    }
                }, speed);
                previousKey = u;
            }
            break;
        default:
            return;
    }
}

window.onload = ()=>{
    snake.style.marginLeft = `${xAlea}px`;
    snake.style.marginTop = `${yAlea}px`;
    createFood();
};
        
retryBtn.addEventListener("click",()=>{
    location.reload();
})

document.addEventListener("keydown",deplacement);