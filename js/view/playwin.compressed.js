var Playwin = {};

Playwin.core = {
    appType: "mob",
    userDetails: {
        name: "",
        mobile: "",
        email: ""
    },
    getParseClass: function (b, i, d) {
        var a = Playwin.core.parseStr(b) + " " + Playwin.core.parseStr(i) + " " + Playwin.core.parseStr(d)
    },
    parseStr: function (b) {
        var a = "";
        a = b.split(" ").join("1");
        a = a.split("(").join("2");
        a = a.split(")").join("3");
        a = a.split(".").join("4");
        a = a.split("[").join("5");
        a = a.split("]").join("6");
        return a
    },
    init: function (d) {
        console.log("Inside Core INIT .");
        // var a=window.localStorage.getItem("callData");
        Playwin.core.loadAdsData({});
        Playwin.core.loadResultData({});
        AppNamespace.app.navigate("Home");
        //            AppNamespace.app.navigate("Home")
        //        var e=window.localStorage.getItem("lastPage");
        //        if(e&&e.split("/")[0]=="gamesList"){
        //            Playwin.core.loadResultData({
        //                navigateTo:e
        //            })
        //            }else{
        //            Playwin.core.loadResultData({});
        //            AppNamespace.app.navigate("Home")
        //            }
    },
    exit: function () { },
    loadAdsData: function (a) {
        if (a.viewModel) {
            a.viewModel.loadPanelVisible(true)
        }
        $.ajax({
            url: Playwin.config.urls.addMarketting,
            method: "GET",
            dataType: "JSON"
        }).done(function (b) {

            var e = b;
            b = null;
            if (!e) {
                return false
            }
            $.each(e, function (h, d) {
                if (d.type == "image") {
                    window.localStorage.setItem("image" + d.id + "url", d.imageUrl);
                    window.localStorage.setItem("image" + d.id + "rurl", d.redirectUrl)
                } else {
                    if (d.type == "text") {
                        window.localStorage.setItem("text" + d.id, JSON.stringify(d.text))
                    }
                }
                if (d.id == 6) {
                    str = d.text;
                    advsData = null;
                    return
                }
            });
            window.localStorage.setItem("advsMarketting", JSON.stringify(e));
            e = null;
            if (a.viewModel) {
                a.viewModel.loadPanelVisible(false)
            }
            if (a.navigateTo) {
                AppNamespace.app.navigate(a.navigateTo)
            }
        }).fail(function (b, g, d) {
            if (a.viewModel) {
                get
                a.viewModel.loadPanelVisible(false)
            }
            if (a.navigateTo) {
                AppNamespace.app.navigate(a.navigateTo)
            }
            console.log("Error : Unable get ads & marketting info.")
        })

    },
    loadResultData: function (a) {
        var d = [];
        var b = new $.Deferred();
        if (a.viewModel) {
            a.viewModel.loadPanelVisible(true)
        }
        Playwin.config = getConfigPlainObj();
        c = null;
        $.get(Playwin.config.urls.results).done(function (e) {
            $("#loadingDiv").hide();
            var f = $.xml2json(e);
            e = null;
            if (!f.GameResult) {
                DevExpress.ui.dialog.alert("Game Results Load Error .", "Error!");
                return false
            }
            d = f.GameResult.length == 0 ? [] : f.GameResult;
            f = null;
            $.each(d, function (g, i) {
                var h = {};

                $.each(Playwin.config.gameList, function (j, l) {
                    if (l.name == i.Game) {
                        Playwin.config.gameList[j].lastResult = {
                            Game: i.Game,
                            Result: i.Result,
                            ResultHtml: "",
                            DrawDate: Playwin.core.getFormatedDateTime(i.DrawDate, "ddd, dd-MMM-yyyy hh:mm TT"),
                            NextDrawDate: Playwin.core.getFormatedDateTime(i.NextDrawDate, "ddd, dd-MMM-yyyy hh:mm TT"),
                            NextDrawDateNF: i.NextDrawDate,
                            NextFirstPrize: i.NextFirstPrize,
                            RolldownAmount: i.RolldownAmount ? i.RolldownAmount : "",
                            isMoreBalls: false
                        };

                        var n = $.trim(i.Result);
                        var k = n.split(" ");
                        var m = 0;
                        $.each(k, function (o, p) {
                            if ($.trim(p) != "") {
                                m++;
                                if (m == 8) {
                                    Playwin.config.gameList[j].lastResult.isMoreBalls = true;
                                    Playwin.config.gameList[j].lastResult.ResultHtml = "<div  style='float:left;position:relative; padding:0px;'></div>"
                                }
                                if (m <= 7) {
                                    Playwin.config.gameList[j].lastResult.ResultHtml = Playwin.config.gameList[j].lastResult.ResultHtml + "<div " + (p != "TB" ? "class='resultBall'>" : "style='float:left;padding-top:5px;'>") + p + "</div>"
                                }
                            }
                        })
                    }
                })
            });
            window.localStorage.setItem("configObj", JSON.stringify(Playwin.config));
            d = null;
            Playwin.config = {
                urls: Playwin.config.urls
            };

            if (a.viewModel) {
                a.viewModel.loadPanelVisible(false)
            }
            if (a.navigateTo) {
                AppNamespace.app.navigate(a.navigateTo)
            }
        }).fail(function (g, f, e) {
            if (a.viewModel) {
                a.viewModel.loadPanelVisible(false)
            }
            if (a.navigateTo) {
                AppNamespace.app.navigate(a.navigateTo)
            }
            $("#loadingDiv").hide();
            // if(navigator.connection.type==0){
            //   DevExpress.ui.dialog.alert("No Internet connection.","Error!");
            // }else if(navigator.connection.type=='none'){
            //   DevExpress.ui.dialog.alert('No Internet connection.',"Error!");
            // }else{
            //   //Hurray I'm online
            // }
        })
    },
    getFormatedDateTime: function (e, a, o) {
        var b;
        if (o) {
            b = e
        } else {
            if (a == null || a == "") {
                a = "dddd, dd-MMM-yyyy hh:mm TT"
            }
            var f = e.split(" ");
            var d = f[0].split("/");
            var g = f[1].split(":");
            var b = new Date(d[2], d[1] - 1, d[0], g[0], g[1], g[2], 0);
            d = null;
            g = null
        }
        return ($.fullCalendar.formatDate(b, a))
    },
    registerUser: function (a) { },
    backKeyDown: function (a) {
        AppNamespace.app.navigate("#_back")
    },
    TimerPlugin: {
        Timer: [],
        TotalSeconds: [],
        State: "",
        createTimer: function (b, a) {
            //console.log("create timer called with >>> "+b+" ----------- "+a);
            Playwin.core.TimerPlugin.Timer.push(document.getElementById(b));
            Playwin.core.TimerPlugin.TotalSeconds.push(a)
        },
        Start: function () {

            if (Playwin.core.TimerPlugin.State != "Running") {
                Playwin.core.TimerPlugin.State = "Running";
                Playwin.core.TimerPlugin.Tick()
            }
        },
        Tick: function () {
            $.each(Playwin.core.TimerPlugin.TotalSeconds, function (b, a) {
                if (Playwin.core.TimerPlugin.TotalSeconds[b] <= 0) {
                    return true
                }
                Playwin.core.TimerPlugin.TotalSeconds[b] -= 1;
                Playwin.core.TimerPlugin.UpdateTimer(b)
            });
            if (Playwin.core.TimerPlugin.State == "Running") {
                window.setTimeout("Playwin.core.TimerPlugin.Tick()", 1000)
            }
        },
        UpdateTimer: function (m) {
            var e = Playwin.core.TimerPlugin.TotalSeconds[m];
            var d = Math.floor(e / 86400);
            e -= d * 86400;
            var b = Math.floor(e / 3600);
            e -= b * (3600);
            var f = Math.floor(e / 60);
            e -= f * (60);
            var a = ((d > 0) ? d + " days " : "") + Playwin.core.TimerPlugin.LeadingZero(b) + ":" + Playwin.core.TimerPlugin.LeadingZero(f) + ":" + Playwin.core.TimerPlugin.LeadingZero(e);
            Playwin.core.TimerPlugin.Timer[m].innerHTML = a
        },
        LeadingZero: function (a) {
            return (a < 10) ? "0" + a : +a
        }
    }
};

function orientationChange(b) {
    var a = "portrait";
    if (window.orientation == -90 || window.orientation == 90) {
        a = "landscape"
    }
    document.getElementById("status").innerHTML += a + "<br>"
}


function setData(c, d) {
    //alert(c);
    // alert(CryptoJS.enc.Latin1.parse(d));
    var x = CryptoJS.enc.Latin1.parse(d);
    x.sigBytes = x.sigBytes + x.words.length;
    window.localStorage.setItem(c, JSON.stringify(x));
    //alert("coded  "+window.localStorage.getItem(c));
    //alert(CryptoJS.enc.Latin1.stringify(window.localStorage.getItem(c)));

}

function getData(c) {
    //window.localStorage.getItem(c);
    //alert(window.localStorage.getItem(c).toSource());
    //alert(window.localStorage.getItem(c));
    //alert(CryptoJS.enc.Latin1.stringify(window.localStorage.getItem(c)));
    if (!window.localStorage.getItem(c) || window.localStorage.getItem(c) == "") {
        return null;
    } else {
        var x = JSON.parse(window.localStorage.getItem(c));
        x.sigBytes = x.sigBytes - x.words.length;
        return CryptoJS.enc.Latin1.stringify(x);
    }
}

function getMobileType() {
    isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/IE/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    return isMobile;
}

function getConfigPlainObj() {
    var a;
    var e = {
        urls: {
            gameDetails: "https://www.myplaywin.com/MobileApp/PlaywinDrawXML.aspx?GameID=0",
            betPlacement: "https://www.myplaywin.com/MobileAppBetPlaceLotto.aspx",
            registration: "https://www.myplaywin.com/MobileApp/UserAppRegistration.aspx",
            results: "https://www.myplaywin.com/MobileApp/AppResultXML.aspx",
            checkBalance: "https://www.myplaywin.com/MobileApp/MyplaywinCardBalance.aspx",
            winnersList: "https://www.myplaywin.com/MobileApp/PlaywinWinner.aspx",
            addMarketting: "https://www.myplaywin.com/MobileApp/mobileappbanner.aspx",
            faqList: "https://www.myplaywin.com/MobileApp/MobileAppFaq.aspx"
        },
        ItzNumber: "000000",
        ItzPassword: "00000",
        kenoSpots: [{
            id: "02",
            spot: "2"
        }, {
            id: "03",
            spot: "3"
        }, {
            id: "04",
            spot: "4"
        }, {
            id: "05",
            spot: "5"
        }, {
            id: "06",
            spot: "6"
        }, {
            id: "07",
            spot: "7"
        }, {
            id: "08",
            spot: "8"
        }, {
            id: "09",
            spot: "9"
        }, {
            id: "10",
            spot: "10"
        }],
        kenoAmtOpts: [{
            id: "01",
            amt: "10"
        }, {
            id: "02",
            amt: "20"
        }, {
            id: "03",
            amt: "30"
        }, {
            id: "04",
            amt: "40"
        }, {
            id: "05",
            amt: "50"
        }, {
            id: "06",
            amt: "60"
        }, {
            id: "07",
            amt: "70"
        }, {
            id: "08",
            amt: "80"
        }, {
            id: "09",
            amt: "90"
        }, {
            id: "10",
            amt: "100"
        }],
        gameList: [{
            id: "2",
            type: "daily",
            nos: 6,
            name: "Thunder Ball",
            amt: "1.20 cr",
            lastResult: {}
        }, {
            id: "11",
            type: "daily",
            nos: 5,
            name: "Jaldi Five Double Lotto",
            amt: "10 lack",
            lastResult: {}
        }, {
            id: "1",
            type: "daily",
            nos: 6,
            name: "Thursday Super Lotto",
            amt: "3.36 cr",
            lastResult: {}
        }, {
            id: "5",
            type: "daily",
            nos: 5,
            name: "Jaldi Five Lotto",
            amt: "5 lack",
            lastResult: {}
        }, {
            id: "4",
            type: "daily",
            nos: 6,
            name: "Saturday Super Lotto",
            amt: "2.09 cr",
            lastResult: {}
        }, {
            id: "9",
            type: "weekly",
            nos: 0,
            name: "Keno",
            amt: "",
            lastResult: {}
        }, {
            id: "3",
            type: "weekly",
            nos: 5,
            name: "Fast Digit Lottery",
            amt: "4.35 lack",
            lastResult: {}
        }],
        gameDetails: {
            g1: {
                id: "1",
                ticketPrice: 10,
                type: "daily",
                nos: 6,
                name: "Thursday Super Lotto",
                amt: "3.36 cr",
                noOption: {
                    min: 1,
                    max: 49
                },
                ballGroups: {
                    grp1: {
                        allow_duplicate: "no",
                        show_in_balls: "yes",
                        limit: {
                            min: 1,
                            max: 49
                        },
                        balls: {
                            b1: "1",
                            b2: "2",
                            b3: "3",
                            b4: "4",
                            b5: "5",
                            b6: "6"
                        }
                    }
                },
                draws: [],
                weekDays: [4]
            },
            g2: {
                id: "2",
                ticketPrice: 10,
                type: "daily",
                nos: 6,
                name: "Thunderball",
                amt: "1.20 cr",
                tbNoOption: {
                    min: 1,
                    max: 15
                },
                ballGroups: {
                    grp1: {
                        allow_duplicate: "no",
                        show_in_balls: "yes",
                        limit: {
                            min: 1,
                            max: 42
                        },
                        balls: {
                            b1: "1",
                            b2: "2",
                            b3: "3",
                            b4: "4",
                            b5: "5"
                        }
                    },
                    grp2: {
                        allow_duplicate: "no",
                        show_in_balls: "yes",
                        limit: {
                            min: 1,
                            max: 15
                        },
                        balls: {
                            b6: "6"
                        }
                    }
                },
                draws: [],
                weekDays: [2]
            },
            g3: {
                id: "3",
                ticketPrice: 10,
                type: "weekly",
                nos: 5,
                name: "Fast Digit Lottery",
                amt: "4.35 lack",
                ballGroups: {
                    grp1: {
                        allow_duplicate: "no",
                        show_in_balls: "yes",
                        limit: {
                            min: 1,
                            max: 31
                        },
                        balls: {
                            b1: "1",
                            b2: "2",
                            b3: "3",
                            b4: "4",
                            b5: "5"
                        }
                    }
                },
                draws: [],
                weekDays: [1, 2, 3, 4, 5, 6, 7]
            },
            g4: {
                id: "4",
                ticketPrice: 10,
                type: "daily",
                nos: 6,
                name: "Saturday Super Lotto",
                amt: "2.09 cr",
                ballGroups: {
                    grp1: {
                        allow_duplicate: "no",
                        show_in_balls: "yes",
                        limit: {
                            min: 1,
                            max: 49
                        },
                        balls: {
                            b1: "1",
                            b2: "2",
                            b3: "3",
                            b4: "4",
                            b5: "5",
                            b6: "6"
                        }
                    }
                },
                draws: [],
                weekDays: [6]
            },
            g5: {
                id: "5",
                ticketPrice: 10,
                type: "daily",
                nos: 5,
                name: "Jaldi Five Lotto",
                amt: "5 lack",
                ballGroups: {
                    grp1: {
                        allow_duplicate: "no",
                        show_in_balls: "yes",
                        limit: {
                            min: 1,
                            max: 36
                        },
                        balls: {
                            b1: "1",
                            b2: "2",
                            b3: "3",
                            b4: "4",
                            b5: "5"
                        }
                    }
                },
                draws: [],
                weekDays: [5]
            },
            g9: {
                id: "9",
                type: "weekly",
                nos: 0,
                name: "Keno",
                amt: "",
                ballGroups: {
                    noOfSpot: {
                        allow_duplicate: "no",
                        show_in_balls: "no",
                        limit: {
                            min: 2,
                            max: 10
                        },
                        balls: {
                            b1: 1
                        }
                    },
                    spotVal: {
                        allow_duplicate: "no",
                        show_in_balls: "yes",
                        limit: {
                            min: 1,
                            max: 80
                        },
                        balls: {}
                    },
                    noOfBet: {
                        allow_duplicate: "no",
                        show_in_balls: "no",
                        limit: {
                            min: 1,
                            max: 10
                        },
                        balls: {}
                    }
                },
                prizeStructure: {
                    s2: {
                        m2: 14
                    },
                    s3: {
                        m2: 4,
                        m3: 20
                    },
                    s4: {
                        m2: 2,
                        m3: 5,
                        m4: 60
                    },
                    s5: {
                        m3: 3,
                        m4: 25,
                        m5: 450
                    },
                    s6: {
                        m3: 2,
                        m4: 9,
                        m5: 80,
                        m6: 500
                    },
                    s7: {
                        m3: 2,
                        m4: 3,
                        m5: 15,
                        m6: 130,
                        m7: 4000
                    },
                    s8: {
                        m4: 2,
                        m5: 10,
                        m6: 100,
                        m7: 496.5,
                        m8: 35000
                    },
                    s9: {
                        m4: 2,
                        m5: 5,
                        m6: 25,
                        m7: 110,
                        m8: 5500,
                        m9: 75000
                    },
                    s10: {
                        m4: 1,
                        m5: 3,
                        m6: 12,
                        m7: 100,
                        m8: 1000,
                        m9: 8000,
                        m10: 210000
                    }
                },
                draws: [],
                weekDays: [1, 7]
            },
            g11: {
                id: "11",
                type: "daily",
                nos: 5,
                name: "Jaldi Five Double Lotto",
                amt: "10 lack",
                ballGroups: {
                    grp1: {
                        allow_duplicate: "no",
                        show_in_balls: "yes",
                        limit: {
                            min: 1,
                            max: 36
                        },
                        balls: {
                            b1: "1",
                            b2: "2",
                            b3: "3",
                            b4: "4",
                            b5: "5"
                        }
                    }
                },
                draws: [],
                weekDays: [3]
            }
        }
    };

    window.localStorage.setItem("configObj", JSON.stringify(e));
    return e
}
var Playwin = (typeof Playwin !== undefined) ? Playwin : {};

Playwin.config = getConfigPlainObj();
var Playwin = (typeof Playwin !== undefined) ? Playwin : {};

Playwin.play = {
    selectedGame: 0,
    playGameResponse: {
        error: "",
        tickets: []
    },
    toast: {
        successMsg: "Success",
        errorMsg: "Some Error Occurred !",
        showInfo: function () {
            var a = $("#toast-info").data("dxToast");
            a.show()
        },
        showError: function () {
            var a = $("#toast-error").data("dxToast");
            a.show()
        },
        showSuccess: function () {
            var a = $("#toast-success").data("dxToast");
            a.show()
        },
        showWarning: function () {
            var a = $("#toast-warning").data("dxToast");
            a.show()
        },
        showCustom: function () {
            var a = $("#toast-custom").data("dxToast");
            a.show()
        }
    },
    calculateTotalBetAmount: function () {
        var a = 0;
        $(".ticket_amt").each(function () {
            a = a + parseInt(this.value * 13)
        });
        a = a * parseInt($("#no_draw").val() == "" ? 1 : $("#no_draw").val());
        $("#sum_amt").val(a);
        $("#sum_amt_text").html(a);
        return a
    },
    defaultWheelPreset: {
        preset: "mypreset",
        width: 5,
        theme: "default",
        mode: "scroller",
        lang: "",
        display: "bottom",
        animate: "swing",
        height: 30,
        onClose: function (b, g, a) { },
        onCancel: function (b, a) {
            var g = "";
            g = "#row_lb_1"
        },
        onSelect: function (f, d) {
            var u = d.getValue();
            var g = u.slice(0);
            if (Playwin.play.selectedGame == 2) {
                g.pop()
            }
            g = g.sort();
            var j = false, a = [];
            for (var b = 0; b < g.length - 1; b++) {
                if (g[b] != 0 && g[b + 1] == g[b]) {
                    j = true;
                    break
                }
            }
            if (j) {
                var h = DevExpress.ui.dialog.alert("Please select UNIQUE Ticket Values .", "Error!");
                h.done(function (i) {
                    d.show();
                    return false
                })
            } else {
                var e = "";
                var k = [];
                $.each(u, function (l, i) {
                    k.push(i == 0 ? "LP" : i)
                });
                viewPlayGameModel.gameBalls(k)
            }
        }
    },
    go: function (i) {
        var b = $("#cardNo").val();
        var a = $("#pinNo").val();
        if (i != 9) {
            if ($("#all_draws").val() == "" && $("#no_draw").val() == "") {
                DevExpress.ui.dialog.alert("Please select a Draw OR no of draw !", "Error");
                return false
            }
        }
        var d = 0;
        $(".ticket_amt").each(function () {
            d = d + parseInt(this.value * 10)
        });
        if (!b || $.trim(b) == "") {
            DevExpress.ui.dialog.alert("Card Number can not be empty !", "Error");
            return false
        } else {
            if (!a || $.trim(a) == "") {
                DevExpress.ui.dialog.alert("Card Pin can not be empty .", "Error");
                return false
            } else {
                if ($("#all_draws").val() == "" && $("#no_draw").val() == "") {
                    DevExpress.ui.dialog.alert("Please select 'Draw' OR 'No Of Draw' .", "Error");
                    return false
                } else {
                    if ($("tbody#draws_table tr").length == 0) {
                        DevExpress.ui.dialog.alert("Please add at least one ticket !", "Ticket Error!");
                        return false
                    }
                }
            }
        }
        $.ajax({
            url: Playwin.config.urls.checkBalance,
            method: "GET",
            data: "accountno=" + $.trim(b) + "&password=" + $.trim(a),
            success: function (h) {
                var f = $.xml2json(h);
                if (f.Error || (f.Code && (f.Code == -1 || f.Code == 99))) {
                    DevExpress.ui.dialog.alert(f.Error, "Invalid Card Error")
                } else {
                    if (!f.RemainingAmount) {
                        DevExpress.ui.dialog.alert("Some error occurred when getting card balance. ", "Card Read Error!")
                    } else {
                        if (f.RemainingAmount < parseInt($("#sum_amt").val())) {
                            DevExpress.ui.dialog.alert("Insufficient balance to place this bet. <br/>( Balance = Rs." + f.RemainingAmount + " ) ", "Low Balance!")
                        } else {
                            var e = $("#sum_amt").val();
                            var g = DevExpress.ui.dialog.confirm(" Total Amount Rs. " + e + " will be deducted from your card. Click on Yes to place the bet.", "Your Card Balance is " + f.RemainingAmount + ".");
                            g.done(function (n) {
                                if (!n) {
                                    return false
                                } else {
                                    var m = "";
                                    var k = "";
                                    var u = [];
                                    $(".ticket").each(function () {
                                        u.push(this.value)
                                    });
                                    k = u.join("|");
                                    m = "ItzNumber=" + $("#cardNo").val() + "&ItzPassword=" + $("#pinNo").val() + "&BetString=" + k + "&GameID=" + Playwin.play.selectedGame + "&Draw=" + Playwin.play.selectedGame;
                                    if (Playwin.play.selectedGame != 9) {
                                        var l, j;
                                        if ($("#all_draws").val() != "" && $("#all_draws").val() == 0) {
                                            l = 1;
                                            if ($("#no_draw").val() == "") {
                                                j = 1
                                            } else {
                                                j = $("#no_draw").val()
                                            }
                                        } else {
                                            if ($("#all_draws").val() != "") {
                                                l = $("#all_draws").val();
                                                j = 1
                                            } else {
                                                if ($("#all_draws").val() == "") {
                                                    l = 1;
                                                    j = $("#no_draw").val()
                                                }
                                            }
                                        }
                                        m = m + "&DrawPointer=" + l + "&TotalDraw=" + j + "&mobileno=" + getData("mobile") + "&sale_amount=" + $("#sum_amt").val()
                                    }

                                    if (Playwin.play.selectedGame == 9) {
                                        var l, j;
                                        if ($("#all_draws").val() != "" && $("#all_draws").val() == 0) {
                                            l = 1;
                                            if ($("#no_draw").val() == "") {
                                                j = 1
                                            } else {
                                                j = $("#no_draw").val()
                                            }
                                        } else {
                                            if ($("#all_draws").val() != "") {
                                                l = $("#all_draws").val();
                                                j = 1
                                            } else {
                                                if ($("#all_draws").val() == "") {
                                                    l = 1;
                                                    j = $("#no_draw").val()
                                                }
                                            }
                                        }
                                        m = m + "&DrawPointer=" + l + "&TotalDraw=" + j + "&sale_amount=" + $("#sum_amt").val()
                                    }


                                    $.ajax({
                                        url: Playwin.config.urls.betPlacement,
                                        method: "POST",
                                        data: m,
                                        success: function (q) {
                                            var s = "";
                                            var p = $.xml2json(q);
                                            var r = {
                                                errors: "",
                                                CardBalance: "",
                                                tickets: []
                                            };
                                            //alert(JSON.stringify(p));
                                            var B = false;
                                            var o = 0;
                                            if (p.Status != 0) {
                                                s = s + " Error : " + p.StatusText;
                                                B = true
                                            } else {
                                                if (p.Status == "0" && p.StatusText == "SUCCESS") {
                                                    var t = false;
                                                    r.CardBalance = p.CardBalance;
                                                    if (p.Ticket instanceof Array) {
                                                        $.each(p.Ticket, function (z, y) {
                                                            var v = {
                                                                err: false,
                                                                errMsg: "",
                                                                details: y
                                                            };

                                                            if (y.Status && y.StatusText) {
                                                                if (y.Status == "0" && y.StatusText == "SUCCESS") {
                                                                    o++;
                                                                    v.err = false;
                                                                    v.details = y
                                                                } else {
                                                                    s = s + "Error : " + y.StatusText + "||";
                                                                    v.err = true;
                                                                    v.errMsg = y.StatusText
                                                                }
                                                            } else {
                                                                v.err = true;
                                                                v.errMsg = y.StatusText;
                                                                s = s + "Error : " + y.StatusText + "||"
                                                            }
                                                            r.tickets.push(v)
                                                        })
                                                    } else {
                                                        var w = p.Ticket;
                                                        var x = {
                                                            err: false,
                                                            errMsg: "",
                                                            details: w
                                                        };

                                                        if (w.Status && w.StatusText) {
                                                            if (w.Status == "0" && w.StatusText == "SUCCESS") {
                                                                o++;
                                                                x.err = false
                                                            } else {
                                                                s = s + "Error : " + w.StatusText;
                                                                x.err = true;
                                                                x.errMsg = w.StatusText
                                                            }
                                                        } else {
                                                            s = s + "Error : " + w.StatusText + "";
                                                            x.err = true;
                                                            x.errMsg = w.StatusText
                                                        }
                                                        r.tickets.push(x)
                                                    }
                                                }
                                            }
                                            Playwin.play.playGameResponse = r;
                                            r = null;
                                            if (o > 0) {
                                                window.localStorage.setItem("cardNo", $.trim(b));
                                                window.plugins.OneSignal.sendTags({ cardNo: $.trim(b), mobile: window.localStorage.getItem('mobileNumber'), name: window.localStorage.getItem('playername') });
                                                AppNamespace.app.navigate("playGameSuccess/" + Playwin.play.selectedGame)
                                            } else {
                                                DevExpress.ui.dialog.alert(s, "Error")
                                            }
                                        },
                                        complete: function (o) { }
                                    })
                                }
                            })
                        }
                    }
                }
            }
        }).fail(function () {
            DevExpress.ui.dialog.alert("Error : Unable get card balance .", "Error!")
        })
    },
    jsonDetails: {
        currJackpot: {
            id: "",
            name: "",
            amt: "",
            displayName: ""
        },
        draw: {
            id: "",
            name: ""
        },
        nextDraw: "",
        noOfDraw: "",
        ticketPrice: 0,
        totalTicketPrice: 0,
        tickets: []
    },
    init: function (a) { },
    loadData: function (default_game) {
        Playwin.play.selectedGame = default_game;
        var no_draw = 7;
        var game_details = eval("Playwin.config.gameDetails.g" + Playwin.play.selectedGame);
        $("#c_draw").html(game_details.name + "( " + game_details.amt + " )");
        $("#c_draw_name").html(game_details.name);
        Playwin.play.jsonDetails.currJackpot.id = Playwin.play.selectedGame;
        Playwin.play.jsonDetails.currJackpot.name = game_details.name;
        Playwin.play.jsonDetails.currJackpot.amt = game_details.amt;
        Playwin.play.jsonDetails.currJackpot.displayName = game_details.name + "( " + game_details.amt + " )";
        if (Playwin.play.selectedGame == "9") {
            Playwin.play.jsonDetails.ticketPrice = 0;
            $("#new_row_id").val(2)
        } else {
            Playwin.play.jsonDetails.ticketPrice = game_details.ticketPrice;
            $("#new_row_id").val(1)
        }
        if (Playwin.play.selectedGame == "9") {
            var no_spot_min = 2;
            var no_spot_max = 10;
            var amt_min = 10;
            var amt_max = 100;
            $(document).on("change", "#amt_option", function () {
                $(".spot_option").removeClass("selected");
                $("#spotli_" + spot_val).addClass("selected");
                $(".spot_option").addClass("not_selected");
                $("#spotli_" + spot_val).removeClass("not_selected");
                var tblStr = "<table><thead><td>Match</td><td>Prize</td></thead><tbody id='prize_structure'></tbody></table>";
                $("#prize_amt_div").html(tblStr);
                tblBody = "";
                var matchPrz = Playwin.play.getPrizeStructure($("#spot_option").val(), $("#amt_option").val());
                $.each(matchPrz, function (i, val) {
                    tblBody = tblBody + "<tr><td>" + val.match + "</td><td>" + val.prize + "</td></tr>"
                });
                $("#prize_structure").html(tblBody)
            })
        } else { }
    },
    getPrizeStructure: function (spot, amt) {
        spot = parseInt(spot);
        amt = parseInt(amt);
        var structure = [];
        if (!(spot == "" || amt == "")) {
            var ps = eval("Playwin.config.gameDetails.g9.prizeStructure.s" + spot);
            $.each(ps, function (i, val) {
                var temp = {
                    match: "",
                    prize: ""
                };

                temp.match = i.split("m")[1];
                temp.prize = val * amt * 10;
                temp.prize = temp.prize >= 6000000 ? 6000000 : temp.prize;
                structure.push(temp)
            })
        }
        return structure
    },
    removeTicket: function (b) {
        $("#row_" + b).remove();
        $.each($(".tckt_no"), function (d, e) {
            $("#" + this.id).html(d + 1)
        });
        var a = 0;
        $(".ticket_amt").each(function () {
            a = a + parseInt(this.value) * 10
        });
        $("#sum_amt").val(a);
        $("#sum_amt_text").html(a);
        return false
    },
    addTicketRow: function (i, b) {
        var a = [];
        var d = false;
        a = Playwin.play.getGameWheels(i, d, "all");
        $("#ticket_" + b).scroller("destroy").scroller($.extend({
            wheels: a
        }, Playwin.play.defaultWheelPreset))
    },
    setOverLayResults: function (a, g) {
        g.overLayResults([]);
        var b = new $.Deferred();
        g.loadPanelMsg("Loading...");
        g.loadPanelVisible(true);
        $.get(Playwin.config.urls.results + "?gameid=" + a.id + "&count=" + g.resultCount() + "&mobileno=" + getData("mobile")).done(function (d) {
            g.loadPanelVisible(false);
            g.loadPanelMsg("Loading...");
            var e = $.xml2json(d);
            d = null;
            var j = (!e.GameResult) || (e.GameResult.length == 0) ? [] : e.GameResult;
            if (j.Game) {
                j = [j]
            }
            var f = $.map(j, function (k) {
                var h = $.trim(k.Result);
                var i = h.split(" ");
                var o = "";
                $.each(i, function (l, m) {
                    if ($.trim(m) != "") {
                        o = o + "<div " + (m != "TB" ? "class='resultBall'>" : "style='float:left;padding-top:5px;'>") + m + "</div>"
                    }
                });
                return {
                    Game: k.Game,
                    Result: k.Result,
                    DrawID: k.DrawID,
                    ResultHtml: o,
                    DrawDate: Playwin.core.getFormatedDateTime(k.DrawDate, "dddd, dd-MMM-yyyy hh:mm TT"),
                    NextDrawDate: Playwin.core.getFormatedDateTime(k.NextDrawDate, "dddd, dd-MMM-yyyy hh:mm TT"),
                    NextFirstPrize: k.NextFirstPrize
                }
            });
            b.resolve(f);
            g.overLayResults(f);
            g.resultTitle(a.name);
            g.overlayVisible(true)
        }).fail(function () {
            g.loadPanelVisible(false);
            g.loadPanelMsg("Loading...");
            DevExpress.ui.dialog.alert("Error : Unable get results info.", "Error!")
        })
    },
    validateTicketsOld: function (gid) {
        if ($(".ticket").length <= 1) {
            return {
                status: false,
                msg: "Please Enter at least one ticket !"
            }
        }
        var tickets = [];
        var rows = [];
        var duplicate;
        var noInRange;
        var dup_rows;
        dup_rows = [];
        var gd = eval("Playwin.config.gameDetails.g" + gid);
        var notinrange_rows;
        notinrange_rows = [];
        var ret = {
            status: true,
            dup_rows: [],
            notinrange_rows: []
        };

        $.each($("input[name='row_id[]']"), function () {
            rows.push($(this).val())
        });
        $.each(rows, function (i, val) {
            var ticketData = $("input.lb" + val).map(function () {
                return this.value
            }).toArray();
            var ticketDet = {
                lp_flag: $("#lp_row_" + val).prop("checked"),
                values: ticketData
            };

            tickets.push(ticketDet);
            $.each(gd.ballGroups, function (n, gdet) {
                var list_of_values = $("input." + n + (val)).map(function () {
                    return this.value
                }).toArray();
                duplicate = false;
                noInRange = true;
                if (!$("#row_lb_" + val).prop("checked") && Playwin.play.selectedGame != "9") {
                    $.each(list_of_values, function (j, x) {
                        noInRange = parseInt(x) >= gdet.limit.min && parseInt(x) <= gdet.limit.max;
                        duplicate = list_of_values.indexOf(x) !== list_of_values.lastIndexOf(x);
                        if (duplicate) {
                            dup_rows.push("r" + (i + 1) + n);
                            return false
                        } else {
                            if (!noInRange) {
                                notinrange_rows.push("r" + (i + 1) + n);
                                return false
                            }
                        }
                    })
                }
            })
        });
        ret.tickets = tickets;
        if (dup_rows.length > 0 || notinrange_rows.length > 0) {
            ret.status = false;
            ret.dup_rows = dup_rows;
            ret.notinrange_rows = notinrange_rows
        }
        return ret
    },
    validateTickets: function (gid) {
        if ($(".ticket").length < 1) {
            return {
                status: false,
                msg: "Please Enter at least one ticket !"
            }
        }
        var tickets = [];
        var rows = [];
        var duplicate;
        var noInRange;
        var dup_rows;
        dup_rows = [];
        var gd = eval("Playwin.config.gameDetails.g" + gid);
        var notinrange_rows;
        notinrange_rows = [];
        var ret = {
            status: true,
            dup_rows: []
        };

        var tn = 1;
        $.each($(".ticket"), function () {
            var id = $(this).attr("id");
            var arr = id.split("_");
            var ticketDet = {
                lp_flag: $("#row_lb_" + arr[1]).prop("checked"),
                values: $(this).mobiscroll("getInst").getValue(),
                groups: {}
            };

            var i = 0;
            $.each(gd.ballGroups, function (n, gdet) {
                ticketDet.groups[n] = {};

                ticketDet.groups[n]["values"] = [];
                ticketDet.groups[n]["dupls"] = false;
                $.each(gdet.balls, function (m, bdet) {
                    ticketDet.groups[n]["values"].push(ticketDet.values[i]);
                    if (gdet.allow_duplicate == "no" && !$("#row_lb_" + arr[1]).prop("checked")) {
                        ticketDet.groups[n]["dupls"] = ticketDet.groups[n]["dupls"] ? ticketDet.groups[n]["dupls"] : ticketDet.groups[n]["values"].indexOf(ticketDet.values[i]) != ticketDet.groups[n]["values"].lastIndexOf(ticketDet.values[i]);
                        ret.status = ret.status ? !ticketDet.groups[n]["dupls"] : ret.status;
                        if (!ret.status && $.inArray(tn, ret.dup_rows) == -1) {
                            ret.dup_rows.push(tn)
                        }
                    }
                    i++
                })
            });
            tickets.push(ticketDet);
            tn++
        });
        ret.tickets = tickets;
        return ret
    },
    validateKenoRow: function (gid) {
        if ($("#ticket_1").length < 1) {
            return {
                status: false,
                msg: "Please select no of spot !"
            }
        }
        var tickets = [];
        var rows = [];
        var duplicate;
        var noInRange;
        var dup_rows;
        dup_rows = [];
        var gd = eval("Playwin.config.gameDetails.g" + gid);
        var notinrange_rows;
        notinrange_rows = [];
        var ret = {
            status: true,
            dup_rows: []
        };

        var tn = 1;
        $.each($("#ticket_1"), function () {
            var id = $(this).attr("id");
            var arr = id.split("_");
            var ticketDet = {
                lp_flag: $("#row_lb_" + arr[1]).prop("checked"),
                values: $(this).mobiscroll("getInst").getValue(),
                groups: {}
            };

            var i = 0;
            $.each(gd.ballGroups, function (n, gdet) {
                ticketDet.groups[n] = {};

                ticketDet.groups[n]["values"] = [];
                ticketDet.groups[n]["dupls"] = false;
                $.each(gdet.balls, function (m, bdet) {
                    ticketDet.groups[n]["values"].push(ticketDet.values[i]);
                    if (gdet.allow_duplicate == "no" && !$("#row_lb_" + arr[1]).prop("checked")) {
                        ticketDet.groups[n]["dupls"] = ticketDet.groups[n]["dupls"] ? ticketDet.groups[n]["dupls"] : ticketDet.groups[n]["values"].indexOf(ticketDet.values[i]) != ticketDet.groups[n]["values"].lastIndexOf(ticketDet.values[i]);
                        ret.status = ret.status ? !ticketDet.groups[n]["dupls"] : ret.status;
                        if (!ret.status && $.inArray(tn, ret.dup_rows) == -1) {
                            ret.dup_rows.push(tn)
                        }
                    }
                    i++
                })
            });
            tickets.push(ticketDet);
            tn++
        });
        ret.tickets = tickets;
        return ret
    },
    getGameWheels: function (gid, lp, grpName) {
        var gameDetails = eval("Playwin.config.gameDetails.g" + gid);
        var gameGroups = gameDetails.ballGroups;
        var whls = [];
        $.each(gameGroups, function (n, gd) {
            if ((grpName != "all" && grpName != n)) {
                return
            }
            if (gd.show_in_balls == "yes") {
                $.each(gd.balls, function (m, bd) {
                    var wi = [];
                    wi[0] = {
                        label: "",
                        keys: [],
                        values: []
                    };

                    if (lp) {
                        wi[0].keys.push("0");
                        wi[0].values.push("LP")
                    } else {
                        for (var i = gd.limit.min; i <= gd.limit.max; i++) {
                            var x = "";
                            x = i < 10 ? "0" + i : i + "";
                            wi[0].keys.push(x);
                            wi[0].values.push(x)
                        }
                    }
                    whls.push(wi)
                })
            }
        });
        return whls
    }
};

var Playwin = (typeof Playwin !== undefined) ? Playwin : {};

Playwin.submitCard = {
    ticketsJson: Playwin.play.jsonDetails,
    init: function () {
        var a = "";
        $.each(Playwin.submitCard.ticketsJson.tickets, function (e, b) {
            a = a + "<tr id='row_" + (e + 1) + "'>";
            a = a + "<td style='width:80px;' align='left'><strong>Tickets " + (e + 1) + "</strong></td>";
            $.each(b.values, function (h, d) {
                a = a + "<td style='width:30px;' align='center'><label id='lbtp" + (e + 1) + "t" + (h + 1) + "'   class='lottotbox lbc" + (e + 1) + "' >" + d + "</label></td>"
            });
            a = a + "</tr>"
        });
        $("#tickets_table").append(a);
        $(document).on("click", "#submit_card", function () {
            var k = $("#cardNo").val();
            var f = $("#pinNo").val();
            if (!k || $.trim(k) == "") {
                alert("Card Number can not be empty .");
                return false
            } else {
                if (!f || $.trim(f) == "") {
                    alert("Card Pin can not be empty .");
                    return false
                } else {
                    if (!confirm("Amount of Rs. " + Playwin.play.jsonDetails.totalTicketPrice + " will be deducted from your card balance. Do you want to continue ?")) {
                        return false
                    }
                }
            }
            var d = "";
            var b = "";
            var e = [];
            $.each(Playwin.submitCard.ticketsJson.tickets, function (g, h) {
                e.push(h.values.map(function (i) {
                    return i
                }))
            });
            b = e.join("|");
            d = "ItzNumber=" + $("#cardNo").val() + "&ItzPassword=" + $("#pinNo").val() + "&BetString=" + b + "&GameID=" + Playwin.submitCard.ticketsJson.currJackpot.id + "&DrawPointer=" + Playwin.submitCard.ticketsJson.draw.id + "&TotalDraw=" + Playwin.submitCard.ticketsJson.noOfDraw;
            $.ajax({
                url: Playwin.config.urls.betPlacement,
                method: "POST",
                data: d,
                success: function (g) {
                    var h = $.xml2json(g);
                    if (h.Status == "-1") {
                        alert(h.StatusText)
                    } else {
                        if (h.Status == "0") {
                            if (h.Ticket.Status == "35") {
                                alert(h.Ticket.StatusText)
                            } else { }
                        }
                    }
                },
                complete: function (g) { }
            })
        })
    },
    loadData: function (a) { }
};

$(function () { });
