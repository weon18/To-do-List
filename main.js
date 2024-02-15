//유저가 값을 입력함
//+ 버튼을 클릭하면, 할일이 추가
//delete버튼을 누르면 할일 삭제
//check버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check 버튼을 클릭하는 순간 true , false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로

//진행중 끝남 탭을 누르면, 언더바가 이동함
//끝남탭은, 끝난 아이템만, 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let tabs = document.querySelectorAll(".task-tabs div")
let underLine = document.getElementById("under-line");
let taskList = []
let mode = 'all'
let filterList = []

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){
        setActiveTab(event.target);
        filter(event);
    });
}

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)}
        )
}

addButton.addEventListener("click",addTask)

function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let list = []
    if(mode === "all"){
        list = taskList;
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList;
    }

    let resultHTML = "";
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button class="check-button" onclick="toggleComplete('${list[i].id}')">Check</button>
                <button class="delete-button" onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`
        }else{
            resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
            <button class="check-button" onclick="toggleComplete('${list[i].id}')">Check</button>
            <button class="delete-button" onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
    </div>`
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render()
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    for(let i=0;i<filterList.length;i++){
        if(filterList[i].id == id){
            filterList.splice(i,1);
            break;
        }
    }
    render()
}

function filter(event){
    console.log("filter",event.target.id)
    mode = event.target.id;
    filterList = [];
    if(mode === "all"){
        //전체리스트
        render()
    }else if(mode === "ongoing"){
        //진행중인 아이템 리스트
        //task.isComplete=false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }
        render()
    }else if(mode === "done"){
        //끝나는 케이스
        //task.isComplete=true
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }
        render()
    }
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

function setActiveTab(tab){
    let tabWidth = tab.offsetWidth;
    let tabLeft = tab.offsetLeft;
    underLine.style.width = tabWidth + "px";
    underLine.style.transform = `translateX(${tabLeft}px)`;
}