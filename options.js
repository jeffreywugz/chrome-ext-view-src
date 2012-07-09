
/* View and save config for the extension. */

function init() {

    function save() {
        var c = {};
        c.tooltip  = $("#inptip").get(0).checked;
        c.beautify = $("#inpbeautify").get(0).checked;
        c.colorize = true;
        c.hilight = $("#hi").val().split(/\r\n|\r|\n/);
        c.css = $("#css").val();

        save_config(c);
    }

    // save config
    $("input, textarea").change(save);
    $(window).bind("unload", save);

    // read config
    $("#inptip").get(0).checked = get_config("tooltip");
    $("#inpbeautify").get(0).checked = get_config("beautify");
    $("#hi").val(get_config("hilight").join("\n"));
    $("#css").val(get_config("css"));
}


document.addEventListener('DOMContentLoaded', function() {
    init();
});

