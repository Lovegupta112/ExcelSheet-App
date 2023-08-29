
let theadRow=document.getElementById('table-heading-row');
let tbody=document.getElementsByTagName('tbody')[0];

const boldButton=document.getElementById('bold-btn');
const italicButton=document.getElementById('italics-btn');
const underlineButton=document.getElementById('underline-btn');
const leftAlign=document.getElementById('left-align');
const centerAlign=document.getElementById('center-align');
const rightAlign=document.getElementById('right-align');
const fontSizeDropDown=document.getElementById('font-size');
const fontFamilyDropDown=document.getElementById('font-family');

const cutButton=document.getElementById('cut-btn');
const copyButton=document.getElementById('copy-btn');
const pasteButton=document.getElementById('paste-btn');

const bgColorInput=document.getElementById('bgColor');
const textColorInput=document.getElementById('textColor');

const downloadBtn=document.getElementById('download-btn');
const uploadFile=document.getElementById('uploadFile');

const addSheetBtn=document.getElementById('add-sheet');
const sheetHeading=document.getElementById('sheet-name');
const sheetBtndiv=document.querySelector('.sheet-Button-section');

let currentCell;
let columns=26;
let rows=100;
let cutCell={};
let copyCell={};

let curSheetNum=1;
let totalSheet=1;

//for storing whole table we will make matrix type array means 2d array 
let matrix=new Array(rows); //forming outer array or rows of array
// console.log(matrix);
for(let row=0;row<rows;row++){
    matrix[row]=new Array(columns); //forming inner array or columns of each row
    for(let col=0;col<columns;col++){
        matrix[row][col]={}; //storing empty object to each element of matrix
    }
}
// console.log(matrix);


//for col heading---
for(let col=0;col<columns;col++){
    let th=document.createElement('th');
    th.innerText=`${String.fromCharCode(col+65)}`;
    theadRow.append(th);
}


// for rows and columns ---------

function addRowsColumns(){
for(let row=1;row<=rows;row++){
    let tr=document.createElement('tr');
    
    let th=document.createElement('th');
    th.innerText=row;
    tr.append(th);

    for(let col=0;col<columns;col++){
    let td=document.createElement('td');
    // td.setAttribute('contenteditable','true');
    let div=document.createElement('div');
    div.setAttribute('contenteditable','true');
    div.addEventListener('input',onInputFunc);//if we change anything in div
    td.setAttribute('id',`${String.fromCharCode(col+65)}${row}`);
    div.addEventListener('focus',(event)=>onFocusFunc(event));
    td.append(div);
    tr.append(td);
    }
    tbody.append(tr);
}
}
addRowsColumns();


function onFocusFunc(event){
    // console.log(event.target);
    currentCell=event.target;
    // console.log('onFocus : ',currentCell);
    document.getElementById('current-cell').innerText=`cell: ${currentCell.id}`;
}

//for bold --------

boldButton.addEventListener('click',()=>{
//   console.log(currentCell);
  if(currentCell.style.fontWeight==='bold'){
    currentCell.style.fontWeight='normal';
  }
  else currentCell.style.fontWeight='bold';
  updateMatrix(currentCell);
})


//for italic ------------
italicButton.addEventListener('click',()=>{

    if(currentCell.style.fontStyle==='italic'){
    currentCell.style.fontStyle='normal';
    }
    else currentCell.style.fontStyle='italic';
    updateMatrix(currentCell);
})

// for underline ---------

underlineButton.addEventListener('click',()=>{

    if(currentCell.style.textDecoration==='underline'){
    currentCell.style.textDecoration='none';
    }
    else currentCell.style.textDecoration='underline';
    updateMatrix(currentCell);
})


//for left align-------

leftAlign.addEventListener('click',()=>{
    currentCell.style.textAlign='left';
    updateMatrix(currentCell)
})

//for center  align------
centerAlign.addEventListener('click',()=>{
    currentCell.style.textAlign='center';
    updateMatrix(currentCell);
})

//for right align--------
rightAlign.addEventListener('click',()=>{
    currentCell.style.textAlign='right';
    updateMatrix(currentCell);
})

//for font Size------
fontSizeDropDown.addEventListener('change',()=>{
//    console.log(fontSizeDropDown.value);
    currentCell.style.fontSize=fontSizeDropDown.value;
    updateMatrix(currentCell);
})

//for font family------------
fontFamilyDropDown.addEventListener('change',()=>{
    currentCell.style.fontFamily=fontFamilyDropDown.value;
    updateMatrix(currentCell);
})

//for cut---------
cutButton.addEventListener('click',()=>{
    cutCell={
        style:currentCell.style.cssText,
        text:currentCell.innerText
    }
    currentCell.style=null;
    currentCell.innerText="";
    updateMatrix(currentCell);
})

// for copy-------------
copyButton.addEventListener('click',()=>{
   
   if(currentCell){
   copyCell={
    style:currentCell.style.cssText,
    text:currentCell.innerText
   }
   cutCell={}
}

})

//for paste--------------
pasteButton.addEventListener('click',()=>{

    if(cutCell.text){
    currentCell.innerText=cutCell.text;
    currentCell.style=cutCell.style;
    updateMatrix(currentCell);
    }
    else if(copyCell.text){
        currentCell.innerText=copyCell.text;
        currentCell.style=copyCell.style;
        updateMatrix(currentCell);
    }
})

// background color--------
 bgColorInput.addEventListener('input',()=>{
    currentCell.style.backgroundColor=bgColorInput.value;
    updateMatrix(currentCell);
 })

//text color----------
textColorInput.addEventListener('change',()=>{
    currentCell.style.color=textColorInput.value;
    updateMatrix(currentCell);
})

//download file -------

//1st way-
// we iterate over table and copy every cell------
//time complexity:- row*col or  O(n^2)

// downloadBtn.addEventListener('click',()=>{
//     for(let row=0;row<matrix.length;row++){
//         for(let col=0;col<matrix[0].length;col++){
//             let currentCellData=currentCellIndex(row+1,col);
//             // if(currentCellData){
//             matrix[row][col]={
//                 style:currentCellData.style.cssText,
//                 innerText:currentCellData.children[0].innerText
//             }
//         // }
//         }
//     }
//     console.log(matrix);
//    after that we will add code for downloading or call download method;
// })

// function currentCellIndex(row,column){
// let currentCellId=`${String.fromCharCode(column+65)}${row}`;
// return document.getElementById(currentCellId);
// }

//2nd way--
//when we edit or update any cell , at that time we update respective cell in 2d matrix 
//time complexity:- will be constant bcz we are updating at that time

function updateMatrix(currentCell){
    // console.log('updateMatrix Called..')
    let obj={
        style:currentCell.style.cssText,
        innerText:currentCell.innerText,
        id:currentCell.parentElement.id
    }
    // console.log(obj);
    let arrId=currentCell.parentElement.id.split("");//A1->['A','1']
    let row=arrId[1]-1; //'1'-1=> 0
    let col=arrId[0].charCodeAt(0)-65;//'A'.charCodeAt(0)-65=> 65-65=0
    matrix[row][col]=obj;
    // console.log('matrix ',matrix)
}


function onInputFunc(event){
    // console.log(event.target.style.cssText)
    // console.log(event.target.parentElement);
    // console.log(event.target);
    updateMatrix(event.target);//div
}

downloadBtn.addEventListener('click',()=>{
    //firstly we will convert that matrix to string
    const matrixString=JSON.stringify(matrix);
    //convert text form of matrix to downloadable form(file);

    const blob=new Blob([matrixString],{type:'application/json'});

    //now we will create dynamic link----
    const link=document.createElement('a');
    link.href=URL.createObjectURL(blob); //Create a URL for the Blob using the URL.createObjectURL() method. This URL will be used to initiate the download.

    link.download='data.json';    //naming the file which we will download

    //if we want to click on link so firsty we will have to add in body
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


//for uploading----

uploadFile.addEventListener('change',readuploadFileFun);

function readuploadFileFun(event){
const file=event.target.files[0];
if(file){
    const reader=new FileReader();
    reader.readAsText(file);
    reader.onload=function(e){
        const fileContent=e.target.result;
        try{
            const fileContentJSON=JSON.parse(fileContent);//convert string data into original form like matrix form
            matrix=fileContentJSON; //for updating matrix or we can say for merging uploaded content and the content that is already present in table
            //   console.log(fileContentJSON);

            // now we will iterate over matrix type data and store in html table 
            fileContentJSON.forEach((row)=>{
                row.forEach((cell)=>{ //cell is like reflection object of my currentCell data
                    if(cell.id){
                     let currentCell=document.getElementById(cell.id);
                     currentCell.children[0].innerText=cell.innerText;
                     currentCell.children[0].style=cell.style;
                }
            })
            })

        }
        catch(error){
          console.log('error is coming to read json file ',error);
        }
    }

}
}


//for adding multiple sheet-------
// window.addEventListener('load',)

addSheetBtn.addEventListener('click',()=>{


//before creating new sheet , we will store tables in array (also store array in localStroage)

if(totalSheet===1){
    let tempSheet=[matrix]; //storing our current table
    localStorage.setItem('arrMatrix',JSON.stringify(tempSheet));
}
else {
    let previousSheetArr=JSON.parse(localStorage.getItem('arrMatrix')); //it can contain more that 1 sheet 
    updatedSheetArr=[...previousSheetArr,matrix];   
    localStorage.setItem('arrMatrix',JSON.stringify(updatedSheetArr));
}

totalSheet++;
curSheetNum=totalSheet; //when will we add sheet at that time the current sheet will be equal to totalsheet.
    
//adding button for new sheet--
let sheetButton=document.createElement('button');
sheetButton.id=`sheet-${curSheetNum}`; //i changed curSheetNum-1 for button 1 button2
sheetButton.innerText=`sheet-${curSheetNum}`;   
sheetButton.addEventListener('click',showTable);
sheetBtndiv.append(sheetButton);

//clean the matrix data for new sheet
for(let row=0;row<rows;row++){
    matrix[row]=new Array(columns);
    for(let col=0;col<columns;col++){
        matrix[row][col]={};
    }
}
//we will also clear the body of table for new sheet--

tbody.innerHTML="";
addRowsColumns(); //now we will create again row and columns for each sheet
sheetHeading.innerText=`Sheet: ${curSheetNum}`;
})


//for showing corresponding table we will use this function-----


function showTable(event){
    // console.log(event);
     let curNum=parseInt(event.target.innerText.split("-")[1]);
    let myArr=JSON.parse(localStorage.getItem('arrMatrix'));
    console.log(curNum-1);
    let tableData=myArr[curNum-1]; //myArr[1-1]=myArr[0]

    curSheetNum=curNum;
    matrix=tableData;
    console.log('matrix',matrix);
    console.log('tabldeData',tableData); //matrix use krke kdekho ....s
    if(tableData){
    tableData.forEach((row)=>{
      row.forEach((cell)=>{
        if(cell.id){
          let curCell=document.getElementById(cell.id);
          curCell.children[0].innerText=cell.innerText;
          curCell.children[0].style.cssText=cell.style;
        }
        // else{
        //     let curCell=document.getElementById(cell.id);
        //     curCell.children[0].innerText="";
        //     curCell.children[0].style.cssText="";
        // }      
      })
    })
    }
    sheetHeading.innerText=`Sheet: ${curSheetNum}`;
}


//uppercase lowercase , color ,backgroundcolor, font family 
//cut copy paste
//UI 

//important bug
//when you close tab button disappear with corresponding sheet data also so we have to fix this issue , it shuld be show buttons according to sheets that we added in localStorage

