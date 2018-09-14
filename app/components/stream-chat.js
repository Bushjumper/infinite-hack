import Component from '@ember/component';
import EmberObject from '@ember/object';

export default Component.extend({

  init() {
    this._super(...arguments);
    this.comments = [];
    for (let i = 1; i <= 100; i++) {
      this.comments.push(EmberObject.create({
        body: i
      }));
    }
  },

  didInsertElement() {
    console.log('didInsertElement');
    this._super(...arguments);

    this.scrollContainer = document.querySelector('#scrollable');
    this.viewEnd();
  },

  didRender() {
    console.log('didRender');
    this._super(...arguments);
    this.scrollToBottom();
  },

  scrollToBottom() {
    this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight - this.scrollContainer.scrollTop;
  },

  viewEnd() {
    console.log('viewEnd');
    this.set('end', this.comments.length);
    this.set('start', this.end - 25);
    this.set('viewable', this.comments.slice(this.start, this.end));
  },

  actions: {
    viewEarlier() {
      console.log('viewEarlier');
      this.set('start', this.start - 25);
      this.set('viewable', this.comments.slice(this.start, this.end));
      this.scrollToBottom();
    },

    viewLater() {
      console.log('viewLater');
    }
  }
});
