/** Sidebar resize */
window.addEventListener("load", function () {
  let resize = new SidebarResize();
  resize.init();
});

class SidebarResize {
  constructor() {
    this.elSidebarResizer = document.querySelector("#resizeAnimatorSidebar");
    this.elSidebar = document.querySelector("#animatorSidebar");

    this.isDragging = false;
    this.curXPosition = null;

    this.minimumWidthClose = 100;
    this.minimumWidthStick = 200;
    this.maximumWidth = 800;
  }

  init() {
    let self = this;

    self.elSidebarResizer.addEventListener("pointerdown", function (e) {
      if (!self.isDragging) {
        self.startResize(e.pageX);
      }
    });

    document.addEventListener("pointermove", function (e) {
      if (self.isDragging) {
        self.resize(e.pageX);
      }
    });

    document.addEventListener("pointerup", function (e) {
      if (self.isDragging) {
        self.finishResize();
      }
    });

    self.elSidebarResizer.addEventListener("dblclick", function () {
      self.reset();
    });
  }

  /**
   * Begin resizing the sidebar
   * @param {Integer} curX The position the resize is starting from
   */
  startResize(curX) {
    this.isDragging = true;
    this.curXPosition = curX;
  }

  /**
   * Resize the sidebar to the new position
   * @param {Integer} newX The position to move the sidebar to
   */
  resize(newX) {
    let pageWidth = window.innerWidth;
    let xChange = this.curXPosition - newX;
    let widthFromEdgeOfPage = pageWidth - this.curXPosition;
    this.curXPosition = newX;

    // Cancel is something silly is happening
    if (Math.abs(xChange) > 100) return;

    // Set cursor
    document.body.classList.add("cursor-ew-resize")

    // Resize to new width if between max and min sticky width
    if (widthFromEdgeOfPage < this.maximumWidth && widthFromEdgeOfPage >= this.minimumWidthStick) {
      this.elSidebar.style.width = `${widthFromEdgeOfPage}px`;
    }

    // Close if shrinking sidebar
    if (xChange < 0 && widthFromEdgeOfPage <= this.minimumWidthClose) {
      this._close();
      this.finishResize();
    }

    // Open if expanding sidebar
    if (xChange > 0 && widthFromEdgeOfPage > this.minimumWidthClose) {
      this._open();
    }
  }

  /**
   * Call to finish resizing
   */
  finishResize() {
    this.isDragging = false;
    this.curXPosition = null;
    document.body.classList.remove("cursor-ew-resize")
  }

  /**
   * Reset the sidebar to it's original width
   */
    reset() {
    this.elSidebar.style.width = "auto";
    this._open();
  }

  /**
   * Closes the sidebar
   */
  _close() {
    this.elSidebar.classList.add("hidden");
  }

  /**
   * Opens a closed sidebar
   */
  _open() {
    this.elSidebar.classList.remove("hidden");
  }
}
