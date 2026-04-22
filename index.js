<!DOCTYPE html>
<html>
 
<head>
<title>ZapZap Pro</title>
 
<style>
body{
 font-family:Arial;
 background:#0b141a;
 color:white;
 display:flex;
 justify-content:center;
 align-items:center;
 height:100vh;
}
 
.login{
 display:flex;
 flex-direction:column;
 gap:10px;
}
 
input, select, button{
 padding:10px;
 border:none;
 border-radius:5px;
}
</style>
 
</head>
 
<body>
 
<div class="login">
 <h2>Entrar no ZapZap 🔥</h2>
 
 <input id="name" placeholder="Seu nome">
 
 <select id="room">
   <option value="geral">Geral</option>
   <option value="games">Games</option>
   <option value="estudos">Estudos</option>
 </select>
 
 <button onclick="enter()">Entrar</button>
</div>
 
<script>
function enter(){
 const name = document.getElementById("name").value;
 const room = document.getElementById("room").value;
 
 if(!name) return alert("Digite seu nome");
 
 localStorage.setItem("name", name);
 localStorage.setItem("room", room);
 
 // ✅ CORRIGIDO AQUI
 window.location.href = "bate-papo.html";
}
</script>
 
</body>
</html>
 
