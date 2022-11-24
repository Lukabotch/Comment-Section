import styles from "./style.css";
import "bootstrap";
import data from "../data.json";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const main = document.querySelector(".main");
const sendCom = document.querySelector(".send");
const myTextArea = document.querySelector(".myTextarea");
const myData = JSON.parse(JSON.stringify(data));
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
const myTextAreaReply = document.querySelectorAll(".myTextareaReply");






function myFunction() {
  for (let i = 0; i < myData.comments.length; i++) {
  let tmp = `
  <div class="replyComments${i}">
  <div class="comment" id="${myData.comments[i].id}">
        <div class="rating">
          <img src="/images/icon-plus.svg" alt="" class="plus" />
          <span>${myData.comments[i].score}</span>
          <img src="/images/icon-minus.svg" alt="" class="minus" />
        </div>
        <div class="userpage">
          <div class="userheader">
            <div class="usernav">
              <img src="${myData.comments[i].user.image.png}" alt="" class="avatar" width=30 height=30/><span class="nameClass">${myData.comments[i].user.username}</span
              ><span class="dateAdded">${myData.comments[i].createdAt}</span>
            </div>
            <span style="font-family:Rubik;font-weight:500;color:hsl(238, 40%, 52%);cursor:pointer;transition :0.3s" class="replyClass"><img src="/images/icon-reply.svg" style="margin:7px">Reply</span>
          </div>

          <div class="paragraph">
         ${myData.comments[i].content}
          </div>
        </div>
      </div>
      
    </div>
        <div class="myCommentHidden">
      <div class="currentUser">
        <img src="./images/avatars/image-juliusomo.png" alt="" class="currentUserImg" width="35" height="35" />
        <textarea name="" class="myTextareaReply" id="myTextAreaReply${myData.comments[i].id}"></textarea>
        <button class="sendReplies">send</button>
    </div>`;
      main.innerHTML += tmp;

    if (myData.comments[i].replies.length > 0) {
      const link = document.createElement("div");
      link.className = "replyArr";
      myData.comments[i].replies.forEach((replys) =>
        replys.user.username != myData.currentUser.username
          ? (link.innerHTML += `
  <div class="replies" id="${replys.id}">
        <div class="rating">
          <img src="/images/icon-plus.svg" alt="" class="plus" />
          <span>${replys.score}</span>
          <img src="/images/icon-minus.svg" alt="" class="minus" />
        </div>
        <div class="userpage">
          <div class="userheader">
            <div class="usernav">
              <img src="${replys.user.image.png}" alt="" class="avatar" width=30 height=30/><span class="nameClass">${replys.user.username}</span
              ><span class="dateAdded">${replys.createdAt}</span>
            </div>
            <span class="replyClass"><img src="/images/icon-reply.svg" style="margin:7px">Reply</span>
          </div>

          <div class="paragraph">
          <span>@${replys.replyingTo}</span>
${replys.content}
          </div>
        </div>
      </div>
          <div class="myCommentHidden">
      <div class="currentUser">
        <img src="./images/avatars/image-juliusomo.png" alt="" class="currentUserImg" width="35" height="35" />
        <textarea name="" class="myTextareaReply" id="myTextAreaReply${replys.id}"></textarea>
        <button class="sendReplys">send</button>
    </div>`)
          : (link.innerHTML += `

  <div class="replies" id="${replys.id}">
        <div class="rating">
          <img src="/images/icon-plus.svg" alt="" class="plus" />
          <span>${replys.score}</span>
          <img src="/images/icon-minus.svg" alt="" class="minus" />
        </div>
        <div class="userpage">
          <div class="userheader">
            <div class="usernav">
              <img src="${replys.user.image.png}" alt="" class="avatar" width=30 height=30 /><span class="nameClass">${replys.user.username}</span
              ><span class="dateAdded">${replys.createdAt}</span>
            </div>
            <span class="replyClassDelete""><img src="/images/icon-delete.svg" style="margin:7px">Delete</span><span  class="replyClassEdit"><img src="/images/icon-edit.svg" style="margin:7px">Edit</span>
          </div>

          <div class="paragraph"><span >@${replys.replyingTo}</span>
${replys.content}
          </div>
        </div>
      </div>
      
   `)
      );
      document.querySelector(`.replyComments${i}`).appendChild(link);
    }
  }
}

myFunction()

// new comment section
sendCom.addEventListener("click", function (e) {
  let obj = {
    id: 4,
    content: myTextArea.value,
    createdAt: timeAgo.format(new Date()),
    score: 0,
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
  };
  myData.comments.push(obj);
  const myCom = document.createElement('div')
  let myComContent = `<div class="replyComments">
  <div class="myCommentWrite" id="4">
        <div class="rating">
          <img src="/images/icon-plus.svg" alt="" class="plus" />
          <span>${obj.score}</span>
          <img src="/images/icon-minus.svg" alt="" class="minus" />
        </div>
        <div class="userpage">
          <div class="userheader">
            <div class="usernav">
              <img src="${obj.user.image.png}" alt="" class="avatar" width=30 height=30 /><span class="nameClass">${obj.user.username}</span
              ><span class="dateAdded">${obj.createdAt}</span>
            </div>
            <span class="replyClassDelete"><img src="/images/icon-delete.svg" style="margin:7px">Delete</span><span style="font-family:Rubik;font-weight:500;color:hsl(238, 40%, 52%);cursor:pointer;transition :0.3s" class="replyClass"><img src="/images/icon-edit.svg" style="margin:7px">Edit</span>
          </div>

          <div class="paragraph">
${obj.content}
          </div>
        </div>
      </div>

    </div>`;
  myCom.className = 'myWrittenComment'
  myCom.innerHTML = myComContent
  main.appendChild(myCom)
});


// this code makes visible reply form of current div
let replyClass = document.querySelectorAll(".replyClass")
replyClass.forEach(replys => replys.addEventListener("click", function (e) {
  if (e.currentTarget.parentNode.parentNode.parentNode.parentNode.nextElementSibling) {
    e.currentTarget.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.cssText =
      "display:block";
  }
  else {
    e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.nextElementSibling.style.cssText =
      "display:block";
  }

}))
let sendReplies = document.querySelectorAll(".sendReplies")
sendReplies.forEach((send,i) => send.addEventListener("click", function (e) {
  let obj = {
    id: 4,
    content: e.target.previousElementSibling.value,
    createdAt: timeAgo.format(new Date()),
    score: 0,
    replyingTo: myData.comments[i].user.username,
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
  };
  let replyDiv = document.createElement('div')
  replyDiv.innerHTML = `  <div class="replies" id="${obj.id}">
        <div class="rating">
          <img src="/images/icon-plus.svg" alt="" class="plus" />
          <span>${obj.score}</span>
          <img src="/images/icon-minus.svg" alt="" class="minus" />
        </div>
        <div class="userpage">
          <div class="userheader">
            <div class="usernav">
              <img src="${obj.user.image.png}" alt="" class="avatar" width=30 height=30 /><span class="nameClass">${obj.user.username}</span
              ><span class="dateAdded">${obj.createdAt}</span>
            </div>
            <span class="replyClassDelete"><img src="/images/icon-delete.svg" style="margin:7px">Delete</span><span  class="replyClassEdit"><img src="/images/icon-edit.svg" style="margin:7px">Edit</span>
          </div>

          <div class="paragraph"><span >@${obj.replyingTo}</span>
${obj.content}
          </div>
        </div>
      </div>`;
  e.target.parentNode.parentNode.previousElementSibling.appendChild(replyDiv)
    e.currentTarget.parentNode.parentNode.style.cssText = 
    "display:none";
  e.target.previousElementSibling.value = ''
 
}))



