function resultsPageScript() {

    $('.codename').on('click', function(event) {

        event.stopImmediatePropagation();

        var span = $(event.target);
        
        var hiddenData = span.data('hidden');

        var temporary = span.text();

        span.text(hiddenData);

        span.data('hidden', temporary);

    });

}

resultsPageScript();
