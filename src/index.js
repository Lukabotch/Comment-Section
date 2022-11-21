import styles from "./style.css";
import "bootstrap";
import data from "../data.json";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";


const icona = document.querySelector(".avatar");
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const main = document.querySelector(".main");
const currentAvatar = document.querySelector(".currentUserImg");
const replyClass = document.getElementsByClassName("replyClass");
const replyComments = document.getElementsByClassName("replyComments");
const sendCom = document.querySelector(".send");
const myTextArea = document.querySelector(".myTextarea");
const myData = JSON.parse(localStorage.getItem("myData"));
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

function myFunction() {
  for (let i = 0; i < myData.comments.length; i++) {
    let tmp = `
  <div class="replyComments">
  <div class="comment" id="${myData.comments[i].id}">
        <div class="rating">
          <img src="/images/icon-plus.svg" alt="" class="plus" />
          <span>${myData.comments[i].score}</span>
          <img src="/images/icon-plus.svg" alt="" class="minus" />
        </div>
        <div class="userpage">
          <div class="userheader">
            <div class="usernav">
              <img src="${myData.comments[i].user.image.png}" alt="" class="avatar" /><span class="nameClass">${myData.comments[i].user.username}</span
              ><span class="dateAdded">${myData.comments[i].createdAt}</span>
            </div>
            <span style="font-family:Rubik;font-weight:500;color:hsl(238, 40%, 52%);cursor:pointer;transition :0.3s" class="replyClass"><img src="/images/icon-plus.svg" style="margin:7px">Reply</span>
          </div>

          <div class="paragraph">
${myData.comments[i].content}
          </div>
        </div>
      </div>
      
    </div>`;
    main.innerHTML += tmp;
  }
}
myFunction();
function commentFunction() {
  const link = document.createElement("div");
  link.className = "comments";
  if (myData.myComments != undefined) {
    for (let i = 0; i < myData.myComments.length; i++) {
      link.innerHTML = `
  <div class="replyComments">
  <div class="comment" id="${myData.myComments[i].id}">
        <div class="rating">
          <img src="/images/icon-plus.svg" alt="" class="plus" />
          <span>${myData.myComments[i].score}</span>
          <img src="/images/icon-minus.svg" alt="" class="minus" />
        </div>
        <div class="userpage">
          <div class="userheader">
            <div class="usernav">
              <img src="" alt="" class="avatar" /><span class="nameClass">${myData.myComments[i].user.username}</span
              ><span class="dateAdded">${myData.myComments[i].createdAt}</span>
            </div>
            <span style="margin-right:-160px;font-family:Rubik;font-weight:500;color: hsl(358, 79%, 66%);cursor:pointer;transition :0.3s" class="replyClass"><img src="/images/icon-delete.svg" style="margin:7px">Delete</span><span style="font-family:Rubik;font-weight:500;color:hsl(238, 40%, 52%);cursor:pointer;transition :0.3s" class="replyClass"><img src="/images/icon-edit.svg" style="margin:7px">Edit</span>
          </div>

          <div class="paragraph">
${myData.myComments[i].content}
          </div>
        </div>
      </div>
      
    </div>`;
      console.log(myData.myComments);
    }
  }
  main.appendChild(link);
}
commentFunction();
data.myComments = [];
sendCom.addEventListener("click", function () {
  let obj = {
    id: 4,
    content: myTextArea.value,
    createdAt: timeAgo.format(new Date()),

    score: 0,
    user: {
      username: "juliusomo",
    },
  };

  data.myComments.push(obj);
  localStorage.setItem("myData", JSON.stringify(data));
});
