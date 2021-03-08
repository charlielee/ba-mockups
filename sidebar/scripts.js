window.addEventListener("load", function () {
  /**
   * Activate tabs
   */
  document.querySelector(".tabs").addEventListener("click", function (e) {
    // Get the active pane
    let activeTab = document.querySelector(".tabs .active");
    let activeTabPane = document.querySelector(".tab-pane.active");

    // Switch pane if a tab is found
    let newTab = e.target;
    if (newTab.getAttribute("data-toggle") === "tab") {
      // Get the new tab pane
      let newTabPaneTarget = newTab.getAttribute("href");
      let newTabPane = document.querySelector(newTabPaneTarget);

      activeTab.classList.remove("active");
      activeTabPane.classList.remove("active");
      newTab.classList.add("active");
      newTabPane.classList.add("active");
    }

    e.preventDefault();
  });

  /**
   * Activate modals
   */
  document.querySelector("#openSettingsModalBtn").addEventListener("click", function () {
    alert("Some cool modal full of settings will one day appear here.")
  });

  /** Sidebar resize */
  let sidebarResizer = document.querySelector("#resizeAnimatorSidebar");
  let sidebar = document.querySelector("#animatorSidebar");
  let isDraggingSidebar = false;
  let dragSidebarCurXPosition = 0;

  sidebarResizer.addEventListener("mousedown", function (e) {
    isDraggingSidebar = true;
    dragSidebarCurXPosition = e.pageX;
  });

  document.addEventListener("mousemove", function (e) {
    if (isDraggingSidebar) {
      let xChange = dragSidebarCurXPosition - e.pageX;
      let sidebarWidth = sidebar.offsetWidth;

      sidebar.style.width = `${sidebarWidth + xChange}px`;
      dragSidebarCurXPosition = e.pageX;
    }
  });

  document.addEventListener("mouseup", function () {
    if (isDraggingSidebar) {
      isDraggingSidebar = false;
      dragSidebarCurXPosition = 0;
    }
  });
});