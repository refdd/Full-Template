// check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
    // console.log("Locl Storage is Not Empty Can You Set It On Root Now")
    // console.log(localStorage.getItem("color-option"))
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color-option"))
    // Remove Active Class From All  Color List Item

    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("actvie")
        // Add Actvie Class on ELement IF Data-Color ===Local Storage Iteme
        if (element.dataset.color === mainColors) {
            // Add Class Actvie
            element.classList.add("actvie")
        }
    });

}
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Random Background Option هعمل متغير لو الدال دي بتساوي تروو 
let backgroundOption = true;
// Variable To Control THe Intervalدي متغير عشان اعرقف امسك  الداله الي تغير االخلفيه 
let backgroundInterval;
// Check If There's Local stroage Random Background Empty
let backgroundLocalItem = localStorage.getItem("background-option")
// Check If Random Background LocalStorage Is Not Empty
if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === "true") {

        backgroundOption = true;


    } else {
        backgroundOption = false;
    }
    // REmove Actvie Class From All Span
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove("actvie")
    });
    if (backgroundLocalItem === "true") {
        document.querySelector(".random-background .yas").classList.add("active")
    } else {

        document.querySelector(".random-background .no").classList.add("active")


    }



}
// -------------------------------------------------------------------------------------------------------
// toggle spin class on Icon هضيف كيلس جديد جو ال ايكون عشان اخليها تلف  
let spin = document.querySelector(".settings-box i");
let showSettingList = document.querySelector(".settings-box");
// هعمل فنكشن اني  اول ما اضغط علي الايكن طيف كيلس كذا 
spin.onclick = function () {
    spin.classList.toggle("fa-spin");
    // دلوقتي هعمل توجل عشان اضيف كيلس اوبن عشان اظهر قائمه الاعدادات
    showSettingList.classList.toggle("open");
};
// -------------------------------------------------------------------------------------------------------
// switch colors هستدعي قاتمه الالوان 
const colorsLi = document.querySelectorAll(".colors-list li");
// بعمل لوب للعناصر 
colorsLi.forEach(li => {
    // بضيف حدث عيان لما اظغط يعمل الداله 
    li.addEventListener("click", function (e) {
        // الداله الي هتتنفذ اغير اللون في الصفحه كلها Set color In Root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)
        // Set Color On Local Storage
        localStorage.setItem("color-option", e.target.dataset.color);
        HandleActvie(e)
    })
})
// -------------------------------------------------------------------------------------------------------------------
// switch Random Background هستدعي قاتمه تغير الخلفيه 
const randomBackEl = document.querySelectorAll(".random-background span");
//Loop in all span بعمل لوب للعناصر 
randomBackEl.forEach(span => {
    // Click On Every Spanبضيف حدث عيان لما اظغط يعمل الداله 
    span.addEventListener("click", function (e) {

        HandleActvie(e)

        if (e.target.dataset.background === "yas") {
            backgroundOption = true;
            rondomizeImag();
            localStorage.setItem("background-option", true)
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval)
            localStorage.setItem("background-option", false)

        }

    })

})
// ---------------------------------------------------------------------------------------------------------------------
// select landing Page  element  بستدعي الدف بتاع الراس الصفحه 
let landingPage = document.querySelector(".landing-page");
// Get Array of Image بستدعي الصيور جو الارير []
let imgArray = ["3.jpg", "4.jpg", "5.jpg"]
// chang packground Image هغير الخلفيه بتاع الصفحه

// Get Random Number اجيب رقم عشواقي بطريقة الماتش 

// دي الداله الي هستعملها عشان اغير الاصوره كل شويه 

// Function to Rondomize Imag داله تغيرر الخلفيه 
function rondomizeImag() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(function () {

            let randomNumber = Math.floor(Math.random() * imgArray.length);
            landingPage.style.backgroundImage = 'url("image/' + imgArray[randomNumber] + '")'
        }, 1000)
    }
}

rondomizeImag();
// ------------------------------------------------------------------------------------------------------------------------
// Select Skills Selector
let ourSkills = document.querySelector(".skills")
window.onscroll = function () {
    //  Skills Offset Top

    let skillsOffsettop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;
    //   
    // Window Height
    let windowHeight = this.innerHeight;
    // Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop >= (skillsOffsettop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span")

        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progerss;
        });
    }

};
// ----------------------------------------------------------------------------

// Create Popup with the Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {

        // // Create Overlay Element
        let overlay = document.createElement("div");
        // // Add class to Overlay
        overlay.className = "popup-overlay"
        // // Append Overlay To Body
        document.body.appendChild(overlay);

        // //Create The Popup Box
        let popupBox = document.createElement("div");
        // // Add Class To Popup Box
        popupBox.className = "popup-box";
        // -------------------------------------------------------
        // ازاي اخلي ال الاسم بتاع الصوره يظهر ولو مش موجود ايه الي يحصل  
        // Add name by alt in image 
        if (img.alt !== null) {
            // Create Heading To Image 
            let imgHeading = document.createElement("h3");
            // Creat Text For Heading هنا هقلو ان النص هو هو الات بتاع الصوره 
            let imgText = document.createTextNode(img.alt);
            // Appand the Text To The heading
            imgHeading.appendChild(imgText)
            // Appand The Heading To The Popup Box
            popupBox.appendChild(imgHeading);

        };
        // -------------------------------------------------------
        // // Create Image
        let PopupImage = document.createElement("img")
        // // Set MY Image Source To The Now Image
        PopupImage.src = img.src;
        // // Add Now  Image To The popup-Box
        popupBox.appendChild(PopupImage);
        // // Add Popup Box To Body 
        document.body.appendChild(popupBox)
        // ------------------------------------------------------------
        // هنا  هعمل زورار عشان اقفل الصور 
        // Create The Clase Span 
        let closeButton = document.createElement("span");
        // Ceate The Close Button Text 
        let closeButtonText = document.createTextNode("X");
        // Appand Text To Close Button 
        closeButton.appendChild(closeButtonText);
        // Add Class To Close Button
        closeButton.className = "close-button";
        // append Close Button To The PopupBox
        popupBox.appendChild(closeButton);

    });
});
// --------------------------------------------------------------------
// دلوقتي  ازاي اقفل قائمه الصور Close Popup
document.addEventListener("click", function (e) {
    if (e.target.className == "close-button") {
        // Remove The Current Popup box 
        document.querySelector(".popup-box").remove()
        // Rmove OverLay 
        document.querySelector(".popup-overlay").remove()
    }
})
// -------------------------------------------------/////////////////////////

//  1 ازاي خلي الموقع يروح علي السكشن الي انا بضغط عليه 
// select all Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// allBullets.forEach(bullte => {

//     bullte.addEventListener("click", (e) => {

//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: "smooth"
//         })
//     })
// })
// -----------------------////////////////////////////////////////////////////
// ازاي اخلي اللينك بتاعي تروح علي القسم الي اضغ عليه 2

const allLinks = document.querySelectorAll(".links a");

// allLinks.forEach(link => {

//     link.addEventListener("click", (e) => {

//  e.preventDefault();

//         document.querySelector(e.target.dataset.section).scrollIntoView({
//             behavior: "smooth"
//         })
//     })
// })

// هنا هشان مكررش ال داله مرتين هدمج الاتنين دول في بض 1 + 2 
function scrollTSomeWhere(elements) {
    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}
scrollTSomeWhere(allBullets);
scrollTSomeWhere(allLinks);

// _____________________________________________///////////////////////////////
// Handle Actvie State
function HandleActvie(ev) {
    // Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".actvie").forEach(element => {
        element.classList.remove("actvie")
    });
    //  add Active Class On Self
    ev.target.classList.add("actvie")
}
// _________________________________//////////////////////////////////
// داله عشان اخفي الدوائر من الصفحه 
// select all span 
let bulletsSpan = document.querySelectorAll(".bullets-optin span")
// select Div For Bullets
let bulletsContainer = document.querySelector(".nav-bullets")
// but item At LocalStorage
let bulletLockItem = localStorage.getItem("bullets-option")
// chack if Local storgage Empty 
if (bulletLockItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("actvie")
    })
    if (bulletLockItem === "block") {


        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-optin .yas").classList.add("active")
    } else {


        bulletsContainer.style.display = "none";

        document.querySelector(".bullets-optin .no").classList.add("active")
    }
}


bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {

        if (span.dataset.display === "show") {

            bulletsContainer.style.display = "block";

            localStorage.setItem("bullets-option", "block")

        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets-option", "none")
        }

        HandleActvie(e)


    })


})
// ---------------------------------------------///////////////////////
// همسح كل حاجه في العدادات 
// clear Lock Storage
document.querySelector(".reset-option").onclick = function () {
    localStorage.clear();

    // Reload window
    window.location.reload()
}
// ______________________________________________//////////////////////
// هعمل زورار اخلي قائمه اللنكات تختفي ةتظهر 
// toggle menu
let toggleBto = document.querySelector(".header-area .toggle-menu");
let tLinks = document.querySelector(".header-area .links");

toggleBto.onclick = function (e) {
    // toggle Class Menu-Actvie To Botton
    this.classList.toggle("menu-actvie")
    // Toggle Class  Open To Links
    tLinks.classList.toggle("open")

    // stop propagation
    e.stopPropagation()


}
// -----------------
window.onclick = function (e) {

    if (e.target !== toggleBto && e.target !== tLinks) {
        if (tLinks.classList.contains("open")) {
            // toggle Class Menu-Actvie To Botton
            toggleBto.classList.toggle("menu-actvie")
            // Toggle Class  Open To Links
            tLinks.classList.toggle("open")

        }
    }
    // Syop Propagation To Li 
    tLinks.onclick = function (e) {

        e.stopPropagation()
    }






}