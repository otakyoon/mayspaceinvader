import Invader from "./Invader.js";
import MovingDirection from "./movingDirection.js";

export default class InvaderController {
    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 1;

    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;

    moveDownTimerDefault = 10;
    moveDownTimer =this.moveDownTimerDefault;

    level = 1;

    invadersMap = [
        [1,1,1,1,1,1,1,1,1,1]
    ];

    heartMap = [
        [0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
        [0, 2, 3, 3, 2, 2, 3, 3, 2, 0],
        [2, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [0, 2, 3, 3, 3, 3, 3, 3, 2, 0],
        [0, 0, 2, 3, 3, 3, 3, 2, 0, 0]
    ];

    starMap = [
        [0, 0, 0, 3, 0, 3, 0, 0, 0, 0],
        [0, 0, 3, 3, 3, 3, 3, 0, 0, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 0, 0],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 0, 0],
        [0, 0, 3, 3, 3, 3, 3, 0, 0, 0]
    ];

    arrowUpMap = [
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0, 0],
        [0, 0, 2, 2, 2, 2, 2, 0, 0, 0],
        [0, 2, 2, 2, 2, 2, 2, 2, 0, 0],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0]
    ];

    smileyMap = [
        [0, 0, 2, 2, 2, 2, 2, 2, 0, 0],
        [0, 2, 3, 3, 2, 2, 3, 3, 2, 0],
        [2, 3, 3, 3, 2, 2, 3, 3, 3, 2],
        [2, 3, 2, 3, 3, 3, 3, 2, 3, 2],
        [2, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [0, 2, 3, 3, 3, 3, 3, 3, 2, 0]
    ];

    diamondMap = [
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 3, 2, 0, 0, 0, 0],
        [0, 0, 2, 3, 3, 3, 2, 0, 0, 0],
        [0, 2, 3, 3, 3, 3, 3, 2, 0, 0],
        [2, 3, 3, 3, 3, 3, 3, 3, 2, 0],
        [0, 2, 3, 3, 3, 3, 3, 2, 0, 0]
    ];
    
    waveMap = [
        [0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
        [0, 2, 2, 3, 2, 2, 3, 2, 2, 0],
        [2, 2, 3, 3, 3, 3, 3, 3, 2, 2],
        [2, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [0, 2, 3, 3, 3, 3, 3, 3, 2, 0],
        [0, 0, 2, 2, 0, 0, 2, 2, 0, 0]
    ];

    invadersRows=[];
    
    
    constructor(canvas, invadersBulletController, playerBulletController){
        this.canvas= canvas;

        this.createInvaders();
        this.invadersBulletController = invadersBulletController;
        this.playerBulletController=playerBulletController;
    }
    reset () {
        this.currentDirection = MovingDirection.right;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.defaultXVelocity = 1;
        this.defaultYVelocity = 1;

        this.fireBulletTimerDefault = 100;
        this.fireBulletTimer = this.fireBulletTimerDefault;

        this.moveDownTimerDefault = 30;
        this.moveDownTimer =this.moveDownTimerDefault;

        this.createInvaders();


    }

    draw(ctx){
        this.decrementMoveDownTimer();
        this.drawInvaders(ctx);
        this.fireBullet();
        this.updateVelocityAndDirection();
        this.resetMoveDownTimer();
        this.collisionDetection();
    }

    drawInvaders(ctx){
        this.invadersRows.flat().forEach((invader)=>{
            invader.draw(ctx);
            invader.move(this.xVelocity, this.yVelocity);
        })
    }

    createInvaders() {
        const allTables = [this.invadersMap, this.heartMap, this.starMap, this.arrowUpMap, this.smileyMap, this.diamondMap, this.waveMap];
        const rand = Math.floor(Math.random() * allTables.length);
        const soloTable = allTables[rand];

        soloTable.forEach((row, rowIndex) => {
            this.invadersRows[rowIndex] = [];
            row.forEach((invaderNumber, invaderIndex)=>{
                if(invaderNumber>0){
                    this.invadersRows[rowIndex].push(
                        new Invader(invaderIndex*50, rowIndex*35, invaderNumber)

                    );
                }
            })
        })
    }

    // Fonction reset pour le IvaderController

    reset () {
        this.currentDirection = MovingDirection.right;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.defaultXVelocity = 1;
        this.defaultYVelocity = 1;
    
        this.fireBulletTimerDefault = 100;
        this.fireBulletTimer = this.fireBulletTimerDefault;
    
        this.moveDownTimerDefault = 30;
        this.moveDownTimer =this.moveDownTimerDefault;

        this.createInvaders();
    }




    fireBullet(){
        this.fireBulletTimer--;
        if(this.fireBulletTimer<=0){
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allInvaders = this.invadersRows.flat();
            const invaderIndex = Math.floor(Math.random()*allInvaders.length);
            const invader = allInvaders[invaderIndex];
            this.invadersBulletController.shoot(invader.x+invader.width/2, invader.y,-3);
        }
    }

    updateVelocityAndDirection (){
        for(const invaderRow of this.invadersRows){
            if(this.currentDirection === MovingDirection.right){
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity=0;
                const rightMostInvader = invaderRow[invaderRow.length-1];
                if(rightMostInvader.x+rightMostInvader.width>=this.canvas.width){
                    this.currentDirection = MovingDirection.downLeft;
                    console.log("this.currentDirection "+this.currentDirection);
                    break;
                }
            }else if(this.currentDirection === MovingDirection.downLeft){
                if(this.moveDown(MovingDirection.left)){
                    break;
                }
            }else if(this.currentDirection === MovingDirection.left){
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity=0;
                const leftMostInvader = invaderRow[0];
                if(leftMostInvader.x<=0){
                    this.currentDirection = MovingDirection.downRight;
                    console.log("this.currentDirection "+this.currentDirection);

                    break;
                }
            }else if(this.currentDirection === MovingDirection.downRight){
                if(this.moveDown(MovingDirection.right)){
                    break;
                }
            }
        }

    }

    moveDown(newDirection){
        this.xVelocity = 0;
        this.yVelocity = 1;

        if(this.moveDownTimer<=0){
            this.currentDirection = newDirection;
            console.log("this.currentDirection "+this.currentDirection);

            return true;
        }
        return false;
    }

    collisionDetection(){
        this.invadersRows.forEach((invaderRow)=>{
            invaderRow.forEach((invader, invaderIndex)=>{
                if(this.playerBulletController.collideWith(invader)){
                    console.log("type : ",invader.type);
                    if(invader.type > 1){
                        invader.type--;
                        invader.sprite.src = invader.getImage(invader.type);
                    }else{
                        invaderRow.splice(invaderIndex, 1);
                    }
                }
            });
        });
        this.invadersRows = this.invadersRows.filter((invaderRow)=> invaderRow.length>0);
    }

    resetMoveDownTimer(){
        if(this.moveDownTimer<=0){
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer(){
        if(this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight){
            this.moveDownTimer--;
        }
    }

    collideWith(sprite) {
        return this.invadersRows.flat().some((invader) => invader.collideWith(sprite));
    }

    updateLevel(){
        this.level++;
        document.querySelector("#level").innerHTML = this.level;
    }
    resetLevel(){
        this.level = 1;
        document.querySelector("#level").innerHTML = this.level;
    }
}