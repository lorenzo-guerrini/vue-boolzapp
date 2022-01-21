let vue = new Vue({
    el: "#app",
    data: {
        user: {
            name: "Lorenzo",
            avatar: "_user"
        },
        contacts: [
            {
                name: "Katy Perry",
                avatar: "_0",
                visible: true, //Archiviato?
                messages: [
                    {
                        date: "23/12/2021 21:37:23",
                        text: "It's over.",
                        status: "sent"
                    },
                    {
                        date: "23/12/2021 21:38:41",
                        text: "Just because it's over",
                        status: "received",
                        read: false
                    },
                    {
                        date: "23/12/2021 21:39:41",
                        text: "Doesn't mean it's really over",
                        status: "received",
                        read: false
                    }
                ],
            },
            {
                name: "Dua Lipa",
                avatar: "_1",
                visible: true, //Archiviato?
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "How are you?",
                        status: "sent"
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Don't show up",
                        status: "received",
                        read: false
                    },
                    {
                        date: "10/01/2020 15:51:00",
                        text: "Don't come out",
                        status: "received",
                        read: false
                    },
                    {
                        date: "10/01/2020 15:52:00",
                        text: "Don't start caring about me now",
                        status: "received",
                        read: false
                    }
                ],
            },
            {
                name: "Lana Del Rey",
                avatar: "_2",
                visible: true,
                messages: [
                    {
                        date: "20/03/2020 16:30:00",
                        text: "I got that summertime, summertime sadness",
                        status: "received",
                        read: true
                    },
                    {
                        date: "10/01/2020 15:32:54",
                        text: "I'm sorry...",
                        status: "sent"
                    },
                    {
                        date: "20/03/2020 16:35:00",
                        text: "Su-su-summertime, summertime sadness",
                        status: "received",
                        read: true
                    },
                    {
                        date: "20/03/2020 16:36:00",
                        text: "Got that summertime, summertime sadness",
                        status: "received",
                        read: true
                    },
                    {
                        date: "10/01/2020 15:38:54",
                        text: "Is everything ok?",
                        status: "sent"
                    },
                    {
                        date: "20/03/2020 16:39:00",
                        text: "Oh, oh-oh, oh-oh",
                        status: "received",
                        read: false
                    },
                    
                ],
            },
            {
                name: "Pizzeria",
                avatar: "_3",
                visible: true,
                messages: [
                    {
                        date: "28/03/2020 10:10:40",
                        text: "Vorrei ordinare due pizze",
                        status: "sent"
                    },
                    {
                        date: "28/03/2020 10:25:10",
                        text: "Certo, quali?",
                        status: "received",
                        read: true
                    },
                    {
                        date: "28/03/2020 10:27:10",
                        text: "Una marinara e una margherita",
                        status: "sent"
                    },
                    {
                        date: "28/03/2020 10:30:14",
                        text: "Perfetto, a che indirizzo?",
                        status: "received",
                        read: true
                    },
                ],
            },
            {
                name: "+39 337 9754465",
                avatar: "_default",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Ciao come stai?",
                        status: "received",
                        read: true
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Chi sei?",
                        status: "sent"
                    },
                    {
                        date: "10/01/2020 15:32:38",
                        text: "Sono Marco!",
                        status: "received",
                        read: true
                    },
                ],
            },
        ]
    },
    methods: {
        lastMessage: function(contact) {
            return contact.messages[contact.messages.length - 1]
        },

        notSeenMessages: function(contact) {
            let counter = 0;
            contact.messages.forEach(element => {
                if (element.read == false) {
                    counter++
                }
            });
            return counter;
        }
    }
});