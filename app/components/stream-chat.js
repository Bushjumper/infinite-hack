import Component from '@ember/component';
import EmberObject, { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default Component.extend({

  init() {
    this._super(...arguments);
    this.comments = [];
    for (let i = 1; i <= 100; i++) {
      this.comments.push(EmberObject.create({
        body: i,
        height: Math.floor(Math.random() * 30) + 20
      }));
    }
  },

  didInsertElement() {
    console.log('didInsertElement');
    this._super(...arguments);

    this.scrollContainer = document.querySelector('#scrollable');
    this.viewStart();
  },

  didRender() {
    console.log('didRender');
    this._super(...arguments);
  },

  scrollToTop() {
    this.scrollContainer.scrollTop = 0;
  },

  scrollToBottom() {
    this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight - this.scrollContainer.scrollTop;
  },

  hasEarlier: computed('start', 'isRendered', function() {
    return this.isRendered && this.start > 0;
  }),

  hasLater: computed('end', 'isRendered', function () {
    return this.isRendered && this.end < this.comments.length;
  }),

  viewStart() {
    console.log('viewStart');
    this.set('isRendered', false);
    this.set('start', 0);
    this.set('end', 25);
    this.set('viewable', this.comments.slice(this.start, this.end));

    scheduleOnce('afterRender', this, () => {
      this.scrollToTop();
      this.set('isRendered', true);
    });
  },

  viewEnd() {
    console.log('viewEnd');
    this.set('isRendered', false);
    this.set('end', 100);
    this.set('start', 75);
    this.set('viewable', this.comments.slice(this.start, this.end));
    scheduleOnce('afterRender', this, () => {
      this.scrollToBottom();
      this.set('isRendered', true);
    });
  },

  actions: {

    viewStart() {
      this.viewStart();
    },

    viewEnd() {
      this.viewEnd();
    },

    viewEarlier() {
      console.log('viewEarlier');
      // this.set('end', this.end - 25);

      let start = this.start - 25;
      if (start < 0) {
        start = 0;
      }

      this.set('start', start);

      let scrollHeightBeforeRender = this.scrollContainer.scrollHeight;

      this.set('viewable', this.comments.slice(this.start, this.end));

      scheduleOnce('afterRender', this, () => {
        this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight - scrollHeightBeforeRender;
      });
    },

    viewLater() {
      console.log('viewLater');
      // this.set('start', this.start + 25);

      let end = this.end + 25;
      if (end > this.comments.length) {
        end = this.comments.length;
      }
      this.set('end', end);
      this.set('viewable', this.comments.slice(this.start, this.end));
    }
  }
});
