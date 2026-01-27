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

document.getElementById("MyButton").addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginBtn = document.getElementById("loginBtn")

    if (username === "" || password === "") {
        alert("Please enter username and password");
    } else {
        alert("Login successful!");
        
    }
});

document.getElementById("MyButton").addEventListener("click", function () {4
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (name === "" || dob === "" || username === "" || password === "") {
        alert("Please enter name, DOB username and password");
    } else {
        alert("SignUp is successful!");
        // redirect example
        // window.location.href = "home.html";
    }
});
