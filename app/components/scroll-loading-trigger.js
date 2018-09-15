import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, {

  init() {
    this._super(...arguments);

    //refer to https://github.com/DockYard/ember-in-viewport for option
    this.setProperties({
      viewportSpy: true,
      viewportTolerance: {
        top: 100,
        bottom: 100,
        left: 0,
        right: 0
      }
    });
  },

  didEnterViewport() {
    console.log('didEnterViewport');
    if (!this.get('isDisabled') && !this.get('isLoading') && this.get('onEnterViewport')) {
      this.get('onEnterViewport')();
    }
  },

  didExitViewport() {
    console.log('didExitViewport');
    // if (!this.get('isDisabled') && !this.get('isLoading') && this.get('onExitViewport')) {
    //   this.get('onExitViewport')();
    // }
  }
});
