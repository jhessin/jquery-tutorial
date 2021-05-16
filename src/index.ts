/** @format */

import $ from 'jquery';

$(document).ready(() => {
  $('#select-menu').on('change', function () {
    const distance = $('#select-menu option:selected').val();
    const name = $('#select-menu option:selected').text();
    const price = $('#select-menu option:selected').data('price');
    if (distance)
      $('#feedback-message').text(
        `You are signing up for a ${name}, which costs $${price}, for a distance of ${distance}km`,
      );
    else $('#feedback-message').text('');
  });
});
