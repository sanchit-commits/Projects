// during refresh the all data will erase and then we add something, then it will show. SO this is a defect we should show the screen the current data also, so for this we call the function everytime the function loads
showtask();


let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");

addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value;
    // here if we click the add button with the null value, then blank task is created, this is not good so for this we apply the check
    if(addtaskinputval.trim()!=0){
        //getting the value from the local strorage
        let webtask = localStorage.getItem("localtask");
        // if value is null then we initialise a new array, otherwise it should parse, parse islie krenge if there is something in the local storage then it will return in string format,then we cannot apply any function in this, so we should parse it and after parsing it will become object
        if(webtask==null){
            taskObj = [];
        }else{
            taskObj = JSON.parse(webtask);
        }
        //add the value in the array
        taskObj.push(addtaskinputval);
        //add in the local storage, and convert into string function to add in storage
        localStorage.setItem("localtask",JSON.stringify(taskObj));
        // make the input field blank after add
        addtaskinput.value='';

    }
    showtask();
})

// add thr task in the table also
function showtask(){
    let webtask = localStorage.getItem("localtask");
    if(webtask==null){
        taskObj = [];
    }else{
        taskObj = JSON.parse(webtask);
    }
    //now show in table
    let html = '';
    let addedtasklist  = document.getElementById('addedtasklist');
    taskObj.forEach((item,index) => {
        html += `<tr>
                    <th scope="row">${index+1}</th>
                    <td>${item}</td>
                    <td><button type = "button" onclick='edittask(${index})'
                    class="text-primary"><i class="fa fa-edit">
                    </i>Edit</button></td>
                    <td><button type="button" onlick='deleteitem(${index});
                    class="text-danger"><i class="fa fa-trash">
                    </i>Delete</button></td>
                </tr>`;
                    
    });
    addedtasklist.innerHTML = html;
} 
// agr hme kuch show krna nhi h but wha hona chahiye, to diplay none
// edittask
function edittask(index){
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn"); 
    saveindex.value = index;
    let webtask = localStorage.getItem(webtask);
    let taskObj = JSON.parse(webtask);
    addtaskinput.value = taskObj[index];
    addtaskbtn.style.display="none";
    savetaskbtn.style.display='block';

}
// save task
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    // now getting that edited value and will replace in that index jispr hmne click kia tha and save in local stroage also
    let saveindex = document.getElementById('saveindex').value;
    taskObj[saveindex] = addtaskinput.value;
    savetaskbtn.style.display = 'none';
    addtaskbtn.style.display = 'block';
    localStorage.setItem('localtask',JSON.stringify(taskObj));
    // after edit the value in localstorage, empty the input field
    addtaskinput.value = '';
    showtask();
})

//deleteitem
function deleteitem(index){
    let webtask = localStorage.getItem('localtask');
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index,1);
    localStorage.setItem('localtask',JSON.stringify(taskObj));
    showtask();
}

// deleteall
let deleteallbtn = document.getElementById('deleteallbtn');
deleteallbtn.addEventListener('click',function(){
    let savetaskbtn = document.getElementById('savetaskbtn');
    let addtaskbtn = document.getElementById('addtaskbtn');
    let webtask = localStorage.getItem('localtask');
    let taskObj = JSON.parse(webtask);
    if(webtask==null){
        taskObj=[];
    } else{
        taskObj=[];
    }
    // if during editing savetask btn will appear and if we click on deleteall btn then savetask btn shpuld change to addtask btn
    savetaskbtn.style.display='none';
    savetaskbtn.style.display='block';
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();

})

//searchlist
let searchtextbtn = document.getElementById('searchtextbox');
searchtextbox.addEventListener('input',function(){
    let trlist = document.querySelectorAll('tr');
    // Array.from is used  to convert all elemets of html into array
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName('td')[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval,'gi');
        if(searchedtext.match(re)){
            item.style.display='table-row' //not block, it changes the alignment

        }else{
            item.style.display='none';
        } 
    })
})
 