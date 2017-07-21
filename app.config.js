/*
window.AppNamespace = $.extend(true, window.KitchenSink, {
    "config": {
        "defaultLayout": "slideout",
        "navigation": [{
            "title": "About Playwin",
            "action": "#aboutUs",
            "icon": "about"
        }, {
            "title": "Lotto Games",
            "action": "#gamesList/play/daily",
            "icon": "lotto"
        }, {
            "title": "Weekly Games",
            "action": "#gamesList/play/weekly",
            "icon": "lotto"
        }, {
            "title": "Results",
            "action": "#gamesList/results/daily",
            "icon": "result"
        }, {
            "title": "MyPlaywin.Com Card",
            "action": "#settings",
            "icon": "friend"
        }, {
            "title": "FAQ's",
            "action": "#faq",
            "icon": "faq"
        }, ]
    }
});
*/

window.AppNamespace = $.extend(true, window.KitchenSink, {
  "config": {
    "defaultLayout": "slideout",
    "navigation": [{
                      "title": "About Playwin",
                      "action": "#aboutUs",
                      "icon": "menu1"
                    },
                    {
                      "title": "Winner's Club",
                      "action": "#winnersYearList",
                      "icon": "menu2"
                    },
                    {
                      "title": "How to claim",
                      "action": "#ifYouWin",
                      "icon": "menu3"
                    },
                    {
                      "title": "Lotto Games",
                      "action": "#gamesList/play/daily",
                      "icon": "menu4"
                    },
                    {
                      "title": "Weekly Games",
                      "action": "#gamesList/play/weekly",
                      "icon": "menu5"
                    },
                    {
                      "title": "Results",
                      "action": "#gamesList/results/daily",
                      "icon": "menu6"
                    },
                    {
                      "title": "Help",
                      "action": "#settings",
                      "icon": "menu7"
                    }
                  ]
    }
});
