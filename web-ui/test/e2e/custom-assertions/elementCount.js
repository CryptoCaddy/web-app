// A custom Nightwatch assertion.
// The assertion name is the filename.
// Example usage:
//
//   browser.assert.elementCount(selector, count)
//
// For more information on custom assertions see:
// http://nightwatchjs.org/guide#writing-custom-assertions


exports.assertion = function elementCount(selector, count) {
  'use strict';

  this.message = `Testing if element <${selector}> has count: ${count}`;
  this.expected = count;
  this.pass = (val) => val === count;
  this.value = (res) => res.value;
  this.command = (cb) =>
    this.api.execute(
      (_selector) => document.querySelectorAll(_selector).length,
      [selector],
      cb,
    );
};
