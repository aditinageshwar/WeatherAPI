//set time count
setInterval(getTime,1000);
function getTime()
{
  document.getElementById("time").innerHTML = new Date().toLocaleTimeString();
  document.getElementById("time").innerHTML+= `<p style="line-height:0px;margin-left:15px;">${new Date().toLocaleString('default', {month: 'long'})} ${new Date().getDate()}</p>`;
}

//for API                       
const input = document.querySelector("input");
const btn = document.querySelector("button");
const frontimg=document.querySelector("#frontimg");

const apiKey="e9d94cf6d2d9f9daa4798edab5a2a505";
const apiURL="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city)
{
  if(city.length==0)
    alert("Please enter city name");
  else
  {
    const res=await fetch(apiURL + city + `&appid=${apiKey}`);
    if(res.status == 404)                                                             //error 404 not found
        alert("Invalid City name");
    else
    {              
      var info = await res.json();

      document.getElementById("city").innerHTML=info.name;                             //write folder name from console by using console.log
      document.querySelector("h2").innerHTML=info.main.temp+" °C";
      document.getElementById("humidityTemp").innerHTML=info.main.humidity+"%";
      document.getElementById("windSpeed").innerHTML=info.wind.speed+"km/h";

      if(info.weather[0].main=="Clouds")                                              //changes images also
        frontimg.src="clouds.png";
      else if(info.weather[0].main=="Clear")
        frontimg.src="clear.png";
      else if(info.weather[0].main=="Rain")
        frontimg.src="rain.png";
      else if(info.weather[0].main=="Drizzle")
        frontimg.src="front.png";
      else if(info.weather[0].main=="Mist" || info.weather[0].main=="Haze")
        frontimg.src="mist.png";
    }
    input.value=""; 
  }
}
btn.addEventListener("click", ()=>checkWeather(input.value));

//for toggle between light and dark mode

let modeimg = document.getElementById("modeimg");
let modetxt = document.getElementById("modetxt");
modeimg.onclick = function()
{
  document.body.classList.toggle("darkMode");
  if(document.body.classList.contains("darkMode"))
    {
      modeimg.src="sun.png";
      modetxt.innerHTML="Light";
    }
  else
    {
      modeimg.src="moon.png";
      modetxt.innerHTML="Dark";
    }
}