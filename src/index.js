"use strict";
var _tglSekarang = '';
var _listAntrian = [];
var _listPengaturan = [];
var _antrian = {
    tanggal: getNow(),
    type: "GENOSE",
    counter: 0
};
var _pengaturan = {
    tanggal: getNow(),
    printer: "",
    max: 0,
    start: 1,
    width: 0,
    type: "GENOSE"
};
var myModal = document.getElementById('myModal')
$(document).ready(function() {
    buildView();
});
function isEmpty(val) {
    var cek = (val !== undefined && val !== null && val !== '') ? false : true;
    return cek;
}
function getListAntrian() {
    var dbAntrian = localStorage.getItem('listAntrian');
    if(!isEmpty(dbAntrian)) {
        _listAntrian = JSON.parse(dbAntrian);
    }
    return _listAntrian;
}
function getListPengaturan() {
    var dbPengaturan = localStorage.getItem('listPengaturan');
    if (!isEmpty(dbPengaturan)) {
        _listPengaturan = JSON.parse(dbPengaturan);
    }
    return _listPengaturan;
}

function getAntrian() {
    var dbAntrian = getListAntrian();
    const ind1 = dbAntrian.findIndex(el => el.tanggal == _tglSekarang && el.type == _pengaturan.type);
     if (ind1 !== undefined && ind1 > -1) {
        _antrian = _listAntrian[ind1]
    } else {
        _antrian = {
            tanggal: _tglSekarang,
            type: _pengaturan.type,
            counter: 0
        };
         _listAntrian.push(_antrian);
         localStorage.setItem('listAntrian', JSON.stringify(_listAntrian));
    }
    return _antrian;
}

function getPengaturan() {
    var dbPengaturan = getListPengaturan();
     const ind2 = _listPengaturan.findIndex(el => el.tanggal == getNow());
    if (ind2 !== undefined && ind2 > -1) {
        _pengaturan = _listPengaturan[ind2]
    } else {
        _pengaturan = {
            tanggal: getNow(),
            printer: "",
            max: 0,
            start: 1,
            width: 0,
            type: "GENOSE"
        };
        _listPengaturan.push(_pengaturan);
         localStorage.setItem('listPengaturan', JSON.stringify(_listPengaturan));
    }
    return _pengaturan;
}

function buildView() {
    buildDb();
    var max = parseInt(_pengaturan.max);
    var cur = parseInt(_antrian.counter);
    var ttl = max - cur;
    $('#tanggal').html(getNow())
    $('#typeAntrian').html(isEmpty(_pengaturan.type) ? '' : _pengaturan.type)
    $('#ttl_antrian').html(ttl)
    $('#noAntrian').html(cur)
    
    $('#list_printers').val(_pengaturan.printer);
    $('#typeAntrian').val(_pengaturan.type);
    $('#maxData').val(max);
    $('#mulaidari').val(_pengaturan.start);
    $('#widthpage').val(_pengaturan.width);
    
    if (ttl < 1) {
        $('#cartAntrian').attr({ disabled: true });
        $('#cartAntrian').attr({ onclick: null });
        $('#cartAntrian').removeClass('card');
    } else {
        $('#cartAntrian').attr({ disabled: false });
        $('#cartAntrian').attr({ onclick: "saveAntrian()" });
        $('#cartAntrian').addClass('card');
    }

}
function buildDb() {
    getNow();
    getPengaturan();
    getAntrian();
}

function getNow() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    _tglSekarang = `${yyyy}-${mm}-${dd}`;
    return _tglSekarang;
;
}

var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    keyboard: false, backdrop: false
});
    $('#title-data').dblclick(function(){
  alert("The paragraph was double-clicked");
    });

function savePengaturan() {
    var printer = $('#list_printers').val();
    var typeAntrian = $('#typeAntrian').val();
    var maxData = $('#maxData').val();
    var mulaidari = $('#mulaidari').val();
    var widthpage = $('#widthpage').val();
    _tglSekarang = getNow();
    _pengaturan = {
        tanggal: _tglSekarang,
        printer: printer,
        max: parseInt(maxData),
        start: parseInt(mulaidari),
        width: widthpage,
        type: typeAntrian
    }
    const ind2 = _listPengaturan.findIndex(el => el.tanggal == _tglSekarang);
    if (ind2 !== undefined && ind2 > -1) {
        _listPengaturan.splice(ind2, 1);
    }
    _listPengaturan.push(_pengaturan);
    localStorage.setItem('listPengaturan', JSON.stringify(_listPengaturan));
    
    if (parseInt(mulaidari) > 1) {
        saveAntrian(mulaidari);
    }

    buildView();
    myModal.hide();
}


function saveAntrian(c = null) {
    _tglSekarang = getNow();
    getAntrian();
    getPengaturan();
    _antrian = {
        tanggal: _tglSekarang,
        type: _pengaturan.type,
        counter: isEmpty(c) ? _antrian.counter + 1 : c
    };
    const ind2 = _listAntrian.findIndex(el => el.tanggal == _tglSekarang && el.type == _antrian.type);
    if (ind2 !== undefined && ind2 > -1) {
        _listAntrian.splice(ind2, 1);
    }
    _listAntrian.push(_antrian);
    localStorage.setItem('listAntrian', JSON.stringify(_listAntrian));
    printTicket();
    buildView();
    
}

function printTicket() {
    const style_label = 'text-align: center; margin-top: 0px; margin-left: 5px; font-size: 14px;font-weight: 900;';
    var d = new Date();
    var strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + ' (' + d.getHours() + ':' + d.getMinutes() + ')';
     const data = [
        {
            type: 'text',
            value: 'ANTRIAN ' + _antrian.type,
            style: style_label,
        },
        {
            type: 'text', 
            value: 'TERMINAL TERPADU PULO GEBANG',
            style: style_label
        },
        {
            type: 'text', 
            value: strDate,
            style: style_label
        },               
         {
             type: 'text',
             value: _antrian.counter,
             style: 'text-align: center; margin-top:  10px, font-size: 40px; font-weight: 9000'
        }
    ]
     print(data, _pengaturan.printer, _pengaturan.width+ "px")
}