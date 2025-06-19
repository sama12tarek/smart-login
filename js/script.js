var emailData = document.getElementById("emailData");
var passwordData = document.getElementById("passwordData");
var loginBtn = document.querySelector(".login");
var usersDisplay = document.getElementById("userDisplay");
var emailValid = document.querySelector(".emailContent");
var passValid = document.querySelector(".passwordContent");
var signupBtn = document.querySelector(".signUp");
var usersData=document.querySelector(".userData")
var arr = JSON.parse(localStorage.getItem("userData")) || [];

function add() {
  var email = emailData.value.trim();
  var password = passwordData.value.trim();

  var regex = {
    password: /^[1-6a-z]{6}$/, // 6 حروف أو أرقام فقط من 1-6 أو a-z
    email: /^[A-Za-z]{1,9}@gmail\.com$/, // من 1 لـ 9 حروف فقط قبل @gmail
  };

  // التحقق من صحة البيانات
  var emailIsValid = regex.email.test(email);
  var passIsValid = regex.password.test(password);

  if (!emailIsValid) {
    emailValid.classList.remove("d-none");
  } else {
    emailValid.classList.add("d-none");
  }

  if (!passIsValid) {
    passValid.classList.remove("d-none");
  } else {
    passValid.classList.add("d-none");
  }

  // لو فيه خطأ → وقف التنفيذ
  if (!emailIsValid || !passIsValid) {
    return;
  }

  var user = {
    emailData: email,
    passwordData: password,
  };

  // التحقق من التكرار
  var alreadyExists = arr.some(function (item) {
    return item.emailData === user.emailData;
  });

  if (alreadyExists) {
    usersDisplay.textContent = "هذا البريد مستخدم من قبل. جربي بريدًا آخر.";
    return;
  }

  // إضافة المستخدم
  arr.push(user);
  localStorage.setItem("userData", JSON.stringify(arr));
  usersDisplay.textContent = "تم التسجيل بنجاح ✅";

  
  clear();
}

function clear() {
  emailData.value = "";
  passwordData.value = "";
}

loginBtn.addEventListener("click", function(){
  add()
});

document.getElementById("signUpLink").addEventListener("click", function () {
  window.location.href = "signin.html";
});
 document.getElementById("signInBtn").addEventListener("click", function () {
   const name = document.getElementById("name").value.trim();
   const email = document.getElementById("email").value.trim();
   const password = document.getElementById("password").value.trim();

   // تحققي من البيانات البسيطة
   if (!name || !email.includes("@") || password.length < 6) {
     document.getElementById("signupMessage").textContent =
       "Please enter valid data.";
     document.getElementById("signupMessage").style.color = "red";
     return;
   }

   const user = { name, email, password };
   let users = JSON.parse(localStorage.getItem("userData")) || [];

   // تأكد إن الإيميل مش متكرر
   const exists = users.some((u) => u.email === email);
   if (exists) {
     document.getElementById("signupMessage").textContent =
       "Email already exists.";
     document.getElementById("signupMessage").style.color = "red";
     return;
   }

   users.push(user);
   localStorage.setItem("userData", JSON.stringify(users));
   document.getElementById("signupMessage").textContent =
     "Signed up successfully ✅";
 });
/*
signupBtn.addEventListener("click",function(){
window.location.href = "signin.html";





  
  });


*/