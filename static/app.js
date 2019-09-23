;(function (window, document) {

  'use strict';

  var all_files = [];
  var current_file_id = 0;
  var locked = false;
  var prev_count_files = 0;
  var waiting = 0;

  var noopHandler = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };

  var drop = function (evt) {
    noopHandler(evt);
    handleFiles(evt.dataTransfer.files);
  };

  var handleFileDialog = function (evt) {
    noopHandler(evt);
    var element = evt.srcElement || evt.target;
    handleFiles(element.files);
  };

  var handleFiles = function (files) {
    var count = files.length;
    var i, j;

    if ( count > 0 ) {

      prev_count_files = all_files.length;

      //document.getElementById('dropzone').className = 'queue';
      document.getElementById('dropzone');

      for ( i = prev_count_files + waiting, j = 0; i < prev_count_files + files.length + waiting; i++, j++ ) {
        //document.getElementById('dropzone').innerHTML += '<div class="file" id="file-' + i + '"><div class="name">' + files[j].name + '</div><div class="progress">Warte...</div><div class="clear"></div></div>';
        //document.getElementById('dropzone').innerHTML = '<span>Warte...  '+ prev_count_files +'/'+ count +'</span>';
      }

      waiting += count;

      if ( ! locked ) {
        waiting -= count;
        all_files.push.apply(all_files, files);
        handleNextFile();
      }
    }else{
    window.location = '/'; //mod by cox - return to home
    }
  };

  var handleReaderLoad = function (evt) {

    var current_file = {
      name: all_files[current_file_id].name,
      type: all_files[current_file_id].type,
      contents: evt.target.result
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
    xhr.onreadystatechange = function () {
      if ( xhr.readyState == 4 ) {
        if ( document.getElementById('file-' + current_file_id) ) {
          /*if ( xhr.status === 200 ) {
            document.getElementById('file-' + current_file_id).querySelector('.progress').innerHTML = 'Fertig';
            //document.getElementById('dropzone').innerHTML = '<span>Fertig</span>';
          } else {
            document.getElementById('file-' + current_file_id).querySelector('.progress').innerHTML = 'Gescheitert';
            //document.getElementById('dropzone').innerHTML = '<span>Fehler</span>';
          }*/
        }
        all_files[current_file_id] = 1;
        current_file_id++;
        handleNextFile();
      }
    };
    xhr.send(JSON.stringify(current_file));
  };

  var handleNextFile = function () {

    if ( current_file_id < all_files.length ) {

      locked = true;

      //document.getElementById('file-' + current_file_id).querySelector('.progress').innerHTML = 'Hochladen...';
      document.getElementById('dropzone').innerHTML = '<span>Warte...  '+ (current_file_id + 1) +'/'+ all_files.length +'</span>';
      var current_file = all_files[current_file_id];

      var reader = new FileReader();
      reader.onload = handleReaderLoad;
      reader.readAsDataURL(current_file);

    } else {
      locked = false;
      window.location = '/'; //mod by cox - return to home
    }
  };

  var openFileDialog = function () {
    var evt = new MouseEvent('click');
    document.getElementById('addFile').dispatchEvent(evt);
  };

  var dropzone = document.getElementById('dropzone');
  dropzone.addEventListener('click', openFileDialog, false);
  dropzone.addEventListener('dragenter', noopHandler, false);
  dropzone.addEventListener('dragexit', noopHandler, false);
  dropzone.addEventListener('dragover', noopHandler, false);
  dropzone.addEventListener('drop', drop, false);

  var addFile = document.getElementById('addFile');
  addFile.addEventListener('change', handleFileDialog);

}(window, window.document));
