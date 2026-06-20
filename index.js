let personal_items=["Toothbrush","Toothpaste","Comb","Soap","Shampoo","Perfume","Sunscreen"];
let electronics=["Phone","Charger","Earphones","Power Bank","Watch"];
let utility=["Wallet","Government Id","Cash","Tickets"];
let health=["Pain relivers","Vitamins","Fever tablets"];
let clothes=["2 Shirts","Pants","Shorts","Dress","Innerwear"];
let accesory=["Sunglass","Hair tie","Jewels","Hat"];
let swim=["Swimsuit","Beach bag","Beach towel"];
let footwear=["Sandals","Shoes","Flip-Flops"];

function validateform(event){
    let checkboxes=document.querySelectorAll(".checkbox");
    let onechecked = Array.from(checkboxes).some(cb => cb.checked);
    if(!onechecked){
        event.preventDefault();
        alert("Please select at least one option!");
    }
}
