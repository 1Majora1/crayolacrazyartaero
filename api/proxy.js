$(document).ready(function() {
    $('#proxyForm').submit(function(e) {
        e.preventDefault();
        let url = $('#url').val();
        if (url) {
            window.open('https://www.proxywebsite.com/' + url, '_blank');
        } else {
            alert('Please enter a valid URL.');
        }
    });
});
