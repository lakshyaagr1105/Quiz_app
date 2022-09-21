let startQuizbtn = document.querySelector('.start-quiz-btn');
let container = document.querySelector('.container');
let question = document.querySelector('.quest-text');
let option_list = document.querySelector('.option-div');
let time_line = document.querySelector('.time_line');
let TimeCount = document.querySelector('.time-left');
let next_ques_btn = document.querySelector('.next-ques-btn');
let topQuestionCounting = document.querySelector('.question-counter');
const result = document.querySelector('.result-div');
let play_again_btn = document.querySelector('.replay-quiz-btn');

let correctIcon = `<svg class="correct-icon" width = "20px" margin="auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>`;
let incorrectIcon = `<svg class="wrong-icon" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM175 208.1L222.1 255.1L175 303C165.7 312.4 165.7 327.6 175 336.1C184.4 346.3 199.6 346.3 208.1 336.1L255.1 289.9L303 336.1C312.4 346.3 327.6 346.3 336.1 336.1C346.3 327.6 346.3 312.4 336.1 303L289.9 255.1L336.1 208.1C346.3 199.6 346.3 184.4 336.1 175C327.6 165.7 312.4 165.7 303 175L255.1 222.1L208.1 175C199.6 165.7 184.4 165.7 175 175C165.7 184.4 165.7 199.6 175 208.1V208.1z"/></svg>`;


// Question Count
let question_count = 0;
// Top bar question count
let ques_number = 1;
let timeValue = 15;
let widthValue = 0;
let score= 0;
let count;
let countLine;

// If Start quiz btn 
startQuizbtn.addEventListener("click", () => {
    container.style.display = 'block';
    showQuestions(0);
    QuestionCounter(1);
    timerStart(15);
    timerLine(0);
    startQuizbtn.style.display="none";
})

// If next button click
next_ques_btn.onclick = () => {
    if(question_count < questions.length -1)
    {
        question_count++;
        ques_number++;
        showQuestions(question_count);
        QuestionCounter(ques_number);
        clearInterval(count);
        timerStart(timeValue);
        clearInterval(countLine);
        timerLine(widthValue);
        next_ques_btn.classList.add('click-disable');

    }
    else
    {
        console.log('Quiz Complete');
        showResult();
    }
};

// Getting questions and options from the array

function showQuestions(index)
{
    let question_tag = `<span>` + questions[index].number + ". " + questions[index].question + `</span>`;
    let option_tag = `<div class="option">
    <span>` +questions[index].options[0]+`</span></div>`+
    `<div class="option">
    <span>`+ questions[index].options[1]+`</span></div>`+
    `<div class="option">
    <span>`+ questions[index].options[2]+`</span></div>`+
    `<div class="option">
    <span>`+ questions[index].options[3]+`</span></div>`;
question.innerHTML = question_tag;
option_list.innerHTML = option_tag;
const option = option_list.querySelectorAll('.option');
for(let  i=0 ; i<option.length; i++)
{
    option[i].setAttribute('onclick','optionSelect(this)');
}
}

// If user Select Option

function optionSelect(answer)
{
    clearInterval(count);
    clearInterval(countLine);
    let user_answer = answer.innerText;
    console.log(user_answer);
    let correctAns = questions[question_count].answer;
    console.log(correctAns);
    let Alloption = option_list.children.length;
    console.log(user_answer == correctAns);
    if(user_answer == correctAns)
    {
        score+=1;
        answer.classList.add("option-correct");
        answer.insertAdjacentHTML("beforeend", correctIcon);

    }
    else{
        answer.classList.add("option-incorrect");
        answer.insertAdjacentHTML("beforeend", incorrectIcon);
        for(i=0;i<Alloption;i++)
        {
            if(option_list.children[i].textContent == correctAns)
            {
                option_list.children[i].setAttribute("class","option-correct");
                option_list.children[i].insertAdjacentHTML("beforeend",correctIcon);
            }
        }
    }

    // If user select option then all options disabled
    for(let i=0; i< Alloption;i++)
    {
        option_list.children[i].classList.add('option-disabled');
    }
    next_ques_btn.classList.remove('click-disable');
};

// Show Ques no. on top
function QuestionCounter(index){
    let totalQuesCount = `<span>`+index+`<span> of </span></span>`+questions.length+`<span> Question</span>`;
    topQuestionCounting.innerHTML = totalQuesCount;
};

// Timer Start

function timerStart(time)
{
    count = setInterval(timer,1000);
    function timer()
    {
        TimeCount.innerHTML = time;
        time--;
        if(time<9){
        TimeCount.textContent = "0" + TimeCount.textContent;
        }
        if(time<0)
        {
        clearInterval(count);
        TimeCount.innerHTML = "00";

        let correctAns = questions[question_count].answer;
        let Alloption = option_list.children.length;

        for(i=0; i< Alloption; i++)
        {
            if(option_list.children[i].textContent= correctAns)
            {
                option_list.children[i].setAttribute("class",'option correct');
                option_list.children[i].insertAdjacentHTML("beforeend", correctIcon);

            }
            // else{
            //     option_list.children[i].setAttribute("class","option incorrect");
            //     option_list.children[i].insertAdjacentHTML("beforebegin", incorrectIcon);
            // }
        };
        for(let i = 0; i< Alloption ; i++)
        {
            option_list.children[i].classList.add('disabled');
        }
        next_ques_btn.classList.remove('click-disable');
        }
    }
}

// Time Line

function timerLine(time)
{
    countLine = setInterval(timer,40)
    function timer()
    {
        time +=1;
        time_line.style.width = time + 'px';
        if(time > 399)
        clearInterval(countLine);
    };
};

// Show Result

function showResult()
{
    container.style.display = "none";
    result.style.display = "block";
    let scoreText = document.querySelector('.score');
    if(score>3)
    {
        let scoreTag = `<span> Congrats! You scored `+ score + ` out of `+ questions.length + ` 🔥</span>`;
        scoreText.innerHTML = scoreTag;
    }
    else if(score>1) 
    {
        let scoreTag = `<span> Nice! You scored `+ score + ` out of `+ questions.length + ` 🥳</span>`;
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = `<span> Sorry! You scored `+ score + ` out of `+ questions.length + ` 🙁</span>`;
        scoreText.innerHTML = scoreTag;
    }
};