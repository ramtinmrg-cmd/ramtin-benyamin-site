const mediaInput = document.getElementById("mediaInput");
const addMediaButton = document.getElementById("addMediaButton");

const imageGallery = document.getElementById("imageGallery");
const videoGallery = document.getElementById("videoGallery");

const uploadStatus = document.getElementById("uploadStatus");


let mediaFiles = [];


/* انتخاب فایل ها */

addMediaButton.addEventListener("click", () => {

    const files = Array.from(mediaInput.files);

    if (files.length === 0) {

        uploadStatus.textContent =
            "اول یک عکس یا ویدیو انتخاب کن.";

        return;
    }


    files.forEach(file => {

        const url = URL.createObjectURL(file);

        const media = {

            id: Date.now() + Math.random(),

            name: file.name,

            type: file.type,

            url: url,

            date: new Date().toLocaleDateString("fa-IR")

        };

        mediaFiles.push(media);

    });


    renderGallery();

    mediaInput.value = "";

    uploadStatus.textContent =
        `${files.length} فایل به گالری اضافه شد.`;

});


/* نمایش گالری */

function renderGallery() {

    imageGallery.innerHTML = "";
    videoGallery.innerHTML = "";


    const images =
        mediaFiles.filter(file =>
            file.type.startsWith("image/")
        );


    const videos =
        mediaFiles.filter(file =>
            file.type.startsWith("video/")
        );


    /* تصاویر */

    if (images.length === 0) {

        imageGallery.innerHTML =
            `<div class="empty-message">
                هنوز تصویری اضافه نشده است.
            </div>`;

    } else {

        images.forEach(media => {

            imageGallery.innerHTML += `

                <div class="media-card">

                    <img
                        src="${media.url}"
                        alt="${media.name}"
                    >

                    <div class="media-info">

                        <h3>${media.name}</h3>

                        <p>
                            تاریخ: ${media.date}
                        </p>

                        <button
                            class="delete-button"
                            onclick="deleteMedia(${media.id})"
                        >
                            حذف
                        </button>

                    </div>

                </div>

            `;

        });

    }


    /* ویدیوها */

    if (videos.length === 0) {

        videoGallery.innerHTML =
            `<div class="empty-message">
                هنوز ویدیویی اضافه نشده است.
            </div>`;

    } else {

        videos.forEach(media => {

            videoGallery.innerHTML += `

                <div class="media-card">

                    <video
                        src="${media.url}"
                        controls
                    ></video>

                    <div class="media-info">

                        <h3>${media.name}</h3>

                        <p>
                            تاریخ: ${media.date}
                        </p>

                        <button
                            class="delete-button"
                            onclick="deleteMedia(${media.id})"
                        >
                            حذف
                        </button>

                    </div>

                </div>

            `;

        });

    }

}


/* حذف فایل */

function deleteMedia(id) {

    const media =
        mediaFiles.find(file => file.id === id);


    if (media) {

        URL.revokeObjectURL(media.url);

    }


    mediaFiles =
        mediaFiles.filter(file =>
            file.id !== id
        );


    renderGallery();

}