const container = document.querySelector('.container');
const tipbtns = document.querySelectorAll('.tipbtn');
const billInput  =document.querySelector('#bill');
const tipInput = document.querySelector("#tip");
const peopleInput  =document.querySelector("#nos");
const totalBill = document.querySelector('#totalAmount');
const tipAmount = document.querySelector('#tipAmount');
const resetBtn = document.querySelector("#reset");


let t=0,billAmount=0,peopleNo=1;


function calculate(){
    if(billAmount){
        const tipAmt = Number((billAmount*t)/100);
        console.log(tipAmt,"Tip Amount");
        console.log(billAmount,"Bill Amount");
        const total = Number(billAmount)+tipAmt;
        console.log(total,"Total");
        tipAmount.textContent = `$${(tipAmt / (peopleNo || 1)).toFixed(2)}`;
        totalBill.textContent = `$${(total / (peopleNo || 1)).toFixed(2)}`; 
    }else {
        tipAmount.textContent = `$0.00`;
        totalBill.textContent = `$0.00`;
    }
}


function setFromInput(num,element){
    if(num.target.value===0 || num.target.value==='0'){
        console.log("bill cant be zero");
        document.querySelector(`label[for='${element}'] span`).classList.add("error");
        return;
    }
    document.querySelector(`label[for='${element}'] span`).classList.remove("error");

    if(element==='tip'){
        document.querySelector(".tipbtn.active")?.classList.remove("active");
        t=num.target.value;
        console.log(t," tip was selected")
    }else if(element==='bill'){
        billAmount = num.target.value;
        console.log(billAmount," billAmount was selected")
    }
    else{
        peopleNo = num.target.value;
        console.log(peopleNo," no. of people was selected")
    }
    calculate();

};

function reset(){
    tipInput.value="";
    billInput.value="";
    peopleInput.value="";
    t=0;
    peopleNo=1;
    billAmount=0;
    calculate();
    document.querySelector('.tipbtn.active')?.classList.remove('active');
    document.querySelector(`label[for='${tip}'] span`).classList.remove("error");
    document.querySelector(`label[for='${bill}'] span`).classList.remove("error");
    document.querySelector(`label[for='${nos}'] span`).classList.remove("error");
}
tipbtns.forEach(btn=>{
    btn.addEventListener('click',(event)=>{
        event.preventDefault();
        document.querySelector('.tipbtn.active')?.classList.remove('active');
        event.target.classList.add('active');
        t =+ event.target.value;
        console.log(t);
        calculate();
    });
});


tipInput.addEventListener('input',(e)=>{
    setFromInput(e,"tip");
});

billInput.addEventListener('input',(e)=>{
    setFromInput(e,"bill");
});

peopleInput.addEventListener('input',(e)=>{
    setFromInput(e,"nos");
});

resetBtn.addEventListener('click',reset);