let modal = document.getElementById("myModal");
let imgPort = document.querySelectorAll(".image-port")
// let imgMerch = document.querySelectorAll(".image-merch")
let modalImg = document.getElementById("img01");
let captionText = document.getElementById("caption");
let span = document.getElementsByClassName("close")[0];

function modalActivation(e) {
    modal.style.display = "block"
    modalImg.src = e.target.attributes.largeimg.value
   
    // captionText.innerHTML = e.target.alt
    // console.log(e, e.src, e.target.alt)
}

span.onclick = function() { 
    modal.style.display = "none";
  }

  imgPort.forEach((item,i) => {
    item.addEventListener("click", modalActivation)

})