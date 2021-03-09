/** Sidebar resize */
window.addEventListener("load", function () {
  let resize = new SidebarResize();
  resize.init();
});

class SidebarResize {
  constructor() {
    this.isDragging = false;
    this.curXPosition = null;

    this.elSidebarResizer = document.querySelector("#resizeAnimatorSidebar");
    this.elSidebar = document.querySelector("#animatorSidebar");
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
    this._open();
  }

  /**
   * Resize the sidebar to the new position
   * @param {Integer} newX The position to move the sidebar to
   */
  resize(newX) {
    let xChange = this.curXPosition - newX;
    this.curXPosition = newX;

    if (Math.abs(xChange) < 100) {
      let sidebarWidth = this.elSidebar.offsetWidth;
      this.elSidebar.style.width = `${sidebarWidth + xChange}px`;
      document.body.style.cursor = "ew-resize";
    }

    console.log("this.elSidebar.offsetWidth", xChange, this.elSidebar.offsetWidth);
    if (xChange < 0 && this.elSidebar.offsetWidth <= 100) {
      this._close();
    }
  }

  /**
   * Call to finish resizing
   */
  finishResize() {
    this.isDragging = false;
    this.curXPosition = null;
    document.body.style.cursor = "default";
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
    // this.elSidebar.style.width = "auto";
    this.elSidebar.classList.remove("hidden");
  }

  /**
   * Reset the sidebar to it's original width
   */
  reset() {
    this.elSidebar.style.width = "auto";
  }

  _getCurrentWidth() {

  }
}
