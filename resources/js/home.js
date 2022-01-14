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