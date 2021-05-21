/*
 * @Author: Gunanto Simamora
 * @Date:   2020-10-21 20:20:22
 * @Last Modified by:   Gunanto Simamora
 * @Last Modified time: 2020-10-27 13:47:45
 */
'use strict';
$("body").bind("paste", function (e) {
    if (!$("#input-search").is(":focus")) {
      var pasteData = e.originalEvent.clipboardData.getData('text');
      $('#input-search').val(pasteData);
    }
  });

  $("body").niceScroll({
    cursorcolor: "aquamarine",
    cursorwidth: "1px"
  });

  $(document).on('keydown', function (event) {
    if (event.key == "Escape") {
      return false;
    }
    if ((event.ctrlKey || event.metaKey) && event.altKey && event.keyCode == 113) {
        showSetting()
     }
  });
  
  console.log($.fullscreen.isNativelySupported() ? 'supports' : 'doesn\'t support');
  // console.log(faceapi.nets);
  function fullscreen() {
    $('body').fullscreen();
  }
  $(document).bind('fscreenchange', function (e, state, elem) {
    // if we currently in fullscreen mode
    if ($.fullscreen.isFullScreen()) {
      console.log($.fullscreen.isFullScreen() ? '' : 'not');
    } else {
      $('body').fullscreen();
    }

    console.log($.fullscreen.isFullScreen() ? '' : 'not');
  });

  jQuery('body').on('contextmenu', function (e) {
    // return false; 
  });
  jQuery(document).bind('selectstart dragstart', function (e) {
    e.preventDefault();
    return false;
  });
  var video = document.getElementById("myVideo");
  $(document).ajaxStart(function () {
    Pace.restart();
  });
  // Get the button
  var btn = document.getElementById("myBtn");
  var _disable = false;
  // Pause and play the video, and change the button text
  function myFunction() {
    if (video.paused) {
      video.play();
      btn.innerHTML = "Pause";
    } else {
      video.pause();
      btn.innerHTML = "Play";
    }
  }

  $(document).ready(function () {
    $("#input-search").focus();
    $("#input-search").val("");

  });
  $(document).keypress(function (e) {
    if (_disable == false) {
      var key = e.keyCode;
      var isi = $("#input-search").val();

      if (key == 13) {
        $("#input-search").change();
      } else {
        if ($('#input-search').is(":focus") == false) {
          $('#input-search').val(isi + "" + String.fromCharCode(key));
        }
      }
    }
  });
  $('.modal').on('hidden.bs.modal', function () {
    disabled(false);
    clear();
    $('#modal-box .modal-title').html('');
    $("#modal-box .modal-body").html('');
    $('#modal-box .modal-footer').html('');
    $('#modal-box').modal('hide');
  });

  window.addEventListener("afterprint", function (event) {
    clear();
  });

  function clear() {
    disabled(false);
    $("#input-search").val("");
    $("#input-search").focus();
  }

  function disabled(fungsi) {

    _disable = fungsi;
    $('#input-search').prop('disabled', fungsi);
    $('#input-search').prop('readonly', fungsi);
  }

  function messages(status, message) {
    $.toast({
      heading: status,
      text: message,
      showHideTransition: 'slide',
      icon: status,
      position: 'top-right'
    });
  }

  $(document).on('click', '.accordion-toggle', function () {
    $('.hiddenRow').hide();
    console.log($(this).next().attr('data'));
    $(this).next('tr').find('.hiddenRow').show();
  })
function printpage(a, e, t, n, d, i, s, o) {
    disabled(!0), $("<iframe id='printabel'>").hide().attr("src", baseURL+"print.php?owner_id=" + o + "&noreg=" + a + "&nmpo=" + e + "&tujuan=" + t + "&tanggal=" + n + "&jam=" + d + "&id_po=" + i + "id_tujuan" + s).appendTo("body"), $("#modal-box").modal("hide"), disabled(!1), $("#input-search").val(""), $("#input-search").focus(), fullscreen()
}

function udate_result(a) {
    return a
}

function checked_check(a) {
    console.log("clik tr-" + a), 1 == $(a).is(":checked") ? $(a).prop("checked", !1) : $(a).prop("checked", !0)
}

function show_penumpang(a, e, t, n, d, i, s, o, r, l) {
    disabled(!0), $("#modal-box").animate({
        opacity: 0
    }, 100, "linear");
    var p = '<div class="list-group col-12"><h3>Tujuan ' + d + "</h3>" + s + "(" + i + ')<br><table class="table table-striped table-hover" id="tbl-penumpang"><thead><tr><th></th><th>NAMA</th><th>Jenis Kelamin</th></tr></thead><tbody><form name="print_boarding" id="print-boarding" onsubmit="print_boarding" method="post">',
        c = 0;
    if ("undefined" != o) {
        console.log(dataApi);
        c = 0;
        $.each(detailAPI, function(o, l) {
            var u = "none" == l.status_pnp ? "checked" : "disabled=true",
                b = "";
            switch (l.status_pnp) {
                case "checkin":
                    b = '<span class="badge badge-info">Checkin</span> ';
                    break;
                case "gatein":
                    b = '<span class="badge badge-warning">Gate In</span> ';
                    break;
                case "gateout":
                    b = '<span class="badge badge-warning">Gate Out</span> ';
                    break;
                case "block":
                    b = '<span class="badge badge-danger">Block</span> ';
                    break;
                case "deactive":
                    b = '<span class="badge badge-danger">Non Aktif</span> ';
                    break;
                case "none":
                default:
                    b = ""
            }
            p += "<tr " + ("none" == l.status_pnp ? "onclick=\"checked_check('#brs-" + c + "');\"" : "") + '><td><input type="hidden" id="po_id" name="po_id" value="' + e + '"><input type="hidden" id="nama_po" name="nama_po" value="' + t + '"><input type="hidden" id="noreg" name="noreg" value="' + a + '"><input type="hidden" id="id_tujuan" name="id_tujuan" value="' + n + '"><input type="hidden" id="tujuan"  name="tujuan" value="' + d + '"><input type="hidden" id="tanggal" name="tanggal" value="' + s + '"><input type="hidden" id="jam"  name="jam" value="' + i + '"><input type="hidden" id="id_pnp" name="id_pnp[]" value="' + l.passanger_id + '"><input type="hidden" id="owner_id" name="owner_id" value="' + r + '"><input type="hidden" id="owner_id" name="sex_pnp[]" value="' + l.sex + '"><label class="switch"><input type="checkbox" name="penumpang[]" data="' + l.passanger_id + '" class="custom-control-input" id="brs-' + c + '" data-sex="' + l.sex + '" value="' + l.name + '" ' + u + ' /><span class="slider"></span></label></td><td>' + b + l.name + "</td><td>" + l.sex + "</td></tr>"
        }), c += 1
    } else {
        "active";
        p += "<tr onclick=\"checked_check('#brs-" + c + '\');"><td> <label class="switch"><input type="checkbox" name="penumpang[]" data="0" data-sex="l" class="custom-control-input" id="brs-' + c + '" value="Penumpang ' + t + '" checked><span class="slider"></span></label></div><input type="hidden" id="po_id" id="po_id" value="' + e + '"><input type="hidden" id="nama_po" id="nama_po" value="' + t + '"><input type="hidden" id="noreg" value="' + a + '"><input type="hidden" id="id_tujuan" value="' + n + '"><input type="hidden" id="tujuan" value="' + d + '"><input type="hidden" id="tanggal" value="' + s + '"><input type="hidden" id="jam" value="' + i + '"><input type="hidden" id="owner_id" value="' + r + '"><input type="hidden" id="id_pnp" name="id_pnp[]" value=""></td><td>' + "" + "Penumpang " + t + "</td><td></td></tr>"
    }
    p += "</tbody></table></div>", $("#modal-box .modal-title").html(t + " #" + a), $("#modal-box .modal-body").html(p), $("#modal-box .modal-footer").html('<button type="button" onclick="printprosess()" class="btn btn-success">PRINT</button>'), $("#modal-box").modal("show"), $("#modal-box").animate({
        opacity: 1
    }, 100, "linear")
}

function modal_show(a) {
    $("#modal-box .modal-content").html('<div class="progress progress-sm active"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>'), $("#modal-box .modal-content").load(a), $("#modal-box").modal("show")
}

function error_show(a, e) {
    $("#input-search_keyboard").hide();
    var t = '<div class="text-center"><strong>' + e + '<strong><br><br></div><button type="button" data-dismiss="modal" class="btn btn-lg btn-block btn-info ">OK</button>';
    $("#modal-error .modal-title").html(a), $("#modal-error .modal-body").html(t), $("#modal-error .modal-footer").html('<div class="alert alert-info"><small>Silahkan hubungi Petugas PO sesuai tiket anda atau Petugas Terminal</small></div>'), $("#modal-error").modal("show")
}
$("#input-search").change(function(a) {
    $('#input-search_keyboard').css('display', 'none');
    disabled(true);
    if ($(this).val() != '') {
        var e = '<div class="list-group col-12"><table class="table table-striped table-hover" style="border-collapse:collapse;"><thead><tr><th>Waktu Berangkat</th><th>NAMA PO</th><th>TUJUAN</th><th>PNP</th><th>STATUS</th><th width="5%"></th></tr></thead><tbody>',
            t = $(this).val(),
            n = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Agustus", "September", "Oktober", "November", "Desember"];
        $.get(baseURL+ "get.php?ticket_id=" + $(this).val(), function(a) {
            var d = "";
            if (1 == a.status) {
                dataApi = a.data;
                var i = "",
                    s = 1;
                $.each(a.data, function(a, t) {
                    var o = "";
                    switch (t.status) {
                        case "checkin":
                            o = '<span class="badge badge-info">Checkin</span> ', d = "";
                            break;
                        case "gatein":
                            o = '<span class="badge badge-warning">Gate In</span> ', d = "";
                            break;
                        case "block":
                            o = '<span class="badge badge-danger">Block</span> ', d = "";
                            break;
                        case "deactive":
                            o = '<span class="badge badge-danger">Non Aktif</span> ', d = "";
                            break;
                        case "active":
                        default:
                            o = "", d = '<button sytle="height: 50px;" onclick="printprosess(\'' + t.boarding_id + '\');" class="btn btn-sm btn-success"><i class="fa fa-print" style="font-size:32px;"></i> PRINT</button>'
                    }
                    var r = "p" == t.sex ? "Ny." : "Tn.";
                    if (i != t.boarding_id) {
                        "" != i && (e += "</div></td></tr>");
                        var l = new Date(t.date_of_departure);
                        new Date(t.time_of_departure);
                        e += '<tr style="cursor:pointer"  data-toggle="collapse" data-target="#tiket' + a + '" class="accordion-toggle collapsed" aria-expanded="false" ><td>' + l.getDate() + " " + n[l.getMonth()] + " " + l.getFullYear() + " (" + t.time_of_departure + ")</td><td>" + t.po_name + "</td><td>" + t.destination_name + "</td><td>" + t.total_pnp + "</td><td>" + o + "</td><td>" + d + '</td></tr>\n                    <tr id="tiket' + a + '" class="collapse" style="background-color:#17a2b899; margin: 0px; padding: 0px;"><td colspan="6" class="hiddenRow">\n                        <div style="margin-bottom: 0px; "><i class="fa fa-user"></i> ' + r + " " + t.name
                    } else e += '&nbsp;&nbsp;<i class="fa fa-user"></i> ' + r + " " + t.name, s == t.total_pnp && (e += "</div>\n                             </td></tr>");
                    s++, i = t.boarding_id
                }), e += '</tbody></table></div><br><div style="margin: 0px !important" class="alert alert-info">Periksa Tiket anda dan pastikan tiket anda sesuai dengan Boardingpass yang ingin dicetak! <br>Butuh bantuan, silahkan hubungi petugas Terminal Terpadu Pulogebang! Terimakasih</div>', $("#modal-box .modal-title").html("Checking #" + t), $("#modal-box .modal-body").html(e), $("#modal-box .modal-footer").html(""), $("#modal-box .modal-footer").hide(), $("#modal-box").modal("show")
            } else error_show("Tidak Ditemukan", "Tiket anda belum terdaftar atau sudah melewati batas checkin!"), $("#input-search").val(""), $("#input-search").focus();
            disabled(!1)
        })
    }
    disabled(!1), $("#input-search").val(""), $("#input-search").focus()
}), $("#form-search").submit(function(a) {
    a.preventDefault();
    var e = $(this).attr("action"),
        t = $("#seacrh-text").val();
    $("#modal-box .modal-content").html('<div class="progress progress-sm active"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div></div>'), $.get(e, {
        q: t
    }, function(a) {
        $("#modal-box .modal-content").html(a)
    }), $("#modal-box").modal("show"), $("seacrh-text").val("")
}), $("#modal-box").on("hidden.bs.modal", function(a) {
    $("#input-search").val(""), $("#input-search").focus()
});

function showSetting() {
    $('#modalSetting').modal('show')
}
function printprosess(boarding_id) {
    const style_label = 'text-align: center; margin-top: 0px; margin-left: 5px; font-size: 14px;font-weight: 900;';
    var qrcode;
    var qrcode2;
    var i = 1;
    var html = '';
    var d = new Date();
    var strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + ' (' + d.getHours() + ':' + d.getMinutes() + ')';
  
    var jlh = dataApi.length;
    var kode_arr = [];
    var noreg = '';
    var id_pnp = [];
    var nama = [];
    var sex = [];
    var status = '';
    var po_id, destination_id, owner_id, po, tujuan, tgl, jam;
    var nopol = '';
    var updateTgl;
    var status_pnp = [];
    $.each(dataApi, function (i, v) {
        if (v.boarding_id === boarding_id) {
            nopol = v.nopol;
            po_id = v.po_id;
            destination_id = v.destination_id;
            noreg = v.ticket_id;
            owner_id = v.owner_id;
            po = v.po_name;
            tujuan = v.destination_name;
            tgl = v.date_of_departure;
            jam = v.time_of_departure;
            nama.push(v.name);
            id_pnp.push(v.passanger_id);
            sex.push(v.sex);
            updateTgl = v.date_of_ticket;
            status = v.status;
            status_pnp.push(v.status_pnp);
        }
    });
    if (status == 'checkin' || status == 'gatein' || status == 'block') {
        $('#modal-box').modal('hide');
        disabled(false);
        error_show("Info", "<strong>Penumpang telah melakukan checkin pada <small><b>" + updateTgl + "</b></small></strong>!");
        return false;
    }
    const w = localStorage.getItem('width')
    var margin = localStorage.getItem('qrMargin')
    var qrHeight = localStorage.getItem('qrHeight')
    if (qrHeight === undefined || qrHeight === null || qrHeight === 'null' || qrHeight === '') {
      qrHeight = 85
    }
    var qrWidth = localStorage.getItem('qrWidth')
    if (qrWidth === undefined || qrWidth === null || qrWidth === 'null' || qrWidth === '') {
      qrWidth = 85
    }
    if (margin === undefined || margin === null || margin === 'null' || margin === '') {
      margin = 40
    }
    let kp;
    if (w === '207px') {
        kp = '20px 50px 20px 0px'
    }else{
        kp = '20px 60px 20px 0px'
    }
    if (jlh > 0) {
        $.post(baseURL+'save.php', {
            kode: noreg,
            id_po: po_id,
            id_tujuan: destination_id,
            owner_id: owner_id,
            po: po,
            tujuan: tujuan,
            tanggal: tgl,
            jam: jam,
            nopol: nopol,
            boarding_id: boarding_id,
            status: status,
            'status_pnp[]': status_pnp,
            'id_pnp[]': id_pnp,
            'sex_pnp[]': sex,
            'nama_penumpang[]': nama
        }, function (data) {
            if (data.status == true) {
                $.each(data.data, function (x, itm) {
                    const data = [
                        {
                            type: 'text',
                            value: 'SISTEM RETRIBUSI PENUMPANG',
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
                            type: 'qrCode',
                            value: itm.noreg,
                            height: qrHeight,
                            width: qrWidth,
                            style: `margin-left: ${margin}px; margin-top: 20px; margin-bottom: 20px`
                        },
                        {
                          type: 'table',
                          css: {"font-size": "10px", "font-weight": "800"},
                          style: "text-align: left;margin-left: 20px;",
                          tableBody: [
                              [{type: 'text', value:'Nama     ', style: "text-align: left;"}, {type: 'text', value: `: ${itm.nama_pnp}`, style: "text-align: left;"}],
                              [{type: 'text', value:'Tiket ID ', style: "text-align: left;"}, {type: 'text', value: `: ${noreg}`, style: "text-align: left;"}],
                              [{type: 'text', value:'Nama PO  ', style: "text-align: left;"}, {type: 'text', value: `: ${po}`, style: "text-align: left;"}],
                              [{type: 'text', value:'Tujuan   ', style: "text-align: left;"}, {type: 'text', value: `: ${tujuan}`, style: "text-align: left;"}],
                              [{type: 'text', value:'Tanggal  ', style: "text-align: left;"}, {type: 'text', value: `: ${tgl}`, style: "text-align: left;"}],
                              [{type: 'text', value:'Jam      ', style: "text-align: left;"}, {type: 'text', value: `: ${jam}`, style: "text-align: left;"}],
                          ],
                          tableBodyStyle: 'border: 0px solid #ddd',
                      }
                    ]
                    print(data)
                });
            } else {
                $('#modal-box').modal('hide');
                disabled(false);
                error_show("Info", "<strong>" + data.message + "</strong>!");
                return false;
            }
        });
        $('#modal-box').modal('hide');
        disabled(false);
        $("#input-search").val("");
        $("#input-search").focus();
    } else {
        disabled(false);
        error_show("Info", "<strong>Silahkan pilih penumpang</strong>!");
        return false;
    }
  }
  
  
  function saveConfig() {
    var p = document.getElementsByName("printer");
    var w = $("#width");
    let printerName, widthPage;
  for (var i = 0, length = p.length; i < length; i++) {
    if (p[i].checked) {
      printerName = p[i].value;
      break;
    }
  }
  widthPage = `${w}px`
      localStorage.setItem('printer', printerName);
      localStorage.setItem('width', widthPage);
  localStorage.setItem('qrMargin', $('#qrMargin').val())
  localStorage.setItem('qrHeight', $('#qrHeight').val())
  localStorage.setItem('qrWidth', $('#qrWidth').val())
    $('#modalSetting').modal('hide')
  }