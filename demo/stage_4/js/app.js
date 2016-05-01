
var a = new pxgallery();
a.setImage([
    "http://placehold.it/1300x1600/E97452/fff",
    "http://placehold.it/1300x1300/4C6EB4/fff",
    "http://placehold.it/1300x1250/449F93/fff",
    "http://placehold.it/800x400/936FBC/fff",
    "http://placehold.it/1000x500/D25064/fff",
    // "http://placehold.it/1300x1200/CF364A/fff"
],
{
    layout: 2,
    fullscreenState: true,
});

//Get the DOM element
var custom = document.getElementById('customize');
var submenu = document.querySelector('.submenu');


custom.addEventListener('click', function() {
  submenu.style.left = this.offsetLeft + 'px';
  submenu.classList.remove('hidden');
  submenu.addEventListener('click', function(event) {
    submenu.classList.add('hidden');
    switch (event.target.dataset.layout) {
      case 'puzzle':
      a.setLayout(1);
      break;
      case 'waterfall':
      a.setLayout(2);
      break;
      case 'barrel':
      a.setLayout(3);
      break;
    }
  })
})
