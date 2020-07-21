/*
 * For the '/new' page served
 * put the function call
 * on the views of Barba.js
 * found on transition.js
 */
function newPageScript() {
    
    var questions = $('.question-group');

    var activeIndex = $('.question-group.active').index('.question-group');

    // javascript assigns as reference not as value for some reason, so this had to be done
    var greatestActiveIndex = (function() { return activeIndex; })();

    function updateProgressBar() {

        // this part updates the progress bar and text
        $('.progress-text').text(activeIndex + 1 + ' of ' + questions.length);

        $('.progress-bar .bar').css('width', (greatestActiveIndex + 1)/questions.length * 100 + '%');

    }

    $('select').selectize({ create: false, sortField: 'text', maxItems: 15 });

    // navigation to previous always works
    $('.navigation #previous').on('vclick', function(event) {

        event.stopImmediatePropagation(); 

        if (activeIndex > 0) {

            var newIndex = activeIndex - 1;

            questions.eq(activeIndex).removeClass('active');

            questions.eq(newIndex).addClass('active');

            activeIndex = newIndex;

            updateProgressBar();

        };
    });

    // navigation to next has validation beforehand
    $('.navigation #next').on('vclick', function(event) {

        // prevents duplicate events
        event.stopImmediatePropagation();
        
        // for the validation
        var valid = $.map( $('.question-group.active input'), function(element) {

            return element.reportValidity(); // not supported by IE

        }).indexOf(false) == -1;

        // this means that going next will only work if the current form is valid
        if (valid && activeIndex < questions.length - 1) {

            var newIndex = activeIndex + 1;

            questions.eq(activeIndex).removeClass('active');

            questions.eq(newIndex).addClass('active');

            activeIndex = newIndex;

            // the greatest active index is for the progressive bar
            if (greatestActiveIndex < newIndex) greatestActiveIndex = newIndex;

            updateProgressBar();

        }

    });

    updateProgressBar();

};

newPageScript();
