const launchDate = new Date("March 30, 2022 22:59:59").getTime();
const runCountDown = _=> {
    let now = new Date().getTime();

    let distance = launchDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24)), 
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $(".timer .days h3").html(days);
    $(".timer .hours h3").html(hours); 
    $(".timer .minutes h3").html(minutes); 
    $(".timer .seconds h3").html(seconds); 

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}
let countDownInterval = setInterval(runCountDown, 1000);


$(document).ready(function(){

    /* - Gallery */
    if($(".portfolio-box").length){
        var url;
        $(".portfolio-box .portfolio-detail > .portfolio-content").magnificPopup({
            delegate: " > a.zoom",
            type: "image",
            tLoading: "Loading image #%curr%...",
            mainClass: "mfp-img-mobile",
            gallery: {
                enabled: true,
                navigateByImgClick: false,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: "<a href="%url%">The image #%curr%</a> could not be loaded.",				
            }
        });
    }
});