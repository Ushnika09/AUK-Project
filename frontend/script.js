document.getElementById("registration-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (!username || !email || !phone || !password) {
      alert("All fields are required.");
      return;
    }
  
    // Data to be sent to the backend
    const userData = {
      username: username,
      email: email,
      phone: phone,
      password: password,
    };
  
    console.log("User Data:", userData); // For testing
    alert("Form submitted! (Backend connection will be added next)");
  });
  