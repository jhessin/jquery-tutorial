/** @format */

import $ from 'jquery';

// Format for items to add.
type Item = {
  name: string;
  description?: string;
  price?: number;
  moreInfo?: string;
};

// Manage adding items with this function
function addItem(data: Item) {
  const {
    name,
    description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium aspernatur error et sunt exercitationem harum dignissimos corporis magni, assumenda earum tenetur voluptas beatae quidem excepturi pariatur impedit rerum! Accusamus, illo?',
    price = 499,
    moreInfo = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  } = data;

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

// Wait for the page to load...
$(document).ready(() => {
  // listen for the user to click the 'add' button
  $('#create-item-form').on('submit', function (event) {
    event.preventDefault();
    const name: string = $('#input-create-item').val().toString();
    $('#input-create-item').val('');

    // add the item
    addItem({
      name,
    });
  });

  // Remove items when the remove button is clicked
  $('#container').on('click', '.item-remove', function () {
    $(this).parent().remove();
  });

  // Toggle more-info
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
