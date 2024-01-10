$(document).ready(async function () {
  const base_url = window.location.origin;
  
  $.ajax({
    url: base_url + "/careers/get_career_data",
    type: "GET",
    success: function (response) {

      if (response.status == true) {
        let arrOfBlog = response.data.filter(obj => obj.status === 'active');
        let blogItem = "";

        arrOfBlog.forEach((obj, i) => {
          const uniqueURL = obj.unique_url;

          const wordCount = obj.description.split(/\s+/).length;

          blogItem +=
            `<div class="list-item mb-20">
              <h5>${obj.title}</h5>
              <div class="wrapper active">
                <p class="more">${obj.description}</p>
              </div>`;

          // Display 'Show More' button only if word count exceeds 50
          if (wordCount > 60) {
            blogItem += `
              <div class="toggle_btn">
                <button class="text-white toggle_text">Show More</button> <span class="arrow">
                <i class="fas fa-angle-down"></i>
              </span>
              </div>`;
          }

          blogItem += `
              <div class="d-flex align-items-center mt-30">
                <a href="#0" class="main-color3 ml-auto apply-now-link">
                  <span>Apply Now
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor"></path>
                    </svg>
                  </span>
                </a>
              </div>
            </div>`;
        });

        $("#career_description").append(blogItem);
        $("#career_description").on("click", ".apply-now-link", function (e) {
          e.preventDefault();
          $("#popup-form").show();
        });
        $(".toggle_btn").on("click", function () {
          $(this).prev(".wrapper").toggleClass('active');
          const isActive = $(this).prev(".wrapper").hasClass('active');

          if (isActive) {
            $(this).find(".toggle_text").text("Show More");
          } else {
            $(this).find(".toggle_text").text("Show Less");
            $(this).prev(".wrapper")[0].scrollIntoView({
              behavior: "smooth"
            });
          }
        });
        
  let formVisible = false; // Track form visibility

  // Function to toggle the form's visibility
  function toggleFormVisibility() {
    const formCard = document.getElementById('popup-form');
    formVisible = !formVisible; 
    if (formVisible) {
      formCard.style.display = 'block'; 
    } else {
      formCard.style.display = 'none'; 
    }
  }

  // Function to handle clicking on the Apply Now link
  $("#career_description").on("click", ".apply-now-link", function (e) {
    e.preventDefault();

    if (!formVisible) {
      toggleFormVisibility(); 
    }
  });

  // Function to handle closing the form
  $("#close-btn").click(function (e) {
    e.preventDefault();
    toggleFormVisibility(); 
    
  });
      }
    }
  });
  $("#applyForm").submit(function (e) {
    return false;
  });
  $(".massge").hide();
  $("#contact-btn").click(function (e) {
    $("#applyForm").validate({
      rules: {
        jobformname: {
          required: true
        },
        jobformmobile: {
          required: true
        },
        jobformemail: {
          required: true,
          email: true
        },
        jobposition: {
          required: true
        },
        message: {
          required: true
        }
      },
      messages: {
        jobformname: {
          required:
            "<span style='font-size:14px; color: red;'>Please enter Name</span>"
        },
        jobformmobile: {
          required:
            "<span style='font-size:14px; color: red;'>Please enter Mobile</span>"
        },
        jobformemail: {
          required:
            "<span style='font-size:14px; color: red;'>Please enter Email</span>"
        },
        jobposition: {
          required:
            "<span style='font-size:14px; color: red;'>Please enter Position</span>"
        },
        message: {
          required:
            "<span style='font-size:14px; color: red;'>Please enter Message</span>"
        }
      },
      submitHandler: function () {
        contactUsformSubmition();
        $("#contact-btn").attr("disabled", "disabled");
        return false;
      }
    });
  });
  $("#contact-btn").click(function (e) {
    e.preventDefault();
    $("#applyForm").submit();
  });
  function contactUsformSubmition() {
    let contact_obj = {};
    contact_obj.jobformname = $("#jobformname").val();
    contact_obj.jobformemail = $("#jobformemail").val();
    contact_obj.jobformmobile = $("#jobformmobile").val();
    contact_obj.jobposition = $("#jobposition").val();
    contact_obj.message = $("#message").val();
    const currentURL = window.location.origin;

    contact_obj.recaptchaResponse = grecaptcha.getResponse();
    if (contact_obj.recaptchaResponse === '') {
      alert("Please Validate Captcha");
    } else {
      $.ajax({
        url: `${currentURL}/send-career-email`,
        contentType: "application/json; charset= utf-8",
        type: "POST",
        data: JSON.stringify(contact_obj),
        dataType: "json",
        success: function (data) {
          if (data.status === true) {
            $(".massge").show();
            $("#applyForm")[0].reset();

            setTimeout(function () {
              $(".massge").hide();
            }, 3000);

            grecaptcha.reset();
          }
        },
        error: function (error) {
          console.log(`Error ${error}`);
          $("#form-title").text(
            `Oops! There was an error processing your request. Please try again later.`
          );
        }
      });
    }
  }
});

