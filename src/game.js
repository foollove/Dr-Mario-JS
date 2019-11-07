import InputHandler from './input';
import Board from './board';
import Pill from './pill';


const COLORS = ["red", "yellow", "blue"];

export default class Game {

  constructor(gameWidth, gameHeight, margin, squareWidth, squareHeight, 
      spritesheet, level) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.margin = margin;
    this.squareWidth = squareWidth;
    this.squareHeight = squareHeight;
    this.spritesheet = spritesheet;
    this.level = level ? level : 0;

    this.board = new Board(this);
    this.board.populateViruses();
    console.log(this.board);

    this.fallenPills = [];
    // this.generatePill = this.generatePill.bind(this);

    this.currentPill = this.generatePill();
    this.nextPill = this.generatePill();
  }

  start() {
    this.gameObjects = [
      ...this.board.viruses,
      ...this.fallenPills,
      this.currentPill
    ];

    this.currentHandler = new InputHandler(this.currentPill);
  }

  generatePill() {
    let c0 = COLORS[Math.floor(Math.random() * 3)];
    let c1 = COLORS[Math.floor(Math.random() * 3)];

    let newPill = new Pill({
      colors: [c0, c1],
      game: this
    });

    return newPill;
  }

  loadNextPill() {
    this.fallenPills.push(this.currentPill);
    this.currentHandler.removeListener();

    const that = this;

    window.setTimeout(function(){
      that.currentPill = that.nextPill;
      that.gameObjects.push(that.currentPill);
      that.currentHandler = new InputHandler(that.currentPill);

      that.nextPill = that.generatePill();
    }, 500);
  }

  update(timestamp) {
    this.gameObjects.forEach(object => object.update(timestamp));
  }

  draw(ctx) {
    this.gameObjects.forEach(object => object.draw(ctx));
  }
}