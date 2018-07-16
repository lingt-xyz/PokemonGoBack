class GameConsole {
    constructor() {
        $("#divGameConsole").html("");
    }

    logGeneral(text) {
        $("#divGameConsole").append("<div class='gamelog text-light'>[Info]: " + text + "</div>");
        this.scrollConsle();
    }
    logBattle(text) {
        $("#divGameConsole").append("<div class='gamelog text-light bg-dark'>[Battle]: " + text + "</div>");
        this.scrollConsle();
    }
    logWarning(text) {
        $("#divGameConsole").append("<div class='gamelog text-warning'>[Warning]: " + text + "</div>");
        this.scrollConsle();
    }
    logError(text) {
        $("#divGameConsole").append("<div class='gamelog text-danger'>[Warning]: " + text + "</div>");
        this.scrollConsle();
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
        $("#divGameConsole").scrollTop(function () { return this.scrollHeight; });
    }
}