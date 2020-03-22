// init
let list = document.querySelector('#my-todo')
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills', 'Coding', 'Make Dinner']
for (let todo of todos) {
  addItem(todo)
}
countTask('todo')
countTask('done')


function addItem (text) {
  // 如果 input 還沒有輸入內容，不會產生新的 todo
  if (text.trim()==='') {
    text = ""
  } else {
    let newItem = document.createElement('li')
    newItem.innerHTML = `
      <label for="todo">${text}</label>
      <i class="delete fa fa-trash"></i>
    `
    list.appendChild(newItem)
    //新增資料後，自動清空輸入欄位
    let inputBox = document.querySelector('#newTodo')
    inputBox.value = ''
    //更新todo數量
    countTask('todo')
  }
}

// Create todo
const addBtn = document.querySelector('#addBtn')
addBtn.addEventListener('click', function (event) {
  let inputValue = document.querySelector('#newTodo').value
  addItem(inputValue)
})

// Delete and check
list.addEventListener('click', function (event) {
  let li = event.target.parentElement
  if (event.target.classList.contains('delete')) {
    li.remove()
  } else if (event.target.tagName === 'LABEL') {
    addDone (event.target.textContent)
    li.remove()
  }
  countTask('todo')
})

// 當使用者在 input#newTodo 裡按下 Enter 鍵時，一樣可以新增 todo (提示：使用 keypress 事件，並且用 event.keyCode == 13 來鎖定 Enter 鍵)
let inputText = document.querySelector('#newTodo')
inputText.addEventListener('keypress', event => {
  if (event.keyCode === 13) {
    addItem(event.target.value)
  }
})

// // Create Done
let listDone = document.querySelector('#done')
function addDone (text) {
  // 如果 input 還沒有輸入內容，不會產生新的 todo
    let newItem = document.createElement('li')
    newItem.innerHTML = `
      <label for="todo" class="checked">${text}</label>
      <i class="delete fa fa-trash"></i>
    `
  listDone.appendChild(newItem)
  countTask('done')

}

//Done的清單可以再被放回todo
listDone.addEventListener('click', event => {
  let li = event.target.parentElement
  if (event.target.classList.contains('delete')) {
    li.remove()
  } else if (event.target.tagName === 'LABEL') {
    addItem(event.target.textContent)
    li.remove()
  }
  countTask('done')
})

// 計數器
function countTask (isDone) {
  let count = document.querySelectorAll('#my-todo li').length
  let num = document.querySelector('#countTodo')
  if (isDone === 'done') {
    count = document.querySelectorAll('#done li').length
    num = document.querySelector('#countDone')
  }
  num.innerHTML = ` (${count})`
}

// 新增reset按鈕
function clearText()  {
    document.querySelector('#newTodo').value = "";
    }

//新增滑鼠鼠標移到清單文字時顯示不同顏色
list.addEventListener('mouseover', event => {
  // highlight the mouseover target
  event.target.style.color = "orange";
})

list.addEventListener('mouseout', event => {
  // highlight the mouseout target
  event.target.style.color = "";
})
