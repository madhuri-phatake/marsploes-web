$(document).ready(async function () {
    // const url = window.location.href.split("?")[1]
    const base_url=window.location.origin
console.log()
    $.ajax({
        url: base_url + "/blogs/get_blog_details/" + unique_url,
        type: "GET",
        success: function (response) {
            console.log(response.data)
            let blogsMarkup = "";
            let currentDate = new Date(response.data.BlogData[0].date);

            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // Months are zero-based
            const year = currentDate.getFullYear();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = currentDate.toLocaleDateString('en-US', options);
            if (response.status) {

                blogsMarkup += `
        
                        <div class="caption">
                            <div class="sub-title fz-12">
                                <a href="#0"><span>Marketing</span></a>
                                <span>,</span>
                                <a href="#0"><span>Design</span></a>
                            </div>
                            <h1 class="fz-55 mt-30">${response.data.BlogData[0].title}</h1>
                        </div>
                        <div class="info d-flex mt-40 align-items-center">
                            <div class="left-info">
                                <div class="d-flex">
                                    
                                    <div class="date">
                                        <a href="#0">
                                            <span class="opacity-7">Published</span>
                                            <h6 class="fz-16">${formattedDate}</h6>
                                        </a>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                   
            <img class="background bg-img parallaxie mt-80" src="${response.data.BlogData[0].image[0].icon_url}">`
                $("#blog-details-header").empty(blogsMarkup);

                $("#blog-details-header").append(blogsMarkup);
            } else {
                $(".blogsSection").hide();
            }
            if (response.status) {
                let blogsMarkup2 = "";
                blogsMarkup2 += `
            
                ${response.data.BlogData[0].detail_description}
                    <div class="info-area flex mt-20 pb-20">
                        <div>
                            <div class="tags flex">
                                <div class="valign">
                                    <span>Tags :</span>
                                </div>
                                <div>
                                    <a href="blog-classic.html">Tech</a>
                                    <a href="blog-classic.html">Ravo</a>
                                </div>
                            </div>
                        </div>
                        <div class="ml-auto">
                            <div class="share-icon flex">
                                <div class="valign">
                                    <span class="mr-50">Share :</span>
                                </div>
                                <div>
                                                          <a href="https://facebook.com/sharer/sharer.php?u=${base_url +
                    "/blogs/blog-details/" +
                    response.data.BlogData[0].url}"
                                                              class="social-icon si-small text-white  border-transparent rounded-circle "
                                                              title="Facebook">
                                                              <i  class="fab fa-facebook-f" style="color:#1974EC"></i>
                                                              
                                                          </a>
                          
                                                          <a href="https://twitter.com/intent/tweet/?text=${base_url +
                    "/blogs/blog-details/" +
                    response.data.BlogData[0].url}"
                                                              class="social-icon si-small text-white border-transparent rounded-circle bg-twitter"
                                                              title="Twitter">
                                                              <i class="fab fa-twitter"></i>
                                                              <i class="fab fa-twitter"></i>
                                                          </a>
                          
                               
                          
                                                          <a href="https://api.whatsapp.com/send/?text=${base_url +
                    "/blogs/blog-details/" +
                    response.data.BlogData[0].url}"
                                                              class="social-icon si-small text-white border-transparent rounded-circle bg-whatsapp"
                                                              title="Whatsapp">
                                                              <i class="fab fa-whatsapp"></i>
                                                              <i class="fab fa-whatsapp"></i>
                                                          </a>
                          
                          
                                                          <a href="mailto:?subject=${base_url +
                    "/blogs/blog-details/" +
                    response.data.BlogData[0].unique_url}"
                                                              class="social-icon si-small text-white border-transparent rounded-circle bg-email3 me-0"
                                                              title="Mail">
                                                              <i class="fas fa-envelope"></i> 
                                                              <i class="fas fa-envelope"></i> 
                                                          </a>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                

           
                    `
                $("#main-post").empty(blogsMarkup2);

                $("#main-post").append(blogsMarkup2);
            } else {
                $(".blogsSection").hide();
            }
        }
    });
});

function copytoClipboard(e) {
    $("body").append('<input id="copyURL" type="text" value="" />');
    $("#copyURL").val(window.location.href).select();
    document.execCommand("copy");
    $("#copyURL").remove();
}


$(document).ready(async function () {
    const base_url=window.location.origin
    $.ajax({
        
        url: base_url + "/blogs/get_priority_blogs",
        type: "GET",
        success: function (response) {

            if (response.status == true) {
                let arrOfBlog = response.data;
                console.log(arrOfBlog)
                let blogItem = "";
                arrOfBlog.forEach((obj, i) => {
                    let currentDate = new Date(obj.date);
                    const day = currentDate.getDate();
                    const month = currentDate.getMonth() + 1; // Months are zero-based
                    const year = currentDate.getFullYear();
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    const formattedDate = currentDate.toLocaleDateString('en-US', options);
                    
                   
                    blogItem +=`
                    <div class="col-lg-6">
                    <div class="item mb-50">
                        <div class="row">
                            <div class="col-md-6 img">
                            <a href="${base_url +'/blog-details/' + obj.unique_url}">
                                <img src="${obj.thumbnail_image[0].icon_url}" alt="blog" style="padding: 0px 20px">
                                    </a>
                            </div>
                            <div class="col-md-6 main-bg cont valign">
                            <a href="${base_url +'/blog-details/' + obj.unique_url}">
                                <div class="full-width">
                                    <span class="date fz-12 ls1 text-u opacity-7 mb-15">${formattedDate}</span>
                                    <h5>
                                        <a href="${base_url +'/blog-details/' + obj.unique_url}">${obj.title}</a>
                                    </h5>
                                
                                </div>
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </div>`
                });
                $("#recentblog").append(blogItem);

            }
        }
    });
});