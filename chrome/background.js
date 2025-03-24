console.log("Background script loaded!");

let inactivityTimeout = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "mouse_move") {
    lastMoved = new Date();

    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }

    // Set a new timeout
    inactivityTimeout = setTimeout(() => {
      fetch("https://localhost:8080/api/status", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latestDate: new Date().toISOString() }),
        method: "POST",
      });
      console.log("No mouse movement detected for 2 seconds");

      // send date to database
    }, 2000);
  }

  // Return true to indicate you might respond asynchronously
  return true;
});
