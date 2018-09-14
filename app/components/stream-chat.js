import Component from "@ember/component";
import EmberObject from "@ember/object";
import { next, schedule } from "@ember/runloop";

export default Component.extend({
  init() {
    this._super(...arguments);
    this.comments = [];
    this.firstRenderDone = false;
    this.minScrollTop = 0;

    for (let i = 1; i <= 100; i++) {
      this.comments.push(
        EmberObject.create({
          body: i
        })
      );
    }
  },

  didInsertElement() {
    console.log("didInsertElement");
    this._super(...arguments);

    this.scrollContainer = document.querySelector("#scrollable");
    this.viewEnd();

    $(document).on("scroll", function(e) {
      console.log(e);
    });
  },

  didRender() {
    console.log("didRender");
    this._super(...arguments);
    console.log(
      this.scrollContainer.scrollHeight,
      this.scrollContainer.scrollTop
    );

    if (!this.firstRenderDone) {
      if (this.scrollContainer.querySelectorAll(".comment").length >= 1) {
        this.firstRenderDone = true;
        this.doneRendering();
      }
    }
  },

  doneRendering() {
    console.log("done rendering");
    this.scrollToBottom();
    this.scrollContainer.addEventListener("scroll", e => {
      console.log("scrolling:", this.scrollContainer.scrollTop, e);

      if (this.scrollContainer.scrollTop < this.minScrollTop) {
        e.preventDefault();
        this.scrollContainer.scrollTop = this.minScrollTop;
        return false;
      }
    });
  },

  scrollToBottom() {
    this.scrollContainer.scrollTop =
      this.scrollContainer.scrollHeight -
      this.scrollContainer.clientHeight -
      this.scrollContainer.scrollTop;
  },

  viewEnd() {
    console.log("viewEnd");
    this.set("end", this.comments.length);
    this.set("start", this.end - 25);
    this.set("viewable", this.comments.slice(this.start, this.end));
  },

  calculateMinScrollTop() {
    schedule("afterRender", () => {
      const topMostComment = this.scrollContainer.querySelector(".comment");
      console.log(topMostComment.getBoundingClientRect());
      this.minScrollTop =
        this.scrollContainer.scrollTop +
        topMostComment.getBoundingClientRect().top;

      console.log(this.minScrollTop);
    });
  },

  actions: {
    viewEarlier() {
      console.log("viewEarlier");
      this.set("start", this.start - 25);
      this.set("viewable", this.comments.slice(this.start, this.end));
      this.calculateMinScrollTop();
    },

    viewLater() {
      console.log("viewLater");
    }
  }
});
