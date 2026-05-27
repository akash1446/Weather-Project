// ================= WEATHER APP =================

const checkweather = async (name) => {
  const apiid = "7677b5f3f0e905aef49c3e83a7c0bdfa";

  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiid}&units=metric`;

  try {
    const res = await fetch(apiurl);

    const data = await res.json();

    console.log(data);

    // Invalid city

    if (data.cod == "404") {
      document.querySelector("#err").style.display = "block";

      return;
    }

    // Hide Error

    document.querySelector("#err").style.display = "none";

    // Weather Data

    document.querySelector("#country").innerHTML = data.name;

    document.querySelector("#temp").innerHTML =
      Math.round(data.main.temp) + "°C";

    document.querySelector("#des").innerHTML = data.weather[0].description;

    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";

    document.querySelector("#wind").innerHTML = data.wind.speed + " km/hr";
  } catch (error) {
    console.log(error);
  }
};

// ================= SEARCH BUTTON =================

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const location = document.querySelector("input").value;

    if (location === "") {
      alert("Please enter city name");
    } else {
      checkweather(location);
    }
  });
}

// ================= ENTER KEY =================

const inputField = document.querySelector("input");

if (inputField) {
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      checkweather(inputField.value);
    }
  });
}

// ================= DEFAULT CITY =================

if (document.querySelector(".box-main")) {
  checkweather("Hyderabad");
}

// ================= LOGIN =================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    if (username.trim() === "" || password.trim() === "") {
      alert("Please fill all fields");
    } else {
      alert("Login Successful!");

      window.location.href = "index.html";
    }
  });
}

// ================= SIGNUP =================

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value;

    const dob = document.getElementById("dob").value;

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    if (
      name.trim() === "" ||
      dob.trim() === "" ||
      username.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Please fill all fields");
    } else {
      alert("Signup Successful!");

      window.location.href = "Login.html";
    }
  });
}
