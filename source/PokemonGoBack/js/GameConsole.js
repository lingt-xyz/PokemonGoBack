class GameConsole {
    constructor() {
        $("#divGameConsole").html("");
    }

    logGeneral(text) {
        this.scrollConsle();
        $("#divGameConsole").append("<div class='gamelog'>" + text + "</div>");
    }
    logBattle(text) {
        this.scrollConsle();
        $("#divGameBattle").append("<div class='gamelog'>" + text + "</div>");
    }
    logWarning(text) {
        this.scrollConsle();
        $("#divGameWarning").append("<div class='gamelog'>" + text + "</div>");
    }
    logInfo(text) {
        this.scrollConsle();
        $("#divGameInfo").append("<div class='gamelog'>" + text + "</div>");
    }

    //can not find x and y , null reference
    filterLog() {
        var x = document.getElementById("divGameConsole");
        var y = document.getElementById("divGameInfo");
        if (x = null) {
            //do nothing
        } else {
            x.style.display === "none"
        }
        if (y.style.display === "none") {
            //do nothing
        } else {
            y.style.display === "none"
        }
    }
    scrollConsle() {
        var height = 0;
        $(".gamelog").each(function (i, value) {
            height += parseInt($(this).height());
        });
        height += '';
        $("#divGameConsole").animate({ scrollTop: height });
    }
}