// ================= WEATHER APP =================

const API_KEY = "7677b5f3f0e905aef49c3e83a7c0bdfa";

// ================= WEATHER ICONS =================

const iconMap = {
  clear: "ti-sun",
  clouds: "ti-cloud",
  rain: "ti-cloud-rain",
  drizzle: "ti-cloud-drizzle",
  thunderstorm: "ti-bolt",
  snow: "ti-snowflake",
  mist: "ti-mist",
  fog: "ti-mist",
  haze: "ti-mist",
  smoke: "ti-mist",
  dust: "ti-mist",
  sand: "ti-mist",
  ash: "ti-mist",
  squall: "ti-wind",
  tornado: "ti-tornado",
};

// ================= DATE =================

const now = new Date();

const wxDate = document.getElementById("wxDate");

if (wxDate) {
  wxDate.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ================= FETCH WEATHER =================

async function fetchWeather(city) {
  const err = document.getElementById("err");

  const card = document.getElementById("weatherCard");

  if (err) err.style.display = "none";

  if (card) card.classList.add("loading");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
    );

    if (!res.ok) {
      throw new Error("City not found");
    }

    const d = await res.json();

    // ================= UPDATE UI =================

    const country = document.getElementById("country");
    const temp = document.getElementById("temp");
    const des = document.getElementById("des");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const bgIcon = document.getElementById("bgIcon");

    if (country) {
      country.textContent =
        d.name + (d.sys.country ? `, ${d.sys.country}` : "");
    }

    if (temp) {
      temp.textContent = Math.round(d.main.temp);
    }

    if (des) {
      des.textContent = d.weather[0].description;
    }

    if (humidity) {
      humidity.textContent = d.main.humidity + "%";
    }

    if (wind) {
      wind.textContent = Math.round(d.wind.speed * 3.6) + " km/h";
    }

    // ================= WEATHER ICON =================

    const mainKey = d.weather[0].main.toLowerCase();

    const iconClass = iconMap[mainKey] || "ti-cloud";

    if (bgIcon) {
      bgIcon.className = `ti ${iconClass} bg-icon`;
    }
  } catch (error) {
    console.log(error);

    if (err) {
      err.style.display = "block";
    }
  } finally {
    if (card) {
      card.classList.remove("loading");
    }
  }
}

// ================= SEARCH BUTTON =================

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();

    if (city) {
      fetchWeather(city);
    } else {
      alert("Please enter city name");
    }
  });
}

// ================= ENTER KEY =================

const cityInput = document.getElementById("cityInput");

if (cityInput) {
  cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const city = e.target.value.trim();

      if (city) {
        fetchWeather(city);
      }
    }
  });
}

// ================= DEFAULT CITY =================

if (document.getElementById("weatherCard")) {
  fetchWeather("Hyderabad");
}

// ======================================================
// ================= SIGNUP PAGE ========================
// ======================================================

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  // ================= TOGGLE PASSWORD =================

  const togglePw = document.getElementById("togglePw");

  if (togglePw) {
    togglePw.addEventListener("click", function () {
      const pw = document.getElementById("password");

      const icon = document.getElementById("eyeIcon");

      if (pw.type === "password") {
        pw.type = "text";

        if (icon) {
          icon.className = "ti ti-eye-off";
        }
      } else {
        pw.type = "password";

        if (icon) {
          icon.className = "ti ti-eye";
        }
      }
    });
  }

  // ================= PASSWORD STRENGTH =================

  const passwordInput = document.getElementById("password");

  if (passwordInput) {
    const bars = [
      document.getElementById("s1"),
      document.getElementById("s2"),
      document.getElementById("s3"),
      document.getElementById("s4"),
    ];

    const label = document.getElementById("strengthLabel");

    const levels = [
      { color: "#e24b4a", text: "Weak" },
      { color: "#ef9f27", text: "Fair" },
      { color: "#1d9e75", text: "Good" },
      { color: "#0f6e56", text: "Strong" },
    ];

    passwordInput.addEventListener("input", function () {
      const val = this.value;

      let score = 0;

      if (val.length >= 8) score++;

      if (/[A-Z]/.test(val)) score++;

      if (/[0-9]/.test(val)) score++;

      if (/[^A-Za-z0-9]/.test(val)) score++;

      bars.forEach((bar, i) => {
        if (!bar) return;

        bar.style.background =
          val.length === 0
            ? "var(--border-md)"
            : i < score
              ? levels[score - 1].color
              : "var(--border-md)";
      });

      if (label) {
        label.textContent = val.length === 0 ? "" : levels[score - 1].text;

        label.style.color =
          val.length === 0 ? "var(--text-muted)" : levels[score - 1].color;
      }
    });
  }

  // ================= ALERT FUNCTIONS =================

  function showSignupAlert(msg, type) {
    const box = document.getElementById("signupAlert");

    const msgEl = document.getElementById("signupMsg");

    if (box && msgEl) {
      box.className = "alert " + type;

      msgEl.textContent = msg;
    }
  }

  function hideSignupAlert() {
    const box = document.getElementById("signupAlert");

    if (box) {
      box.className = "alert";
    }
  }

  // ================= SIGNUP LOGIC =================

  signupBtn.addEventListener("click", function () {
    const name = document.getElementById("name").value.trim();

    const dob = document.getElementById("dob").value;

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value;

    hideSignupAlert();

    if (!name || !dob || !username || !password) {
      showSignupAlert("Please fill in all fields.", "error");

      return;
    }

    if (password.length < 6) {
      showSignupAlert("Password must be at least 6 characters.", "error");

      return;
    }

    // ================= SAVE USER =================

    const userData = {
      name,
      dob,
      username,
      password,
    };

    localStorage.setItem("weatherUser", JSON.stringify(userData));

    showSignupAlert("Account created successfully!", "success");

    setTimeout(() => {
      window.location.href = "Login.html";
    }, 1500);
  });
}

// ======================================================
// ================= LOGIN PAGE =========================
// ======================================================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  // ================= TOGGLE PASSWORD =================

  const togglePw = document.getElementById("togglePw");

  if (togglePw) {
    togglePw.addEventListener("click", function () {
      const pw = document.getElementById("password");

      const icon = document.getElementById("eyeIcon");

      if (pw.type === "password") {
        pw.type = "text";

        if (icon) {
          icon.className = "ti ti-eye-off";
        }
      } else {
        pw.type = "password";

        if (icon) {
          icon.className = "ti ti-eye";
        }
      }
    });
  }

  // ================= ALERT FUNCTIONS =================

  function showLoginAlert(msg, type) {
    const box = document.getElementById("alertBox");

    const msgEl = document.getElementById("alertMsg");

    if (box && msgEl) {
      box.className = "alert " + type;

      msgEl.textContent = msg;
    }
  }

  function hideLoginAlert() {
    const box = document.getElementById("alertBox");

    if (box) {
      box.className = "alert";
    }
  }

  // ================= LOGIN LOGIC =================

  loginBtn.addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value;

    hideLoginAlert();

    if (!username || !password) {
      showLoginAlert("Please fill in all fields.", "error");

      return;
    }

    // ================= GET USER =================

    const storedUser = JSON.parse(localStorage.getItem("weatherUser"));

    if (!storedUser) {
      showLoginAlert("No account found. Please signup first.", "error");

      return;
    }

    // ================= VALIDATE LOGIN =================

    if (username === storedUser.username && password === storedUser.password) {
      showLoginAlert("Login successful! Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      showLoginAlert("Invalid Username or Password", "error");
    }
  });
}
