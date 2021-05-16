/** @format */

import $ from 'jquery';

$(document).ready(() => {
  $('#input-name').on('keyup', function () {
    const name = $(this).val();
    if (name)
    $('#feedback-message').text(`Pleased to meet you, ${name}`);
    else
    $('#feedback-message').text('');
  });
});
