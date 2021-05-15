import _ from 'lodash';
import $ from 'jquery';

function component(message: string) {
  const element = document.createElement('div');

  element.innerHTML = _.join(['<p>', message, '</p>'], ' ');

  return element;
}

function print(message: string) {
  document.body.appendChild(component(message));
}

//print('hello');

$(document).ready(() => {
  //$('#content').html('<strong>Hello World</strong>');
  $('#content >>> .non-solid').addClass('highlight');
});

