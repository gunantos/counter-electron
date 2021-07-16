"use strict";
const ARRBULAN = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
var _tglSekarang = '';
var _listAntrian = [];
var _listPengaturan = [];
var _antrian = {
    tanggal: getNow(),
    type: "VAKSIN",
    counter: 0
};
var _pengaturan = {
    tanggal: getNow(),
    printer: "",
    max: 0,
    start: 1,
    width: 0,
    type: "VAKSIN"
};
var myModal = document.getElementById('myModal')
$(document).ready(function() {
    buildView();
});

function tglToString(tgl) {
    var ar = tgl.split('-');
    var thn = ar[0];
    var bln = ar[1];
    var tgl = ar[2];
    return tgl + ' ' + ARRBULAN[(parseInt(bln) - 1)] + ' ' + thn;
}

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
     const ind2 = dbPengaturan.findIndex(el => el.tanggal == getNow());
    if (ind2 !== undefined && ind2 > -1) {
        _pengaturan = _listPengaturan[ind2]
    } else {
        _pengaturan = {
            tanggal: getNow(),
            printer: "",
            max: 0,
            start: 1,
            width: 0,
            type: "VAKSIN"
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
    var gambarButton = 'genose.png';
    if (_pengaturan.type.toUpperCase() == 'GENOSE') {
        gambarButton = 'genose.png';
    } else if(_pengaturan.type.toUpperCase() == 'VAKSIN') {
        gambarButton = 'rapid.svg';
    } else {
        gambarButton = 'rapid.svg';
    }
    $('#tanggal').html(tglToString(getNow()))
    $('#typeAntrian').html(isEmpty(_pengaturan.type) ? '' : _pengaturan.type)
    $('#ttl_antrian').html(ttl)
    $('#noAntrian').html(cur)
    $('#gambarRapid').attr('src', gambarButton);
    
    $('#list_printers').val(_pengaturan.printer);
    $('#sel-type-antrian').val(_pengaturan.type);
    $('#maxData').val(max);
    $('#mulaidari').val(cur + 1);
    $('#widthpage').val(_pengaturan.width);
    $('#angkaAntrian').html(cur + 1)
    if (ttl < 1) {
        $('#cartAntrian').hide();
        $('#cartAntrian').attr({ onclick: null });
    } else {
        $('#cartAntrian').show();
        $('#cartAntrian').attr({ onclick: "saveAntrian()" });
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
    var typeAntrian = $('#sel-type-antrian').val();
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
    if (mulaidari != '') {
        _antrian.counter = parseInt(mulaidari)
        const ind1 = _listAntrian.findIndex(el => el.tanggal == _tglSekarang && el.type == _antrian.type);
        if (ind1 !== undefined && ind1 > -1) {
            _listAntrian.splice(ind1, 1);
        }
        _listAntrian.push(_antrian);
        localStorage.setItem('listAntrian', JSON.stringify(_listAntrian));
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
    const style_label = 'text-align: center; margin-top: 0px;  font-size: 14px;font-weight: 900;';
    var d = new Date();
    var strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + ' (' + d.getHours() + ':' + d.getMinutes() + ')';
    var si = _pengaturan.width * 30 / 100;
    var wi = _pengaturan.width - si;
     const data = [
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
            value: _antrian.type,
            style: 'text-align: center; margin-top: 10px;font-size: 20px;font-weight: 900;border: 1px solid #000;',
        },
         {
             type: 'text',
             value: _antrian.counter,
             style: 'text-align: center; margin-top: 10px; margin-bottom: 20px; font-size: 144px;font-weight: 900;border: 1px solid #000;'
        }
    ]
     print(data, _pengaturan.printer, _pengaturan.width+ "px")
}