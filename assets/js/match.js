/*
 * For the '/match' page served
 * put the function call
 * on the views of Barba.js
 * found on transition.js
 */
function matchPageScript() {

    // when the question mark is clicked
    var tip = $('.tip');

    $('.navigation #help').on('click', function(event) {

        event.stopImmediatePropagation();

        tip.toggleClass('hidden');

    });

    // Preview of images
    $('input[type="file"').each(function(){

        var file = $(this);

        var label = file.next('label');

        var labelText = label.find('span');

        var labelDefault = labelText.text();

        file.on('change', function(event){

            var fileName = file.val().split('\\').pop();

            var path = URL.createObjectURL(event.target.files[0]);
           
            if (fileName) {

                label.addClass('file-ok').css('background-image', 'url(' + path + ')');

                labelText.text(fileName);

            } else {

                label.removeClass('file-ok');

                labelText.text(labelDefault);

            }

        });

    });

}

matchPageScript();
