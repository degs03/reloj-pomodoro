const clock= document.getElementById('clock');
const cyclesInput= document.getElementById('cycles-input');
const startButton= document.getElementById('start-button');
const restartButton= document.getElementById('restart-button');
const workTimeInput= document.getElementById('work-time');
const breakTimeInput= document.getElementById('break-time');
const restTimeInput= document.getElementById('rest-time');
const inputTarea = document.getElementById("tarea");
const btn = document.getElementById("agregar");
const listado = document.getElementById("listado");
const cantidad = document.getElementById("cantidad");
//lleva la cantidad de tareas
let total = 0;
btn.onclick = function() {
    if (inputTarea.value == "") {
        return;
    }
    let elemento = inputTarea.value;
    let li = document.createElement("li");
    li.textContent = elemento;
    listado.appendChild(li);
    total++;
    cantidad.innerHTML = total;
    let btnEliminar = document.createElement("span");
    btnEliminar.textContent = "\u00d7";
    li.appendChild(btnEliminar);
    btnEliminar.onclick = function() {
        li.remove();
        total--;
        cantidad.innerHTML = total;
    }
    inputTarea.value = "";
}
window.onload= () => {
    let workTime; /*Tiempos de trabajo*/
    let breakTime; /*Tiempos de descanso*/
    let timesCompleted; /*Tiempos completados*/
    let cyclesGoal; /*Ciclos que quiere hacer el usuario*/
    let cyclesCompleted= 0; /*Ciclos completados*/
    let currentTime; /*Minutos*/
    let seconds= 0; /*Segundos*/
    let restTime;
    function isRestTime(){
        return timesCompleted== 7;
    }
    function goalReached(){        
        return cyclesGoal== cyclesCompleted;
    }
    function pomodoroController(){
        if (isRestTime()){
            cyclesCompleted++;
            if(!goalReached()){
                currentTime= restTime;
                timer();
                timesCompleted= 0;
            }else{
                startButton.disabled=false;
            }
            return;
        }
        if (timesCompleted%2==0){
            /*trabajo*/
            currentTime= workTime;
            timesCompleted++;
            timer();
        }else{
            /*descanso*/
            currentTime= breakTime;
            timesCompleted++;
            timer();
        }
    }
    function timer(){
        if (currentTime>0 || seconds>0){
            if(seconds==0){
                seconds= 59;
                currentTime--;
            }else{
                seconds--;
            }
            updateClock();
            console.log(currentTime, seconds);
            interval= setTimeout(timer, 1000);
        }else {
            pomodoroController();
        }
    }
    function populateVariables() {
        workTime= workTimeInput.value;
        breakTime= breakTimeInput.value;
        restTime= restTimeInput.value;
        cyclesGoal= cyclesInput.value;
        timesCompleted= 0;
    }
    function formatNumbers(time){
        let formattedDigits;
        if (time<10) {
            formattedDigits= '0' + time;
        }else{
            formattedDigits= time;
        }
        return formattedDigits;
    }
    let clockMinutes;
    let clockSeconds;
    function updateClock(){
        clockMinutes= formatNumbers(currentTime);
        clockSeconds= formatNumbers(seconds);
        clock.innerHTML= clockMinutes + ':' + clockSeconds;
    }
    startButton.onclick= () => {
        populateVariables();
        startPomodoro();
        startButton.disabled=true;
    };
    function startPomodoro(){
        pomodoroController();
    }
};