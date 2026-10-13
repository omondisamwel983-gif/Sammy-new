const form=document.getElementById("payment-form");
const message=document.getElementById("payment-message");
if(form)form.addEventListener("submit",async e=>{
 e.preventDefault();
 const amount=Number(document.getElementById("amount")?.value);
 const phone=document.getElementById("phone")?.value?.trim();
 const button=form.querySelector('button[type="submit"]');
 if(!Number.isInteger(amount)||amount<1){show("Enter a valid amount of at least KSh 1.",true);return}
 if(!phone){show("Enter the M-Pesa phone number.",true);return}
 if(button){button.disabled=true;button.textContent="Sending request…"}
 show("Contacting Daraja Sandbox…",false);
 try{
  const r=await fetch("/api/stkpush",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({amount,phone})});
  const d=await r.json();if(!r.ok)throw new Error(d.error||"STK Push request failed");
  show(d.message||"Sandbox request submitted. No real money is collected.",false);
 }catch(err){show(err.message||"Request failed. Check configuration.",true)}
 finally{if(button){button.disabled=false;button.textContent="Pay with M-Pesa"}}
});
function show(t,error){if(!message){alert(t);return}message.textContent=t;message.style.display="block";message.style.color=error?"#9b1c1c":"#14532d"}
