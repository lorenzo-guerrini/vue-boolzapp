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
                status: "online",
                visible: true, //Archiviato?
                messages: [
                    {
                        date: "23/12/2021 21:37:23",
                        text: "It's over.",
                        status: "sent",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "23/12/2021 21:38:41",
                        text: "Just because it's over",
                        status: "received",
                        read: false,
                        messageMenuHidden: false
                    },
                    {
                        date: "23/12/2021 21:39:41",
                        text: "Doesn't mean it's really over",
                        status: "received",
                        read: false,
                        messageMenuHidden: false
                    }
                ],
            },
            {
                name: "Dua Lipa",
                avatar: "_1",
                status: "online",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "How are you?",
                        status: "sent",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Don't show up",
                        status: "received",
                        read: false,
                        messageMenuHidden: false
                    },
                    {
                        date: "10/01/2020 15:51:00",
                        text: "Don't come out",
                        status: "received",
                        read: false,
                        messageMenuHidden: false
                    },
                    {
                        date: "10/01/2020 15:52:00",
                        text: "Don't start caring about me now",
                        status: "received",
                        read: false,
                        messageMenuHidden: false
                    }
                ],
            },
            {
                name: "Lana Del Rey",
                avatar: "_2",
                status: "online",
                visible: true,
                messages: [
                    {
                        date: "20/03/2020 16:30:00",
                        text: "I got that summertime, summertime sadness",
                        status: "received",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "10/01/2020 15:32:54",
                        text: "Do you want to talk about it?",
                        status: "sent",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "20/03/2020 16:35:00",
                        text: "Su-su-summertime, summertime sadness",
                        status: "received",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "20/03/2020 16:36:00",
                        text: "Got that summertime, summertime sadness",
                        status: "received",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "10/01/2020 15:38:54",
                        text: "Is everything ok?",
                        status: "sent",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "20/03/2020 16:39:00",
                        text: "Oh, oh-oh, oh-oh",
                        status: "received",
                        read: false,
                        messageMenuHidden: false
                    },

                ],
            },
            {
                name: "Pizzeria",
                avatar: "_3",
                status: "online",
                visible: true,
                messages: [
                    {
                        date: "28/03/2020 10:10:40",
                        text: "Vorrei ordinare due pizze",
                        status: "sent",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "28/03/2020 10:25:10",
                        text: "Certo, quali?",
                        status: "received",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "28/03/2020 10:27:10",
                        text: "Una marinara e una margherita",
                        status: "sent",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "28/03/2020 10:30:14",
                        text: "Perfetto, a che indirizzo?",
                        status: "received",
                        read: true,
                        messageMenuHidden: false
                    },
                ],
            },
            {
                name: "+39 337 9754465",
                avatar: "_default",
                status: "online",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "Ciao come stai?",
                        status: "received",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "10/01/2020 15:50:00",
                        text: "Chi sei?",
                        status: "sent",
                        read: true,
                        messageMenuHidden: false
                    },
                    {
                        date: "10/01/2020 15:32:38",
                        text: "Sono Marco!",
                        status: "received",
                        read: true,
                        messageMenuHidden: false
                    },
                ],
            },
        ],
        selectedContact: 0,
        messageInput: "",
        searchInput: "",
    },
    methods: {
        //Side
        lastMessage: function (contact) {
            return contact.messages[contact.messages.length - 1]
        },

        notSeenMessages: function (contact) {
            let counter = 0;
            contact.messages.forEach(element => {
                if (element.read == false) {
                    counter++
                }
            });
            return counter;
        },

        getSelectedContact: function () {
            return this.contacts[this.selectedContact];
        },

        MarkAsReadAllMessages: function (contact) {
            contact.messages.forEach((message) => {
                message.read = true;
            });
        },

        //Restituisce true o false se il nome del contatto inserito è uguale in lowercase a searchInput in lowecase
        matchesSearch: function (contact) {
            if (this.searchInput == "") {
                return true;
            }
            return contact.name.toLowerCase().startsWith(this.searchInput.toLowerCase());
        },

        //Main
        lastSeen: function () {
            let tempMessages = this.contacts[this.selectedContact].messages;

            for (let i = tempMessages.length - 1; i > 0; i--) {
                if (tempMessages[i].status == "received") {
                    return tempMessages[i].date;
                }
            }
            return "null";
        },

        isFirstMessage: function (message, index) {
            //Se il messaggio è il primo = false
            if (index == 0) {
                return true;
            }

            //Se lo status del messaggio che precede è uguale a quello del messaggio selezionato = false
            const messageStatus = message.status;

            const prevMessageStatus = this.contacts[this.selectedContact].messages[index - 1].status;

            if (messageStatus == prevMessageStatus) {
                return false;
            }

            //Se il messaggio non è il primo e non è preceduto da messaggi con status uguale = true
            return true;
        },

        getTime: function (message) {
            const tempArray = message.date.split(" ")[1].split(":");
            return tempArray[0] + ":" + tempArray[1];
        },

        //Gestione messaggi
        addMessage: function () {
            if (this.messageInput.trim() == "") {
                return;
            }

            const now = new dayjs();

            this.contacts[this.selectedContact].messages.push({
                date: this.getCurrentDate(),
                text: this.messageInput,
                status: "sent",
                read: true
            })

            this.messageInput = "";

            this.getDefaultReply();
        },

        getDefaultReply: function () {
            this.contacts[this.selectedContact].status = "sta scrivendo..."
            setTimeout(() => {
                this.contacts[this.selectedContact].messages.push({
                    date: this.getCurrentDate(),
                    text: "Ok",
                    status: "received",
                    read: true
                });

                this.contacts[this.selectedContact].status = "online"

                clearTimeout(this);
            }, 1000);
        },

        //Toggle true/false su messageMenuHidden per poter mostrare il menu
        isMessageMenuHidden: function (messages, i) {
            messages.forEach((message) => {
                if (message != messages[i]) {
                    message.messageMenuHidden = false;
                }
            })
            messages[i].messageMenuHidden = !messages[i].messageMenuHidden;
        },

        hideAllMessageMenu: function () {
            this.contacts[this.selectedContact].messages.forEach((message) => {
                message.messageMenuHidden = false;
            })
        },

        delMessage: function (messages, i) {
            if (messages.length == 1) {
                alert("Devi lasciare almeno un messaggio in chat!")
                return;
            }
            messages.splice(i, 1)
        },

        //Ora
        getCurrentDate: function () {
            const now = new dayjs();
            return now.date() + "/" + now.month() + "/" + now.year() + " " + now.hour() + ":" + now.minute() + ":" + now.second()
        },

        //Icons
        applyChatIcons: function () {
            //Tail
            document.querySelectorAll("i.tail.in").forEach((element) => {
                element.innerHTML = `
                    <svg viewBox="0 0 8 13" width="8" height="13" class="">
                        <path opacity=".13" fill="#0000000"
                        d="M1.533 3.568 8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path>
                        <path fill="currentColor" d="M1.533 2.568 8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z">
                        </path>
                    </svg>
                    `;
            });

            document.querySelectorAll("i.tail.out").forEach((element) => {
                element.innerHTML = `
                    <svg viewBox="0 0 8 13" width="8" height="13" class="">
                        <path opacity=".13" d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"></path>
                        <path fill="currentColor" d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z">
                        </path>
                    </svg>
                    `;
            });


            document.querySelectorAll("i.read-icon").forEach((element) => {
                element.innerHTML = `
                    <svg viewBox="0 0 16 15" width="16" height="15" class="">
                    <path fill="currentColor"
                    d="m15.01 3.316-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z">
                    </path>
                </svg>
                `;
            });
            // document.querySelectorAll("i").forEach((element) => {element.innerHTML = ``;});
        }
    },
    mounted: function () {
        this.applyChatIcons();
        this.MarkAsReadAllMessages(this.getSelectedContact());
    },

    updated() {
        this.applyChatIcons();
    }
});