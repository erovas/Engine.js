/*
  ____  _               _   _           _       _
 / ___|| | _____      _| | | | __ _  __| | ___ | | _____ _ __
 \___ \| |/ _ \ \ /\ / / |_| |/ _` |/ _` |/ _ \| |/ / _ \ '_ \
  ___) | | (_) \ V  V /|  _  | (_| | (_| | (_) |   <  __/ | | |
 |____/|_|\___/ \_/\_/ |_| |_|\__,_|\__,_|\___/|_|\_\___|_| |_|  */

 /**
  * @type {HTMLCanvasElement} 
  */
 let canvas = document.getElementById("partitionedCanvas");
 
 let context = canvas.getContext("2d");
 let canvasWidth = canvas.width = 500;
 let canvasHeight = canvas.height = 300;

 context.imageSmoothingEnabled = false;
 context.mozImageSmoothingEnabled = false;
 context.oImageSmoothingEnabled = false;
 context.webkitImageSmoothingEnabled = false;

 
 /**
  * 
  * @param {AABB} aabb 
  */
 let Entity = function(aabb) {
   this.id = 0;
   this.isColliding = false;
   this.aabb = aabb;
   this.vx = 5;
   this.vy = 5;
 };

 Entity.prototype.update = function(){

  let x = this.aabb.pos.x;
  let y = this.aabb.pos.y;
  let vx = this.vx;
  let vy = this.vy;

  x += vx;
  y += vy;

  if(y > canvasHeight){
    this.vy = -vy;
    y = canvasHeight;
  }

  if(y < 0){
    this.vy = -vy;
    y = 0;
  }

  if(x > canvasWidth){
    this.vx = -vx;
    x = canvasWidth
  }

  if(x < 0){
    this.vx = -vx;
    x = 0
  }

  this.aabb.pos.x = x;
  this.aabb.pos.y = y;
 }
 
 let AABB = function(x,y,half,halfHeight) {
   this.pos = { x: x, y: y};    //Se está tomando x,y como el centro del cuadrado
   this.half = { x: half, y: halfHeight || half };
 };
 
 // Uniform Spatial Partitioning Grid
 // built using examples by Andrew Petersen and Liam Brummitt
let SpatialGrid = function(gridWidth,gridHeight,bucketSize) {
   let spatialGrid = {};
   
   let _bucketSize = bucketSize || 100;
   // A spatial grid is composed of regions, buckets, and pairs.
   spatialGrid.buckets = {}; // {"column,row":[entities]}  //Guarda todas las entidades que estan en una misma celda
   spatialGrid.pairs = [];   // [{"entityA:entityB":[pair]}]
   
   // gets row and column in grid from x and y Cartesian coordinates of bounding box
   let _getRegion = function(aabb) {
     let startCol = parseInt((aabb.pos.y - aabb.half.y) / _bucketSize);
     let endCol = parseInt((aabb.pos.y + aabb.half.y) / _bucketSize);
     let startRow = parseInt((aabb.pos.x - aabb.half.x) / _bucketSize);
     let endRow = parseInt((aabb.pos.x + aabb.half.x) / _bucketSize);
     let regions = [];
     let i = 0;
     // for each row and column the entity overlaps create a region
     for (let y = startCol; y <= endCol; y++) {
       for (let x = startRow; x <= endRow; x++) {
         // regions are used as keys for buckets
         regions[i] = {
           id: x + "," + y,
           row: x,
           column: y
         };
         i++;
       }
     }
     return regions;
   };
   
   // A bucket is a region key and an array value. It's a hash for buffering.
   // creates buckets["columnX,columnY"][entities]
   let _createBuckets = function(entities) {
     for (let i = 0; i < entities.length; i++) {    
       let regions = _getRegion(entities[i].aabb);
       for (let j = 0; j < regions.length; j++) {
         if (spatialGrid.buckets[regions[j].id] === undefined) {
           // create bucket and add entity to it
           spatialGrid.buckets[regions[j].id] = [];
           spatialGrid.buckets[regions[j].id].push(entities[i]);
         } else {
           // add entity to existing bucket
           spatialGrid.buckets[regions[j].id].push(entities[i]);
         }
       }
     }
   };
   
   // A pair of entities in a bucket that could potentially collide.
   // creates pairs[[entityA,entityB]],[entityA,entityB]] etc.
   let _createPairs = function(bucket) {
     // skip a bucket that contains only one entity
     if (bucket.length > 1) {
       // create unique pairs (unordered)
       for (let i = 0; i < bucket.length; i++) {
         for (let j = 0; j < i; j++) {
           let pair = [bucket[i],bucket[j]];
           spatialGrid.pairs.push(pair);
         }
       }
     }
   };
   
   // aabb vs aabb collision detection
   let _intersectAABB = function(aabbA,aabbB) {
     let dx = aabbA.pos.x - aabbB.pos.x;
     let dy = aabbA.pos.y - aabbB.pos.y;
     let adx = dx < 0 ? -dx : dx;
     let ady = dy < 0 ? -dy : dy;
     let px = (aabbA.half.x + aabbB.half.x) - adx;
     let py = (aabbA.half.y + aabbB.half.y) - ady;
     // no collision
     if (px <= 0 || py <= 0) {
       return false;
     }
     // collision
     return true;
   };
   
   // resets entity collision flags and clears grid
   spatialGrid.clear = function(entities) {
     // reset collision flags
     for (let i = 0; i < entities.length; i++) {
       entities[i].isColliding = false;
     }
     // clear all buckets and pairs
     spatialGrid.buckets = {};
     spatialGrid.pairs = [];
   };
   
   // creates buckets
   spatialGrid.update = function(entities) {
     _createBuckets(entities);
   };
   
   // Creates potential collision pairs from buckets.
   spatialGrid.queryForCollisionPairs = function() {
     for (let key in spatialGrid.buckets) {
       let bucket = spatialGrid.buckets[key];
       _createPairs(bucket);
     }
   };
   
   // Simple narrow phase aabb vs aabb collision detection against each pair.
   spatialGrid.collision = function() {
     for (let i = 0; i < spatialGrid.pairs.length; i++) {
       // test for collision against each pair
       let pair = spatialGrid.pairs[i];
       let entityA = pair[0];
       let entityB = pair[1];
       let aabbA = entityA.aabb;
       let aabbB = entityB.aabb;
       // narrow phase collision test
       let isColliding = _intersectAABB(aabbA,aabbB);
       // we reset these flags in the clear method
       if (isColliding) {
         entityA.isColliding = true;
         entityB.isColliding = true;
       }
     }
   };
   
   // render buckets and entity's bounding boxes
   spatialGrid.render = function(ctx,entities) {
     // set background to black
     ctx.fillStyle = "black";
     ctx.fillRect(0,0,canvasWidth,canvasHeight);
     
     // render each occupied grid square i.e. bucket
     ctx.fillStyle = "grey";
     for (let i = 0; i < entities.length; i++) {
       let entity = entities[i];
       let region = _getRegion(entity.aabb);
       for (let j = 0; j < region.length; j++) {
         let row = region[j].row;
         let column = region[j].column;
         ctx.fillRect(row*_bucketSize,column*_bucketSize,_bucketSize,_bucketSize);
       }
     }
     
     // render each bucket as a stroke
     let gridWidth = canvasWidth/_bucketSize;
     let gridLength = (canvasWidth/_bucketSize) * (canvasHeight/_bucketSize);
     for (let i = 0; i < gridLength; i++) {
       let y = parseInt(i/gridWidth);
       let x = i%gridWidth;
       ctx.strokeStyle = "lightgrey";
       ctx.strokeRect(x*_bucketSize,y*_bucketSize,_bucketSize,_bucketSize);
     }
     
     // render entity's bounding boxes
     for (let i = 0; i < entities.length; i++) {
       let entity = entities[i];
       if (entity.isColliding) {
         ctx.fillStyle = "red";
       } else {
         ctx.fillStyle = "white";
       }
       ctx.fillRect(entity.aabb.pos.x-entity.aabb.half.x,
                    entity.aabb.pos.y-entity.aabb.half.y,
                    entity.aabb.half.x*2,
                    entity.aabb.half.y*2);
     }
   };
   // This grid is destroyed and rebuilt with everey step.
   return spatialGrid;
};
 
 let bucketSize = 25;  //Tamaño del tile, 100px de Ancho y Alto

 // You could factory these entities out with unique ids.
 //let aabb1 = new AABB(45,105,25);
 let aabb1 = new AABB(randomX(),randomY(),25);
 let entity1 = new Entity(aabb1);
 entity1.id = 1;

 //let aabb2 = new AABB(105,35,25);
 let aabb2 = new AABB(randomX(),randomY(),25);
 let entity2 = new Entity(aabb2);
 entity2.id = 2;
 
 //let aabb3 = new AABB(25,135,25);
 let aabb3 = new AABB(randomX(),randomY(),25);
 let entity3 = new Entity(aabb3);
 entity3.id = 3;
 
 //let aabb4 = new AABB(160,45,25);
 let aabb4 = new AABB(randomX(),randomY(),25);
 let entity4 = new Entity(aabb4);
 entity3.id = 4;
 
 // add entities to array below
 let entities = [entity1,entity2,entity3,entity4];
 
 // create an instance of a grid
 let grid = SpatialGrid(canvasWidth,canvasHeight,bucketSize);
 grid.clear(entities);
 grid.update(entities);
 grid.queryForCollisionPairs();
 grid.collision();
 
 grid.render(context,entities);


 setInterval(function(){

  for (let i = 0; i < entities.length; i++) {
    entities[i].update()
  }

  grid.clear(entities);
  grid.update(entities);
  grid.queryForCollisionPairs();
  grid.collision();
  
  grid.render(context,entities);

 }, 16);

 function randomX(){
   return randomIntFromInterval(0, canvasWidth);
 }

 function randomY(){
  return randomIntFromInterval(0, canvasHeight);
 } 

 function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}