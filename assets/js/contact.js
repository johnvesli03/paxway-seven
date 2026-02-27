(function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form || !status) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    status.textContent = "Sending...";
    status.style.color = "#555";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        status.textContent = "✅ Thank you! Your message has been sent.";
        status.style.color = "green";
        form.reset();
      } else {
        const errorData = await response.json();
        status.textContent =
          errorData.errors?.[0]?.message ||
          "❌ Something went wrong. Please try again.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "❌ Network error. Please try later.";
      status.style.color = "red";
    }
  });
})();