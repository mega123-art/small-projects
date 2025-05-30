
const fs=require("fs")
const filePath="./tasks.json"
const command=process.argv[2]
const argument=process.argv[3]

const removeTask=(argument)=>{
    const tasks=loadTasks()
    const taskindex=tasks.indexof(argument)
    if(taskindex!==-1){
        tasks.splice(taskindex,1)
        saveTasks(tasks)
        console.log("task removed:",argument)

    }else{
        console.log("task not found!")
    }

console.log("removed task")
}
const listTasks = () => {
  const tasks = loadTasks();
  tasks.forEach((task, index) => {
    console.log(`${index + 1}-${task}`);
  });
};
const addTask=(task)=>{
    const tasks=loadTasks()
    tasks.push(task)
    saveTasks(tasks)
    console.log("tasks added",task);
    

}
const saveTasks=(tasks)=>{
    const dataJSON=JSON.stringify(tasks)
    fs.writeFileSync(filePath,dataJSON)

}
const loadTasks=()=>{
    try {
        const dataBuffer=fs.readFileSync(filePath)
        const dataJSON=dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}
if(command==='add'){
    addTask(argument)
}else if(command==='list'){
    listTasks()
}else if(command==='remove'){
    removeTask(argument)
}else{
    console.log("command not found!")
}

