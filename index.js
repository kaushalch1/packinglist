const e = require("express");

function validateform(event){
    let checkboxes=document.querySelectorAll(".checkbox");
    let onechecked = Array.from(checkboxes).some(cb => cb.checked);
    if(!onechecked){
        event.preventDefault();
        alert("Please select at least one option!");
    }
}
document.getElementById("packingForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    let obj = {};
    let formdata=new FormData(this);
    formdata.forEach((value, key) => {
        obj[key] = value;
    });
    try{
        let res=await fetch("/options",{
            method:'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(obj)
        });
        let result = await res.json();
        console.log(result);
        updatelist(result.data);
    }catch(error){
        console.log(error);
    }
});
let personal_items=["Toothbrush","Toothpaste","Comb","Soap","Shampoo","Perfume"];
let electronics=["Phone","Charger","Earphones","Power Bank","Watch"];
let utility=["Wallet","Government Id","Cash","Tickets"];
let health=["Pain relivers","Vitamins","Fever tablets"];
let clothes=["2 Shirts","Pants","Shorts","Dress","Innerwear"];
let accesory=["Sunglass","Hair tie","Jewels","Hat"];
let swim=["Swimsuit","Beach bag","Beach towel"];
let footwear=["Sandals","Shoes","Flip-Flops"];

function updatelist(list){
    console.log(list);
    let length=list.length(),i=0;
    while(i<=length){
        while(list[i]!="next"){
            if(j===0){
                if(list[i]==="Different Country"){
                    utility.push("Passport","Visa","Foreign Currency","International sim");
                }
            }else if(j===1){
                if(list[i]==="Hotel"){
                    utility.push("Room tickets");
                }else if(list[i]==="Hostel"){
                    personal_items.push("Earplugs");
                }else if(list[i]==="Friend's house"){
                    footwear.push("House slippers");
                }else if(list[i]==="Camping"){
                    personal_items.push("Tent","Sleeping Bag","Stove");
                    accesory.push("Bottle");
                }
            }else if(j===2){
                if(list[i]=="Freezing"){
                    clothes.push("Thermals","Gloves","Scarf","Winter boots");
                }else if(list[i]==="Cold"){
                    clothes.push("Jacket","Sweater","Warm socks");
                }else if(list[i]==="Cool"){
                    clothes.push("Light jacket","Long sleeve shirts");
                }else if(list[i]==="Hot"){
                    personal_items.push("Sunscreen")
                }
                else if(list[i]==="Rainy"){
                    utility.push("Umbrella");
                    clothes.push("Rain jacket");
                    footwear.push("Waterproof shoes");
                }
            }else if(j===3){
                if(list[i]==="Vacation"){
                    electronics.push("Camera");
                }else if(list[i]==="Business/Study"){
                    electronics.push("Laptop","Laptop charger");
                    utility.push("Stationary");
                }else if(list[i]==="Destination wedding"){
                    footwear.push("Dress shoes");
                    accesory.push("Jewelry");
                }else if(list[i]==="Concert/Festival"){
                    personal_items.push("Small backpack");
                    utility.push("Event passes");
                }
            }
            i++;
        }
        j++;
        i++;
    }
}