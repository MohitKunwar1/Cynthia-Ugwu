var timeout;


const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPage(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y:'10',
        duration:1.5,
        opacity:0,
        ease: Expo.easeInOut
    })
    .to(".covered",{
        y:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut,
        stagger:.2
    })
    .from(".page1-footer",{
        y:-10,
        opacity:0,
        delay:-1,  
        duration:1.5,
        ease:Expo.easeInOut
    })
}
firstPage();


function crsrSqueeze(){
    //define crsr default value
    var xscale = 1;
    var yscale = 1;

    //define crsr previous values

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets){
        clearTimeout(timeout);
    })

    window.addEventListener("mousemove", function(dets){
      xscale =   gsap.utils.clamp(0.8,1.2,dets.clientX-xprev);
       yscale =  gsap.utils.clamp(0.8,1.2,dets.clientY-yprev);

         xprev = dets.clientX
         yprev = dets.clientY;

         crsrMove(xscale, yscale);

         timeout = setTimeout(function(){
            document.querySelector("crsr").style.transform = `translate(${dets,clientX}px,${dets.clientY}px) scale(1,1)`;
            
         }, 100);

    });
}

crsrSqueeze();


function crsrMove(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector('#crsr').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}
crsrMove();





document.querySelectorAll(".element").forEach(function(element){

    element.addEventListener("mouseleave", function(dets){
        gsap.to(element.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: 0.5
        });
    });
    element.addEventListener("mousemove",function(dets){
        var diff = dets.clientY - element.getBoundingClientRect().top;


        gsap.to(element.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX
        });
    });
});

