let start_button = document.querySelector('.btn-primary');
let stop_button = document.querySelector('.btn-danger');
let def_timer = document.querySelector('.def_timer');
let start_time;
let el_time;
let timer_id;
let end_time = new Date(2025, 1, 22,16,59,59,0);
let blink_flag = true;
let last_value=-1;

stop_button.disabled = true;
//Stopボタンを無効化する

const au_clock1 = new Audio('sound/Clock-Second_Hand03-1(Dry-Loop).mp3');
const au_clock2 = new Audio('sound/Clock-Second_Hand03-3(Dry-Loop).mp3');
const au_alarm = new Audio('sound/Clock-Alarm04-04(Low-Loop).mp3');


start_button.addEventListener('click',()=>{
    //timer_buttonをクリックしたときは以下の挙動をする
    start_time = Date.now();
    //ボタンを押したときの現在時刻を取得
    start_button.disabled = true;
    stop_button.disabled = false;
    timer_id = setInterval(go_timer,10);
    })
/*
stop_button.addEventListener('click',()=>{
    start_button.disabled = false;
    stop_button.disabled = true;
    clearInterval(timer_id);
})
*/
function add_zero(value){
    if(value < 10){
        value = "0" + value;
    }
        return value;
}
//1桁のときに10の位に文字列の"0"を足す関数

function arrange_time(){
    let sec = Math.floor(el_time % 60000 / 1000);
    //商の余りを使うことで60を超えたら自動的に0になる
    let min = Math.floor(el_time % 3600000 / 60000);
    let hour = Math.floor((el_time / 3600000 )% 24);
    let date = Math.floor(el_time / 86400000 % 31);

    sec = add_zero(sec);
    //上で作ったadd_zeroのvalueにsecを入れたものをsecに入れた
    min = add_zero(min);
    hour = add_zero(hour);

    def_timer.innerHTML = `${date}日${hour}時間${min}分${sec}秒`;
    //html内にあるdef_timerを書き換える

    if(blink_flag){
        if(date < 1){
            customBlink.classList.toggle('anime'); 
            blink_flag = false;
            hour = 5;
        }
    }

    play_music(date,hour);
}

function play_music(date,hour){
    if(date < 1){
        if(last_value != hour){
            if(hour == 10){
                au_clock1.play();
                au_clock1.loop = true;
                au_clock1.volume = 0.1;
            }
            else if(hour > 5 && hour < 10){
                au_clock1.volume = 0.1*(11 - hour);
            }
            else if(hour == 5){
                au_clock1.loop = false;
                au_clock2.play();
                au_clock2.loop = true;
                au_clock2.volume = 0.5;
            }
            else if(hour > 1 && hour < 5){
                au_clock2.volume = 0.1*(11 - hour);
            }
            else if(hour == 1){
                au_clock2.loop = false;
                au_alarm.play();
                au_alarm.loop = true;
                au_alarm.volume = 1;
            }
            last_value = hour;
        }
    }
}

let go_timer = ()=>{
    let time_now = Date.now();
    el_time = end_time - time_now;
    arrange_time();
}

const customBlink = document.querySelector('.custom-blink');
