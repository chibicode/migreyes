// Generated by CoffeeScript 1.6.3
(function() {
  var BikeGallery, currentBikePhoto, nextPhoto, previousPhoto;

  BikeGallery = {
    install: function(gallery) {
      var $gallery, $height, $photoPosition, $photos, $stage, alignPhotos, setHeight, setStage;
      $gallery = $(gallery);
      $photos = $gallery.find('[data-photo]');
      $stage = $gallery.find('[data-photo-stage]');
      $height = Math.floor($(window).width() * 0.535);
      $photoPosition = 0;
      setHeight = function(el, height) {
        var $el;
        $el = $(el);
        return $el.height(height);
      };
      alignPhotos = function() {
        return $photos.each(function() {
          $(this).css({
            left: $photoPosition,
            width: $(window).width()
          });
          return $photoPosition += $(window).width();
        });
      };
      setStage = function() {
        setHeight($gallery, $height);
        setHeight($photos, $height);
        return alignPhotos();
      };
      return setStage();
    }
  };

  currentBikePhoto = 1;

  nextPhoto = function() {
    var $stage, distance;
    $stage = $('[data-photo-stage]');
    distance = $(window).width() * currentBikePhoto;
    currentBikePhoto += 1;
    if ($(window).width() >= 768) {
      if (currentBikePhoto > $stage.find('figure').length) {
        $stage.animate({
          left: "0"
        }, 500);
        return currentBikePhoto = 1;
      } else {
        return $stage.animate({
          left: -distance
        }, 500);
      }
    }
  };

  previousPhoto = function() {
    var $lastPhoto, $stage, distance;
    $stage = $('[data-photo-stage]');
    $lastPhoto = $stage.find('figure').length;
    currentBikePhoto -= 1;
    if (currentBikePhoto < 1) {
      distance = $(window).width() * ($lastPhoto - 1);
      $stage.animate({
        left: -distance
      }, 500);
      return currentBikePhoto = $lastPhoto;
    } else {
      distance = $(window).width() * (currentBikePhoto - 1);
      return $stage.animate({
        left: -distance
      }, 500);
    }
  };

  $(function() {
    var $bike, $gallery;
    $gallery = $('[data-photo-gallery]');
    BikeGallery.install($gallery);
    $(window).resize(function() {
      return BikeGallery.install($gallery);
    });
    $('[data-photo]').on("click", function() {
      return nextPhoto();
    });
    $('[data-photo-toggle="next"]').on("click", function() {
      return nextPhoto();
    });
    $('[data-photo-toggle="previous"]').on("click", function() {
      return previousPhoto();
    });
    $(window).bind("keydown", function(event) {
      switch (event.keyCode) {
        case 37:
          return previousPhoto();
        case 39:
          return nextPhoto();
      }
    });
    $bike = $('[data-bike]');
    return parallax($bike, 'top', -100, 1000, .5);
  });

}).call(this);