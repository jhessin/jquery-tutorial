/** @format */

import $ from 'jquery';

let total = 0;

// Format for items to add.
type Item = {
  id?: number;
  name: string;
  description?: string;
  price?: number;
  moreInfo?: string;
};

// Manage adding items with this function
function addItem(data: Item) {
  const {
    id = 0,
    name,
    description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium aspernatur error et sunt exercitationem harum dignissimos corporis magni, assumenda earum tenetur voluptas beatae quidem excepturi pariatur impedit rerum! Accusamus, illo?',
    price = 499,
    moreInfo = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  } = data;

  let html = `
      <div class="item" data-id="${id}">
        <div class="name">${name}</div>
        <img src="assets/beach.jpg" alt="Beach">
        <div class="description">${description}</div>
        <div class="price" data-price="${price}">$${price}</div>
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
  $.ajax('data/item.json', {
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

  $('#container').on('click', '.item-add', function () {
    const id = $(this).parent().data('id');
    $.ajax('data/addToCart.json', {
      type: 'post',
      dataType: 'json',
      contentType: 'application/json',
      data: {
        id,
      },
    }).done(function (res) {
      if (res.message === 'success') {
        const { price } = res;
        total += price;

        $('#cart-container').text(`$${total}`);
      }
    });
  });

  $('#newsletter-checkbox').on('change', function () {
    if ($(this).is(':checked')) {
      $('#newsletter-frequency').slideDown('fast');
    } else {
      $('#newsletter-frequency').slideUp('fast');
    }
  });
  $('#newsletter-checkbox').trigger('change');

  $('#cart-form').on('submit', function (event) {
    event.preventDefault();

    const data = {
      form: $(this).serialize(),
      price: total,
    };
    $.ajax($(this).attr('action'), {
      type: 'post',
      data,
    })
      .done(function (res) {
        $('#feedback-message').text(res.message);
      })
      .fail(function () {
        $('#feedback-message').text(arguments.toString());
      });
  });
});
