/** @format */

import $ from 'jquery';

$(document).ready(() => {
  //$('.box').on('click', function () {
  //$(this).toggleClass('highlight');
  //});
  $('.box').on('click', '.box-button', event => {
    $(event.toElement).parent().toggleClass('highlight');
  });
});
