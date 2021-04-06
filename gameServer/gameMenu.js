
 var quizList =document.getElementById('quizContainer')
quizList.style.visibility="hidden"

document.getElementById('subjectContainer').addEventListener('click',function(e){
    const subject=e.target.innerHTML;
    console.log(subject)
    var subjectList =document.getElementById('subjectContainer')
    subjectList.style.animation="exitRight 1.5s linear"
    setTimeout(function(){
    subjectList.style.visibility="hidden"
    quizList.style.visibility="visible"
    getQuizs(subject)

        //do what you need here
    }, 1000);
    
    

})
function getQuizs(subject){
    axios.get(`http://127.0.0.1:85/getQuizs?subject=${'maths'}`)
  .then(function (response) {
    // handle success
    console.log(response);
    appendQuizs(response.data)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}
function appendQuizs(data){
    var quizList = document.getElementById('quizList')
    data.forEach(function(quiz){
        var listItem = document.createElement("a");
        listItem.className  = "list-group-item list-group-item-action"
        listItem.innerHTML = quiz.title
        listItem.id=quiz.id
        quizList.appendChild(listItem)
    })
    
}

document.getElementById('quizList').addEventListener('click',function(e){
    var quizId=e.target.getAttribute('id')
    console.log(quizId)
    getQuestions(quizId)
})
function getQuestions(id){
    axios.get(`http://127.0.0.1:85/getQuizQuestions?id=${id}`)
  .then(function (response) {
    // handle success
    appendQuestions()
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });}
  function appendQuestions(){
    var quizList =document.getElementById('quizContainer')
    quizList.style.animation="exitRight 1.5s linear"
    setTimeout(function(){
    quizList.style.visibility="hidden"
  },1000)
  }

   


