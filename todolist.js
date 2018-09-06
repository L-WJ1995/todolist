let parentNode = document.body.querySelector(".todos")
let arrows = document.body.querySelector(".input span")
let tailNode = parentNode.querySelector(".tail")
let tailNode_A = tailNode.querySelectorAll("A")
let A_status = "all", arrows_status = false



let event = new Event('numchange')
document.addEventListener('numchange', () => {
  if (/^[0-9]*/.exec(tailNode.firstElementChild.textContent)[0] !== "0") arrows.style.color = "rgba(0, 0, 0, .2)"
  else {
    arrows.style.color = "black"
    if (!document.body.querySelector(".clone_")) {
      arrows.style.visibility = "hidden"
      tailNode.style.display = "none"
    }
  }
});

document.addEventListener("keydown", (e) =>  {
  if (e.target.className === "keydown" && e.keyCode === 13 && e.target.value !== "") {
    let node = document.body.querySelector(".clone").cloneNode(true)
    node.classList.add("clone_")
    node.lastChild.innerHTML = parentNode.querySelector(".keydown").value
    node.style.display = A_status === "completed" ? "none" : "flex"
    parentNode.appendChild(node)
    e.target.value = ""
    arrows.style.visibility = "visible"
    tail()
  }
  if (e.keyCode === 13) reinput(e.target)
})

document.onclick = (e) => {
  if (e.target.className !== "reinput") reinput()
  if (e.target === arrows) tick("arrows")
  if (e.target.classList.contains("tick")) tick(e.target)
  if (tailNode.contains(e.target)) tail(e.target)
  if (e.target.className === "X") {  
    if (!e.target.parentNode.querySelector(".tick_on")) tailNode.firstElementChild.textContent = /^[0-9]*/.exec(tailNode.firstElementChild.textContent)[0] - 0 - 1 + " item left"
    parentNode.removeChild(e.target.parentNode)
    document.dispatchEvent(event)
  }
}


document.ondblclick = (e) => {
  if (e.target === e.target.parentNode.lastChild && e.target.nodeName === "SPAN") {
    let nodes = e.target.parentNode.children
    for (let i = 0; i < nodes.length; i++) nodes[i].style.display = "none"
    let node = document.createElement("input")
    node.className = "reinput"
    node.value = e.target.innerHTML
    e.target.parentNode.appendChild(node)
  }
}



function reinput() {
  let node = parentNode.querySelector(".reinput")
  if (node) {
    let nodes = node.parentNode.children, str = node.value
    node.parentNode.removeChild(node)
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].style.display = ""
        if (nodes[i] === nodes[i].parentNode.lastChild) nodes[i].innerHTML = str
    }
  }
}


function tick(node) {
  if (node === "arrows") {
    let nodes = document.body.querySelectorAll(".tick")
    if (/^[0-9]*/.exec(tailNode.firstElementChild.textContent)[0] !== "0") {
      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i].classList.contains("tick_on") && nodes[i].parentNode.parentNode.classList.contains("clone_")) tick(nodes[i])
      }   
    } else for (let i = 0; i < nodes.length; i++) tick(nodes[i])
  } else {  
    if (node.classList.contains("tick_on")) {
      node.classList.remove("tick_on")
      node.parentNode.parentNode.lastChild.classList.remove("line_through")
      tailNode.firstElementChild.textContent = /^[0-9]*/.exec(tailNode.firstElementChild.textContent)[0] - 0 + 1 + " item left"
      clone_status()
    } else {
      node.classList.add("tick_on")
      node.parentNode.parentNode.lastChild.classList.add("line_through")
      tailNode.querySelector(".clear_completed").style.display = "inline"
      tailNode.firstElementChild.textContent = /^[0-9]*/.exec(tailNode.firstElementChild.textContent)[0] - 0 - 1 + " item left"
      clone_status()
    }
  }
  document.dispatchEvent(event)
}


function tail(node = "") {
  if (node === "") {
    if (window.getComputedStyle(tailNode).display === "none") tailNode.style.display = "block"
    tailNode.firstElementChild.textContent = /^[0-9]*/.exec(tailNode.firstElementChild.textContent)[0] - 0 + 1 + " item left"
  } else {
    if (node.nodeName === "A") {
      for (let i = 0; i < tailNode_A.length; i++) tailNode_A[i].style["border-color"] = "rgba(255,255,255,0)"
      node.style["border-color"] = "orange"
      A_status = node.className
      clone_status()
    }
    if (node.className === "clear_completed") {
      let nodes = parentNode.querySelectorAll(".tick_on")
      for (let i = 0; i < nodes.length; i++) parentNode.removeChild(nodes[i].parentNode.parentNode)
      tailNode.querySelector(".clear_completed").style.display = "none"
    }
  }
  document.dispatchEvent(event)
}



function clone_status() {
  if (A_status === "active") {
    let nodes = parentNode.querySelectorAll(".clone_")
    for (let i = 0; i < nodes.length; i++) nodes[i].style.display = "flex"
    nodes = parentNode.querySelectorAll(".tick_on")
    for (let i = 0; i < nodes.length; i++) nodes[i].parentNode.parentNode.style.display = "none"
  }
  if (A_status === "all") {
    let nodes = parentNode.querySelectorAll(".clone_")
    for (let i = 0; i < nodes.length; i++) nodes[i].style.display = "flex"
  }
  if (A_status === "completed") {
    let nodes = parentNode.querySelectorAll(".clone_")
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].style.display === "flex") nodes[i].style.display = "none"
    }
    nodes = parentNode.querySelectorAll(".tick_on")
    for (let i = 0; i < nodes.length; i++) nodes[i].parentNode.parentNode.style.display = "flex"
  }
}