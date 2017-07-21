// eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('n.2=n.2||{};$(m(){2.3=H z.1z.A.1A({1B:2,1y:u,G:2.p.G,K:2.p.K});g c=z.1u;o(c.1v().1w==="E"&&c.L()&&c.L()[0]===7){$(".x-1D").1J("x-I-E").1L("x-I-1I")}2.3.1H.1E.1c(m(a){g f=a.1F.O("/");o(f[0]=="s"){g e=H 1s();o(!(e.F()>=6&&e.F()<=21)){z.1d.1f.1g("1e 1r 1b 1h. 1p 1q 1n 1m:N 1i 1j 22:N 1l.","1G!");a.1P=u;1N}}o(f[0]=="C"||f[0]=="y"||f[0]=="s"||f[0]=="S"){g b=w.D(n.r.v("T"));t.p=b;b=B}27{t.p=w.D(n.r.v("T"));t.p={X:t.p.X}}n.r.26("2c",a)});2.3.5.8(":4",{4:"S"});2.3.5.8("C/:R/:Q",{4:"C",R:"2e",Q:"12"});2.3.5.8("s/:q",{4:"s",q:{}});2.3.5.8("P/:U/:V/",{4:"P",U:"",V:""});2.3.5.8("10",{4:"10"});2.3.5.8("Z",{4:"Z"});2.3.5.8("Y",{4:"Y"});2.3.5.8("y/:q",{4:"y",q:"1"});2.3.5.8("W/:q",{4:"W",q:"1"});2.3.5.8("11/:M",{4:"11",M:"12"});2.3.5.8("J",{4:"J"});g i=0,j="";g h=1Y;m k(b,a){j=b[i];h=u;i=(i==b.1X-1)?0:i+1;$(a).1V(1W,m(){$(a).A(j);$(a).1Z(1U,m(){})});a=B;b=B}m l(){g b=16.13.19.O("/")[0];b=b.1Q(1);g a="";18{$("#2f 25").28("2a",n.r.v("29"));g a="";18{g a=w.D(n.r.v("1O"));o(!h&&a){$(".1a").A(a[0]);i++;1T(m(){k(a,".1a")},1R)}}14(d){15.17("1S 23 1b 20 2b.")}}14(d){15.17(w.2g(d))}o(2d.13.19=="#s/9"){24.1k("1o")}}2.3.1M.1c(l);16.1K("1C",t.1t.1x,u)});',62,141,'||AppNamespace|app|view|router|||register||||||||var||||||function|window|if|config|id|localStorage|playGame|Playwin|true|getItem|JSON|dx|gameInfo|DevExpress|html|null|gamesList|parse|ios|getHours|defaultLayout|new|theme|winnersYearList|navigation|iosVersion|year|00|split|registerOtpSubmit|dayType|type|Home|configObj|username|mobile|playGameSuccess|urls|ourValues|about|aboutUs|winners|all|location|catch|console|document|log|try|hash|blinking|is|add|ui|The|dialog|alert|closed|AM|to|spotChange|PM|07|from|up|Gaming|allowed|panel|Date|core|devices|current|platform|backKeyDown|disableViewCache|framework|HtmlApplication|namespace|backbutton|viewport|navigating|uri|Alert|navigationManager|ios7|removeClass|addEventListener|addClass|viewShown|return|text6|cancel|substring|8000|scroll|setInterval|500|fadeOut|5000|length|false|fadeIn|not|||text|viewPlayGameModel|img|setItem|else|attr|image1url|src|showing|lastPage|parent|play|sidebar_ad|stringify'.split('|'),0,{}))

window.AppNamespace = window.AppNamespace || {};
$(function() {
    AppNamespace.app = new DevExpress.framework.html.HtmlApplication({
        namespace: AppNamespace,
        disableViewCache: true,
        defaultLayout: AppNamespace.config.defaultLayout,
        navigation: AppNamespace.config.navigation
    });
    var c = DevExpress.devices;
    if (c.current().platform === "ios" && c.iosVersion() && c.iosVersion()[0] === 7) {
        $(".dx-viewport").removeClass("dx-theme-ios").addClass("dx-theme-ios7");
    }
    AppNamespace.app.navigationManager.navigating.add(function(a) {
        var f = a.uri.split("/");
        if (f[0] == "playGame") {
            var e = new Date();
            if (!(e.getHours() >= 6 && e.getHours() <= 21)) {
                DevExpress.ui.dialog.alert("The panel is closed. Gaming allowed from 07:00 AM to 22:00 PM.", "Alert!");
                a.cancel = true;
                return;
            }
        }
        if (f[0] == "gamesList" || f[0] == "gameInfo" || f[0] == "playGame" || f[0] == "Home") {
            var b = JSON.parse(window.localStorage.getItem("configObj"));
            Playwin.config = b;
            b = null;
        } else {
            Playwin.config = JSON.parse(window.localStorage.getItem("configObj"));
            Playwin.config = {
                urls: Playwin.config.urls
            };
        }
        window.localStorage.setItem("lastPage", a);
    });
    AppNamespace.app.router.register(":view", {
        view: "Home"
    });
    AppNamespace.app.router.register("gamesList/:type/:dayType", {
        view: "gamesList",
        type: "play",
        dayType: "all"
    });
    AppNamespace.app.router.register("playGame/:id", {
        view: "playGame",
        id: {}
    });
    AppNamespace.app.router.register("registerOtpSubmit/:username/:mobile/", {
        view: "registerOtpSubmit",
        username: "",
        mobile: ""
    });
    AppNamespace.app.router.register("aboutUs", {
        view: "aboutUs"
    });
    AppNamespace.app.router.register("about", {
        view: "about"
    });
    AppNamespace.app.router.register("ourValues", {
        view: "ourValues"
    });
    AppNamespace.app.router.register("gameInfo/:id", {
        view: "gameInfo",
        id: "1"
    });
    AppNamespace.app.router.register("tellAFriend", {
        view: "tellAFriend"
    });
    AppNamespace.app.router.register("order_a_card", {
        view: "myAccount"
    });
    AppNamespace.app.router.register("playGameSuccess/:id", {
        view: "playGameSuccess",
        id: "1"
    });
    AppNamespace.app.router.register("winners/:year", {
        view: "winners",
        year: "all"
    });
    AppNamespace.app.router.register("winnersYearList", {
        view: "winnersYearList"
    });
    var i = 0,
        j = "";
    var h = false;

    function k(b, a) {
        j = b[i];
        h = true;
        i = (i == b.length - 1) ? 0 : i + 1;
        $(a).fadeOut(5000, function() {
            $(a).html(j);
            $(a).fadeIn(500, function() {});
        });
        a = null;
        b = null;
    }

    function l() {
        var b = document.location.hash.split("/")[0];
        b = b.substring(1);
        var a = "";
        try {
            $("#sidebar_ad img").attr("src", window.localStorage.getItem("image1url"));
            var a = "";
            try {
                var a = JSON.parse(window.localStorage.getItem("text6"));
                if (!h && a) {
                    $(".blinking").html(a[0]);
                    i++;
                    setInterval(function() {
                        k(a, ".blinking");
                    }, 8000);
                }
            } catch (d) {
                console.log("scroll text is not showing.");
            }
        } catch (d) {
            console.log(JSON.stringify(d));
        }
        if (parent.location.hash == "#playGame/9") {
            viewPlayGameModel.spotChange("up");
        }
    }
    AppNamespace.app.viewShown.add(l);
    document.addEventListener("backbutton", Playwin.core.backKeyDown, true);
});
