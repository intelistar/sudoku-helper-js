'use strict'

createTable();

function createTable(){
  let table = document.querySelector('#main');
  let row, date;

  for(let i = 1; i < 10; i++){
    table.append(row = document.createElement('tr'));
    for(let j = 1; j < 10; j++){
      row.append(date = document.createElement('td'));
      if(i % 3 == 0) date.style.borderBottom = '3px solid black';
      if(j % 3 == 0) date.style.borderRight = '3px solid black';
    }
  }
  table.addEventListener('click',OnHelper);
}

function getArrayOfValues(){
  let arr = [];
  let rows = document.querySelectorAll('#main tr');
  for(let i = 0; i < 9; i++){
    arr[i]=[];
    for(let j = 0; j < 9; j++){
        arr[i][j] = rows[i].children[j].textContent;
    }
  }
  return arr;
}

//----Listener for TAble-----//
function OnHelper(ev){
  document.querySelectorAll('#main td').forEach((td)=>td.style.backgroundColor = "")
  let cell = ev.target;
  if(cell.tagName !== 'TD') return;
  cell.style.backgroundColor = "rgb(230, 230, 230)";
  let nums = document.querySelectorAll('#helper tr td');
  nums.forEach((num)=>num.style.display = "");
  let arr = getArrayOfValues();
  /*let nev = checkNum(cell.parentElement.rowIndex, cell.cellIndex,arr);
  for(let el of nums){
    for(let n of nev){
      if(el.innerText == n){
        el.style.display = "none";
      }
    }
  };*/
  for(let el of nums){
    if(checkBl(cell.parentElement.rowIndex, cell.cellIndex,arr,el.innerText)){
      nums.forEach((cur)=>{
        if(cur != el) cur.style.display = "none";
      })
    }else if(!(checkNum(cell.parentElement.rowIndex, cell.cellIndex,arr,el.textContent))){
      el.style.display = "none";
    }
  }
  document.querySelector('#helper').style.display = "";
  document.querySelector('#helper').onmousedown = (num)=>entNum(num, cell);  
}
//----Listener for helper----//
function entNum(num,cell){
  cell.innerText = num.target.innerText;
}

function checkBl(row, column, arr,num){
  let n = 0;
  let blockrow = Math.floor(row / 3) * 3;
  let colblock = Math.floor(column / 3) * 3;
  for(let i = blockrow; i < (blockrow + 3); i++){
    for(let j = colblock; j < (colblock + 3); j++){
      if(checkNum(i,j,arr,num)) n++; 
  }
}
  if(n == 1) return true;
  return false;
}
function checkRandC(row, column, arr, num){
  for(let i = 0; i < 9; i++){
    if(arr[row][i] == num) return false;
    if(arr[i][column] == num) return false;
  };
  return true
}
function checkNum(row, column, arr, num){
  for(let i = 0; i < 9; i++){
    if(arr[row][i] == num) return false;
    if(arr[i][column] == num) return false;
  };
  //------check block numbers-----//
 let blockrow = Math.floor(row / 3) * 3;
  let colblock = Math.floor(column / 3) * 3;
  for(let i = blockrow; i < (blockrow + 3); i++){
    for(let j = colblock; j < (colblock + 3); j++){
      if(arr[i][j] == num) return false;
    }
  }
  return true;
}