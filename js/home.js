var sitename = document.getElementById("sitename");
var siteurl = document.getElementById("siteurl");
var searchinput = document.getElementById("searchinput");
var submitbutton = document.getElementById("submitbutton");
var updatebutton = document.getElementById("updatebutton");
var alert = document.getElementById("alert");
var alert1 = document.getElementById("alert1");
var exitbtn = document.getElementById("exitbtn");
var nameee = document.getElementById("name");
var accounts = [];

if (localStorage.getItem("accounts") != null) {
  accounts = JSON.parse(localStorage.getItem("accounts"));
}

if (localStorage.getItem("sessionusername") != null) {
  nameee.innerHTML = `welcome...${JSON.parse(
    localStorage.getItem("sessionusername")
  )}`;
}

var updateindex = 0;
var webs = [];

if (localStorage.getItem("memory") != null) {
  webs = JSON.parse(localStorage.getItem("memory"));
  displaydata();
}

function clearformAndAlerts() {
  sitename.value = "";
  siteurl.value = "";
  sitename.classList.remove("is-valid", "is-invalid");
  siteurl.classList.remove("is-valid", "is-invalid");
  alert.classList.add("d-none");
  alert1.classList.add("d-none");
}

function isDuplicate(name, url, ignoreIndex = -1) {
  return webs.some(
    (web, idx) =>
      idx !== ignoreIndex && (web.sitename === name || web.siteurl === url)
  );
}

function adddata() {
  var nameVal = sitename.value.trim();
  var urlVal = siteurl.value.trim();

  if (!nameVal && !urlVal) {
    alert.classList.remove("d-none");
    alert1.classList.remove("d-none");
    return;
  }
  if (!validationname() && !validationsite()) {
    alert.classList.remove("d-none");
    alert1.classList.remove("d-none");
    return;
  }
  if (!validationname()) {
    alert.classList.remove("d-none");
    alert1.classList.add("d-none");
    return;
  }
  if (!validationsite()) {
    alert.classList.add("d-none");
    alert1.classList.remove("d-none");
    return;
  }
  if (isDuplicate(nameVal, urlVal)) {
    alert.classList.remove("d-none");
    alert1.classList.remove("d-none");
    alert.textContent = "Site name or URL already exists.";
    return;
  }

  var web = {
    sitename: nameVal,
    siteurl: urlVal,
  };
  webs.push(web);
  localStorage.setItem("memory", JSON.stringify(webs));
  displaydata();
  clearformAndAlerts();
}

function clearform() {
  sitename.value = "";
  siteurl.value = "";
}

function displaydata() {
  var term = searchinput.value;
  var cartona = "";
  for (var i = 0; i < webs.length; i++) {
    if (webs[i].sitename.toLowerCase().includes(term.toLowerCase())) {
      cartona += `<tr>
  <td>${i + 1}</td>
  <td>${webs[i].sitename}</td>
  <td><a href="${
    webs[i].siteurl
  }" target="_blank"><button class="btn btn-visit">
  <i class="fa-solid fa-eye pe-2"></i>Visit
  </button></a></td>
  <td><a href="#"><button class="btn btn-delete pe-2" onclick="deletedata(${i});">
  <i class="fa-solid fa-trash-can"></i>
  Delete
  </button></a></td>
  <td><a href="#"><button class="btn btn-visit" onclick="setdata(${i});">
  <i class="fa-solid fa-wrench pe-2"></i>Update
  </button></a></td>
  </tr>`;
    }
  }
  document.getElementById("tablebody").innerHTML = cartona;
}

function deletedata(index) {
  webs.splice(index, 1);
  displaydata();
  localStorage.setItem("memory", JSON.stringify(webs));
  clearformAndAlerts();
}

function setdata(index) {
  updateindex = index;
  sitename.value = webs[index].sitename;
  siteurl.value = webs[index].siteurl;
  updatebutton.classList.remove("d-none");
  submitbutton.classList.add("d-none");
  sitename.classList.remove("is-valid", "is-invalid");
  siteurl.classList.remove("is-valid", "is-invalid");
  alert.classList.add("d-none");
  alert1.classList.add("d-none");
}

function updatedata() {
  var nameVal = sitename.value.trim();
  var urlVal = siteurl.value.trim();

  if (!nameVal && !urlVal) {
    alert.classList.remove("d-none");
    alert1.classList.remove("d-none");
    return;
  }
  if (!validationname() && !validationsite()) {
    alert.classList.remove("d-none");
    alert1.classList.remove("d-none");
    return;
  }
  if (!validationname()) {
    alert.classList.remove("d-none");
    alert1.classList.add("d-none");
    return;
  }
  if (!validationsite()) {
    alert.classList.add("d-none");
    alert1.classList.remove("d-none");
    return;
  }
  if (isDuplicate(nameVal, urlVal, updateindex)) {
    alert.classList.remove("d-none");
    alert1.classList.remove("d-none");
    alert.textContent = "Site name or URL already exists.";
    return;
  }

  var web = {
    sitename: nameVal,
    siteurl: urlVal,
  };
  webs.splice(updateindex, 1, web);
  submitbutton.classList.remove("d-none");
  updatebutton.classList.add("d-none");
  localStorage.setItem("memory", JSON.stringify(webs));
  displaydata();
  clearformAndAlerts();
}

function validationname() {
  var text = sitename.value.trim();
  var regexname = /^[a-z]{3,15}$/g;
  if (regexname.test(text)) {
    sitename.classList.add("is-valid");
    sitename.classList.remove("is-invalid");
    return true;
  } else if (text === "") {
    sitename.classList.remove("is-valid", "is-invalid");
    return false;
  } else {
    sitename.classList.remove("is-valid");
    sitename.classList.add("is-invalid");
    return false;
  }
}

function validationsite() {
  var text = siteurl.value.trim();
  var regexname =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  if (regexname.test(text)) {
    siteurl.classList.add("is-valid");
    siteurl.classList.remove("is-invalid");
    return true;
  } else if (text === "") {
    siteurl.classList.remove("is-valid", "is-invalid");
    return false;
  } else {
    siteurl.classList.remove("is-valid");
    siteurl.classList.add("is-invalid");
    return false;
  }
}

searchinput.addEventListener("input", displaydata);

exitbtn.addEventListener("click", function () {
  window.location = "./index.html";
});

sitename.addEventListener("input", function () {
  alert.classList.add("d-none");
  alert1.classList.add("d-none");
  sitename.classList.remove("is-invalid");
});

siteurl.addEventListener("input", function () {
  alert.classList.add("d-none");
  alert1.classList.add("d-none");
  siteurl.classList.remove("is-invalid");
});
