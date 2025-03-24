console.log("Background script loaded!");

let inactivityTimeout = null;

const endpoints = [
  "https://localhost:8080/api/status",
  "https://backend.serkanbayram.dev/api/status",
];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "mouse_move") {
    const latestDate = new Date().toISOString();

    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }

    // Set a new timeout
    inactivityTimeout = setTimeout(() => {
      endpoints.forEach((endpoint) =>
        fetch(endpoint, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latestDate: latestDate }),
          method: "POST",
        }),
      );
    }, 2000);
  }

  // Return true to indicate you might respond asynchronously
  return true;
});
