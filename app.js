var state = {
  items: []
};


function add(name) {

  var data = {
    id: Math.floor(Math.random() * 50000),
    name: name,
    checked: false
  };

  state
    .items
    .push(data);
}

function findIndexById(id) {
  for (var i = 0; i < state.items.length; i++) {
    if (state.items[i].id === id) {
      return i;
    }
  }
}

function remove(id) {
  state
    .items
    .splice(findIndexById(id), 1);
}


function appendList() {
  $('.shopping-list').empty();
  for (var i = 0; i < state.items.length; i++) {
    var item = state.items[i];

    var template = $('<li class="collection-item"><span></span><div><button class="secondary-content delete">Remove</button><button class="check-off">check off</button><button class="edit">edit</button></div></li>');
    template.attr('value', item.id);
    template
      .find('span')
      .text(item.name);

    if (item.checked) {
      template
        .find('span')
        .css('text-decoration', 'line-through');
    }

    $('.shopping-list').append(template);
  }
}

$('#shopping-list-form')
  .submit(function (event) {
    event.preventDefault();
    var name = $('#shopping-list-entry').val();
    add(name);
    appendList();
    $('#shopping-list-form').children('input').val(''); ///look at me//
  });

$('.shopping-list').on('click', '.delete', function () {
  var id = $(this)
    .parents('li')
    .attr('value');
  remove(parseInt(id));
  appendList();
});

$('.shopping-list').on('click', '.check-off', function () {
  var id = parseInt($(this).parents('li').attr('value'));
  if (state.items[findIndexById(id)].checked) {
    state.items[findIndexById(id)].checked = false;
  } else {
    state.items[findIndexById(id)].checked = true
  }

  appendList();


});

$('.shopping-list').on('click', '.edit', function () {

  var $span = $(this).parents('li').find('span');
  var existingValue = $span.text();
  var $input = $('<input id="shopping-list-entry">');

  $input.attr('value', existingValue);
  $span.html($input);
  $(this).text('save');


  $(this).on('click', function () {
    var $newValue = $input.val();
    var id = $(this)
      .parents('li')
      .attr('value');
    remove(parseInt(id))
    add($newValue);
    appendList();
    //state.items.slice(findIndexById(this), 1).name = $newValue;    ///Why didn't this work, is it just syntax or something else? I was trying to perserve the orginal id#//


  });

});