/** @format */

import $ from 'jquery';

type Item = {
  name: string;
  description: string;
  price: number;
  moreInfo: string;
};

function addItem(data: Item) {
  const { name, description, price, moreInfo } = data;

  let html = `
      <div class="item">
        <div class="name">${name}</div>
        <img src="beach.jpg" alt="Beach">
        <div class="description">${description}</div>
        <div class="price">$${price}</div>
        <button class='item-add'>Add to cart</button>
        <button class='item-remove'>Remove</button><br>
        <a href="#" class='more-info-link'>More info</a>
        <div class="more-info">${moreInfo}</div>
      </div>
    `;
  $('#container').prepend(html);
}

$(document).ready(() => {
  $('#button-create-item').on('click', function () {
    const name = $('#input-create-item').val();
    $('#input-create-item').val('');

    let html = `
      <div class="item">
        <div class="name">${name}</div>
        <img src="beach.jpg" alt="Beach">
        <div class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium aspernatur error et sunt exercitationem harum dignissimos corporis magni, assumenda earum tenetur voluptas beatae quidem excepturi pariatur impedit rerum! Accusamus, illo?</div>
        <div class="price">$499</div>
        <button class='item-add'>Add to cart</button>
        <button class='item-remove'>Remove</button><br>
        <a href="#" class='more-info-link'>More info</a>
        <div class="more-info">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</div>
      </div>
    `;

    $('#container').prepend(html);
  });

  $('#container').on('click', '.item-remove', function () {
    $(this).parent().remove();
  });

  $('#container').on('click', '.more-info-link', function (event) {
    event.preventDefault();
    $(this).parent().find('.more-info').slideToggle('fast');
    $(this)
      .animate(
        {
          opacity: 0.5,
          'margin-left': 10,
        },
        'fast',
      )
      .animate(
        {
          opacity: 1,
          'margin-left': 0,
        },
        'fast',
      );
  });

  // add prebuilt items
  $.ajax('item.json', {
    dataType: 'json',
    contentType: 'application/json',
    cache: false,
  })
    .done(function (data) {
      const { items } = data;
      items.forEach(function (item: Item) {
        addItem(item);
      });
    })
    .fail(function (_, __, msg) {
      console.log(msg);
    })
    .always(function () {
      //console.log(arguments);
    });
});
