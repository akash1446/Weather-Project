const checkweather=async(name)=> {
    const apiid="7677b5f3f0e905aef49c3e83a7c0bdfa"
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiid}`
    const res = await fetch(apiurl)
    const data =await res.json()
    console.log(data);

    document.querySelector("#country").innerHTML=data.name
    document.querySelector("#temp").innerHTML=Math.random(data.main.temp); 
    document.querySelector("#des").innerHTML=data.weather[0].description
    document.querySelector("#humidity").innerHTML=data.main.humidity + "%"
    document.querySelector("#wind").innerHTML=data.wind.speed + "km/hr"

}
document.querySelector(" button").addEventListener("click",()=>{
   const location=document.querySelector(" input").value;
    checkweather(location)
})

// checkweather("New Delhi")