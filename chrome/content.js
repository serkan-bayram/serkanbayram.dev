console.log("Mouse tracker content script loaded!");

// content.js
document.addEventListener("mousemove", function (event) {
  // Get mouse coordinates
  const x = event.clientX;
  const y = event.clientY;

  // You can send this data to your background script if needed
  chrome.runtime.sendMessage({ type: "mouse_move", x: x, y: y });
});
