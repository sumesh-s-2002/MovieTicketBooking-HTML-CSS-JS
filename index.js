const container =  document.querySelector(".container");
const select = document.querySelector("#movie")
const selectValue = select.value;
let re = /\(\$[0-9]+\)/;
let ticketPriceString = re.exec(selectValue);
let ticketPrice = +(ticketPriceString[0].match(/[0-9]+/)[0])
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector(".count");
const price = document.querySelector(".price");
//definePopulateItems
function populateItems(){
    ///setting selcted Movie
    let movieLocal = localStorage.getItem("movie")
    let selectedIndex = localStorage.getItem("selectedIndex")
    let countLocal = localStorage.getItem("count")
    let priceLocal = localStorage.getItem("price")
    if(movieLocal != null){
        select.selectedIndex = movieLocal;
    }else{
        select.selectedIndex = 0;
    }
    //setting selcted seates
    if(selectedIndex!= null && selectedIndex.length>0){
        seats.forEach(function(item, index){
            if(selectedIndex.indexOf(index) > -1){
                item.classList.add("selected")
            }
        })
    }
    //setting count
    if(countLocal != null && priceLocal != null){
        count.innerHTML = countLocal;
        price.innerHTML = priceLocal;
    }
}

//defining update function
function update(){
    const selected = document.querySelectorAll(".row .selected");
    const selectedIndex = [...selected].map(function(seat){
        return [...seats].indexOf(seat)
    })
    localStorage.setItem("selectedIndex", JSON.stringify(selectedIndex));
    let length = selected.length;
    count.innerHTML = length;
    price.innerHTML = ticketPrice*length;
    localStorage.setItem("count", length)
    localStorage.setItem("price", ticketPrice*length);
}
//addding event Listners
container.addEventListener("click", function(e){
    if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected")
        update();
    }
})
select.addEventListener("change", (e)=>{
    let selectedIndex = e.target.selectedIndex;
    localStorage.setItem("movie", selectedIndex);
    ticketPrice =  +select.value.match(re)[0].match(/[0-9]+/)[0];
    update();
})
//popoulating items
document.addEventListener("DOMContentLoaded", populateItems);

