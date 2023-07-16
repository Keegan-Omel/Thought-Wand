const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Stash the event so it can be triggered later
  window.deferredPrompt = event;
  // Update UI notify the user they can add to home screen
  butInstall.disabled = false;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  // Hide the app provided install promotion
  butInstall.disabled = true;

  // Show the install prompt
  const { userChoice } = await window.deferredPrompt.prompt();
  console.log(userChoice);

  // Wait for the user to respond to the prompt
  if (userChoice.outcome === "accepted") {
    console.log("User accepted the A2HS prompt");
  }

  // Clear the deferred prompt variable
  window.deferredPrompt = null;
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("PWA was installed");

  // Clear the deferredPrompt
  window.deferredPrompt = null;

  // Hide the install button
  butInstall.disabled = true;
});