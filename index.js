const form1=document.getElementsByClassName("form");
const forms=Array.from(form1);

let step=0;
forms[0].classList.add("active");
function validateform(event){
    let checkboxes = forms[step].querySelectorAll(".checkbox");
    let onechecked = Array.from(checkboxes).some(cb => cb.checked);
    if(!onechecked){
        event.preventDefault();
        alert("Please select at least one option!");
    }else{
        forms.forEach(form => form.classList.remove("active"));
        step++;
        if (step< forms.length) {
            forms[step].classList.add("active");
        }
        if(step===forms.length){
        }
    }
}
function prevform(event){
    step--;
    if(step>=0){
        forms.forEach(form => form.classList.remove("active"));
        forms[step].classList.add("active");
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
    let length=list.length;
    let i=0;
    let j=0;
    while(i<length){
        while(i<length&&list[i]!="next"){
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
                }else if(list[i]==="Business/study"){
                    electronics.push("Laptop","Laptop charger");
                    utility.push("Stationary");
                }else if(list[i]==="Destination wedding"){
                    footwear.push("Dress shoes");
                    accesory.push("Jewelry");
                }else if(list[i]==="Concert/Festival"){
                    personal_items.push("Small backpack");
                    utility.push("Event passes");
                }
            }else if(j===4){
                if(list[i]==="Female"){
                    accesory.push("Makeup","Hair accesory");
                }else if(list[i]==="Male"){
                    accesory.push("Razor","Shaving Cream");
                }else if(list[i]==="Baby"){
                    personal_items.push("Diapers","Baby wipes","Pacifier");
                }
            }else if(j===5){
                if(list[i]==="Laptop"&&electronics.includes("Laptop")){
                    electronics.push("Laptop","Laptop charger","Mouse");
                }else if(list[i]==="Tablet"){
                    electronics.push("Tablet","Tablet charger");
                }else if(list[i]==="Camera"&&electronics.includes("Camera")){
                    electronics.push("Camera","Batteries","Memory card");
                }else if(list[i]==="E-reader"){
                    electronics.push("E-reader","E-reader charger");
                }else if(list[i]==="Smart watch"){
                    electronics.push("Smart watch","Smart watch charger");
                }
            }else if(j===6){
                if(list[i]==="Yes"){
                    swim.push("Swimsuit","Beach Towel","Googles","Waterproof bag");
                }
            }else if(j===7){
                if(list[i]==="Yes"){
                    personal_items.push("Energy snacks");
                    footwear.push("Sports shoes");
                    clothes.push("Athletic clothing");
                }
            }
            i++;
        }
        j++;
        i++;
    }
    let final_list={
        Personal:personal_items,
        Electronics:electronics,
        Utilities:utility,
        Health:health,
        Clothes: clothes,
        Accessories: accesory,
        Swim: swim,
        Footwear: footwear
    }
    let html = "";
    document.getElementById("step9").innerHTML=`
        <div class="toolbar">
        <button id="printbtn">
            <i class="fa-solid fa-print" style="color: rgb(99, 230, 190);"></i>
        </button>
    </div>
    `;
    for(const category in final_list){
        html += `
        <div class="category">
            <h3>${category}</h3>
        `;
        final_list[category].forEach(item => {
            html += `
            <label class="result">
                <div class="item-left result">
                    <input type="checkbox" class="checkbox" style="gap:10px;">
                    <p class="item-text">${item}</p>
                </div>
                <div class="actions">
                    <i class="fa-regular fa-trash-can delete" style="color: rgb(186, 66, 71);"></i>
                    <i class="fa-regular fa-pen-to-square edit" style="color: rgb(52, 52, 52);"></i>  
                </div>
            </label>
            `;
        });
        html += "</div>";
    }
    forms.forEach(form => form.classList.remove("active"));
    document.getElementById("step9").classList.add("active");
    document.getElementById("step9").innerHTML += html;
}
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete")){
        let label=e.target.closest(".result");
        label.remove();
    }
    if(e.target.closest("#printbtn")){
        window.print();
    }
    if(e.target.classList.contains("edit")){
        e.preventDefault();
        e.stopPropagation();
        let text=e.target.closest(".result").querySelector(".item-text");
        let update=prompt("Edit item:",text.textContent);
        if(update!== null && update.trim()!==""){
            text.textContent=update;
        }
    }
});
document.addEventListener("change",(e)=>{
    if(e.target.type==="checkbox"){
        e.target.parentElement.classList.toggle(
            "checked",
            e.target.checked
        );
    }
})  