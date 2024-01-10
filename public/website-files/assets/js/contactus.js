$("#contact-form").submit(function(e) {
  return false;
});

$(".massge").hide();
$("#contact-btn").click(function(e) {
  $("#contact-form").validate({
    rules: {
      name: {
        required: true
      },
      subject: {
        required: true
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true
      }
    },
    messages: {
      name: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter Name</span>"
      },
      subject: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter Subject</span>"
      },
      email: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter Email</span>"
      },
      message: {
        required:
          "<span style='font-size:14px; color: red;'>Please enter Message</span>"
      }
    },

    submitHandler: function() {
      contactUsformSubmition();
      $("#contact-btn").attr("disabled", "disabled");
    }
  });
});

function contactUsformSubmition() {
  let contact_obj = {};
  contact_obj.name = $("#form_name").val();
  contact_obj.email = $("#form_email").val();
  contact_obj.subject = $("#form_subject").val();
  contact_obj.message = $("#form_message").val();
  const currentURL = window.location.origin;

  // Get the reCAPTCHA response
  contact_obj.recaptchaResponse = grecaptcha.getResponse();
  if (contact_obj.recaptchaResponse === '') {
    alert("Please Validate Captcha");
  } else {
    $.ajax({
      url: `${currentURL}/send-email`,
      contentType: "application/json; charset= utf-8",
      type: "POST",
      data: JSON.stringify(contact_obj),
      dataType: "json",
      success: function(data) {
        if (data.status === true) {
          $(".massge").show();
          // Reset the form after successful submission
          $("#contact-form")[0].reset();

          // Hide the .message after 2 seconds
          setTimeout(function() {
            $(".massge").hide();
          }, 3000);
          
          // Reset reCAPTCHA
          grecaptcha.reset();
        }
      },
      // Error handling
      error: function(error) {
        console.log(`Error ${error}`);
        $("#form-title").text(
          `Oops! There was an error processing your request. Please try again later.`
        );
      }
    });
  }
}

