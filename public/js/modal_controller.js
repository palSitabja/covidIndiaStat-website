var modal = document.getElementById("myModal");
document.getElementById("about_btn").addEventListener("click", function(event){
  
  
  modal.style.display = "block";
  event.preventDefault()
});
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}