let clickCount = 0;

const shareBtn = document.getElementById("shareBtn");
const clickCounter = document.getElementById("clickCounter");
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

if (localStorage.getItem("submitted") === "true") {
  form.querySelectorAll("input, button").forEach(el => el.disabled = true);
  message.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
}

shareBtn.addEventListener("click", () => {
  if (clickCount < 5) {
    const text = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
    window.open(`https://wa.me/?text=${text}`, "_blank");

    clickCount++;
    clickCounter.textContent = `Click count: ${clickCount}/5`;

    if (clickCount === 5) {
      alert("Sharing complete. Please continue.");
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (clickCount < 5) {
    alert("Please complete sharing 5 times before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const fileInput = document.getElementById("screenshot");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", file);

  submitBtn.disabled = true;

  try {
    const response = await fetch("YOUR_GOOGLE_SCRIPT_WEB_APP_URL", {
      method: "POST",
      body: formData
    });
    const result = await response.text();

    if (result === "Success") {
      localStorage.setItem("submitted", "true");
      form.querySelectorAll("input, button").forEach(el => el.disabled = true);
      message.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
    } else {
      message.textContent = "Error occurred while submitting.";
      submitBtn.disabled = false;
    }
  } catch (err) {
    console.error(err);
    message.textContent = "Submission failed. Try again.";
    submitBtn.disabled = false;
  }
});
