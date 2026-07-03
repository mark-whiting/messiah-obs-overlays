/*******************************************************************************
 * title-image-loader.js
 *
 * Copyright: 2026 Mark Whiting
 * SPDX-License-Identifier: MIT
 *
 * This code loads an image into a canvas element and can scale the image to
 * fit within the canvas or to fill the canvas.
 ******************************************************************************/
(function (window) {
    /* Load the image via a Promise */
    async function loadImage(url) {
        return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
    }

    /* Analyze image/canvas and generate scaling factors */
    function scaleImageFit(canvas, image) {
        /* Create the image parameters object */
        let imageParams = {};
        imageParams.mode = 'fit';

        /* Calculate the scaling ratio */
        const hRatio = canvas.width / image.width;
        const vRatio = canvas.height / image.height;
        const ratio = Math.min(hRatio, vRatio);

        /* In fit mode we are using the full source image */
        imageParams.sx = 0;
        imageParams.sy = 0;
        imageParams.sWidth = image.width;
        imageParams.sHeight = image.height;

        /* Scale the destination */
        imageParams.dx = Math.floor((canvas.width - (image.width * ratio)) / 2);
        imageParams.dy = Math.floor((canvas.height - (image.height * ratio)) / 2);
        imageParams.dWidth = Math.floor(image.width * ratio);
        imageParams.dHeight = Math.floor(image.height * ratio);

        return imageParams;
    }

    function scaleImageFill(canvas, image) {
        /* Create the image parameters object */
        let imageParams = {};
        imageParams.mode = 'fill';

        /* Calculate the scaling ratio */
        const hRatio = canvas.width / image.width;
        const vRatio = canvas.height / image.height;

        /* All the math below works easier if we "scale" the canvas to the
         * image instead, so we invert the ratio here.
         */
        const ratio = 1 / Math.max(hRatio, vRatio);

        /* Scale the source */
        imageParams.sx = Math.floor((image.width - (canvas.width * ratio)) / 2);
        imageParams.sy = Math.floor((image.height - (canvas.height * ratio)) / 2);
        imageParams.sWidth = Math.floor(canvas.width * ratio);
        imageParams.sHeight = Math.floor(canvas.height * ratio);

        /* In fill mode we are using the full destination canvas */
        imageParams.dx = 0;
        imageParams.dy = 0;
        imageParams.dWidth = canvas.width;
        imageParams.dHeight = canvas.height;

        return imageParams;
    }

    function scaleImage(canvas, image, image_mode) {
        switch (image_mode) {
            case 'fit':
                return scaleImageFit(canvas, image);
            case 'fill':
                return scaleImageFill(canvas, image);
            default:
                /* Default to fit mode */
                return scaleImageFit(canvas, image);
        }
    }

    /* This gets exported to the public as the loadTitleImage() global method.
     * The first argument <element> is the element ID for the canvas to load
     * the image into. The second argument <imageUrl> is the image to load into
     * the canvas.
     *
     * The third argument <options> is a javascript object specifying how the
     * image should be loaded. The properties of the object and their allowed
     * types/values are described below.
     *
     *  image_mode: string
     *      Allowed Values: 'fit' | 'fill'
     *      Default: 'fit'
     *      Description:
     *          Specifies whether the image should be scaled to 'fit' within
     *          the canvas or 'fill' the canvas.
     *
     *  fill_mode: string
     *      Allowed Values: 'color'
     *      Default: 'color'
     *      Description:
     *          When the 'image_mode' is 'fit', this specifies the method used
     *          to fill any empty space after the image is scaled.
     *
     *          'color': fill with the 'background_color' value.
     *
     *  background_color: string
     *      Allowed Values: any valid CSS color
     *      Default: rgb(0, 0, 0)
     *      Description:
     *          Default background color for the canvas, also used by some
     *          'fill_mode' algorithms.
     */
    async function _loadTitleImage(element, imageUrl, options = {}) {
        /* Parse options */
        image_mode = options?.image_mode ?? 'fit';
        fill_mode = options?.fill_mode ?? 'color';
        background_color = options?.background_color ?? 'rgb(0, 0, 0)';

        /* Get the canvas element and make sure it is a canvas */
        var canvas = document.getElementById(element);
        if (!canvas.getContext) { return; }

        /* Make sure the canvas size matches it's element size */
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        let ctx = canvas.getContext('2d');

        /* Set the canvas background color */
        ctx.fillStyle = background_color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        /* Load the image */
        let img = await loadImage(imageUrl);

        /* Determine scaling factors */
        imgParams = scaleImage(canvas, img, image_mode);

        /* Draw the image */
        ctx.drawImage(img,
            imgParams.sx, imgParams.sy, imgParams.sWidth, imgParams.sHeight,
            imgParams.dx, imgParams.dy, imgParams.dWidth, imgParams.dHeight);

        /* If the image mode was fill, there's no more work to do */
        if (imgParams.mode == 'fill') { return; }

        // TODO implement possible fill modes
        //
        // object to iterate over pixels in memory order, for each pixel determine if it needs to be drawn,
        // call "shader" for each drawn pixel with translated coord, mirror pixel, and alg metadata.
    }

    window.loadTitleImage = _loadTitleImage;
})(window);

