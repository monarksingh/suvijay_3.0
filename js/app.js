jQuery(document).ready(function() {

    //contact form processing
    jQuery('form.contact-form').on('submit', function (e) {
        e.preventDefault();
        var $form = jQuery(this);
        var $messageBox = jQuery("#contactMessage");
        jQuery($form).find('span.contact-form-respond').remove();
        //checking on empty values
        var formFields = $form.serializeArray();
        for (var i = formFields.length - 1; i >= 0; i--) {
            if (!formFields[i].value.length) {
                $form.find('[name="' + formFields[i].name + '"]').addClass('invalid').on('focus', function () {
                    jQuery(this).removeClass('invalid')
                });
            }
        }
        var addMessage = function (message) {
            $messageBox.text(message);
        };

        //if one of form fields is empty - exit
        if ($form.find('[name]').hasClass('invalid')) {
            //jQuery($form).find('[type="submit"]').attr('disabled', false).parent().append('<span class="contact-form-respond highlight">Please fill the full form</span>');
            addMessage("Please fill the full form");
            return;
        }
        //sending form data to PHP server if fields are not empty
        var request = $form.serialize();
        var ajax = jQuery.post("contact-form.php", request)
            .done(function (data) {
                //jQuery($form).find('[type="submit"]').attr('disabled', false).parent().append('<span class="contact-form-respond highlight">' + data + '</span>');
                addMessage(data);
            })
            .fail(function (data) {
                //jQuery($form).find('[type="submit"]').attr('disabled', false).parent().append('<span class="contact-form-respond highlight">Mail cannot be sent. You need PHP server to send mail.</span>');
                addMessage("Mail cannot be sent. You need PHP server to send mail.")
            });

    });

    $('#aboutUsTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
    /**
     * Created by MonarkSingh on 03-Feb-15.
     */
});