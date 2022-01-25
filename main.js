let vue = new Vue({
    el: "#app",
    data: {
        user: {
            name: "Andrea",
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
                        read: true
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
                status: "online",
                visible: true,
                messages: [
                    {
                        date: "10/01/2020 15:30:55",
                        text: "How are you?",
                        status: "sent",
                        read: true
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
                status: "online",
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
                        text: "Do you want to talk about it?",
                        status: "sent",
                        read: true
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
                        status: "sent",
                        read: true
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
                status: "online",
                visible: true,
                messages: [
                    {
                        date: "28/03/2020 10:10:40",
                        text: "Vorrei ordinare due pizze",
                        status: "sent",
                        read: true
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
                        status: "sent",
                        read: true
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
                status: "online",
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
                        status: "sent",
                        read: true
                    },
                    {
                        date: "10/01/2020 15:32:38",
                        text: "Sono Marco!",
                        status: "received",
                        read: true
                    },
                ],
            },
        ],
        selectedContact: 0,
        selectedMessage: -1,
        isMenuOpen: false,
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

        markAsReadAllMessages: function (contact) {
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

        //Menu chat
        hideAllMessageMenu: function () {
            this.selectedMessage = -1;
            this.isMenuOpen = false;
        },

        delMessage: function (messages, i) {
            if (messages.length == 1) {
                alert("Devi lasciare almeno un messaggio in chat!")
                return;
            }
            messages.splice(i, 1)
        },

        toggleSelectedMessage: function (messageIndex) {
            if (this.selectedMessage == messageIndex) {
                this.selectedMessage = -1;
                this.isMenuOpen = false;
                return;
            }
            this.selectedMessage = messageIndex;
            this.isMenuOpen = true;
        },

        //Ora
        getCurrentDate: function () {
            const now = new dayjs();
            return now.date() + "/" + now.month() + "/" + now.year() + " " + now.hour() + ":" + now.minute() + ":" + now.second()
        },

        //Icons
        applyChatIcons: function () {
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

            document.querySelectorAll("i.chevron-down").forEach((element) => {
                element.innerHTML = `
                <svg viewBox="0 0 18 18" width="18" height="18" class="">
                    <path fill="currentColor"
                    d="M3.3 4.6 9 10.3l5.7-5.7 1.6 1.6L9 13.4 1.7 6.2l1.6-1.6z"></path>
                </svg>
            `;
            });
        },

        applyWindowIcons: function () {
            document.querySelectorAll("i.status").forEach((element) => {
                element.innerHTML = `
                <svg version="1.1"  id="ee51d023-7db6-4950-baf7-c34874b80976"  x="0" y="0" viewBox="0 0 24 24"
                    width="24" height="24" class="">
                    <path fill="currentColor"
                    d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z">
                    </path>
                </svg>
                `;
            });

            document.querySelectorAll("i.new-chat").forEach((element) => {
                element.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" class="">
                    <path fill="currentColor"
                    d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z">
                    </path>
                </svg>
                `;
            });

            document.querySelectorAll("i.menu-icon").forEach((element) => {
                element.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" class="">
                    <path fill="currentColor"
                    d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                    </path>
                </svg>
                `;
            });

            document.querySelectorAll("i.notifications-icon").forEach((element) => {
                element.innerHTML = `
                <svg viewBox="0 0 48 48" width="48" height="48" class="">
                    <path fill="currentColor"
                    d="M24.154 2C11.919 2 2 11.924 2 24.165S11.919 46.33 24.154 46.33s22.154-9.924 22.154-22.165S36.389 2 24.154 2zm-.744 15.428v-.618c0-.706.618-1.324 1.324-1.324s1.323.618 1.323 1.324v.618c2.559.618 4.412 2.823 4.412 5.559v3.176l-8.294-8.294a5.056 5.056 0 0 1 1.235-.441zm1.323 15.706a1.77 1.77 0 0 1-1.765-1.765h3.529a1.768 1.768 0 0 1-1.764 1.765zm7.236-.883-1.765-1.765H17.233v-.882l1.765-1.765v-4.853a5.56 5.56 0 0 1 .794-2.912l-2.559-2.559 1.147-1.147 14.735 14.736-1.146 1.147z">
                    </path>
                </svg>
                `;
            });

            document.querySelectorAll("i.chevron-right").forEach((element) => {
                element.innerHTML = `
                <svg viewBox="0 0 8 12" width="8" height="12" class="">
                    <path fill="currentColor"
                    d="m2.173 1 4.584 4.725-4.615 4.615-1.103-1.103 3.512-3.512L1 2.173 2.173 1z">
                    </path>
                </svg>
                `;
            });

            document.querySelectorAll("i.search-icon").forEach((element) => {
                element.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" class="">
                    <path fill="currentColor"
                    d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z">
                    </path>
                </svg>
                `;
            });

            document.querySelectorAll("i.bigger-search-icon").forEach((element) => {
                element.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" class="">
                    <path fill="currentColor"
                    d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                    </path>
                </svg>
                `;
            });

            document.querySelectorAll("i.archived-icon").forEach((element) => {
                element.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" class="">
                    <path
                    d="m18.54 3.23-1.39-1.68C16.88 1.21 16.47 1 16 1H4c-.47 0-.88.21-1.16.55L1.46 3.23C1.17 3.57 1 4.02 1 4.5V17c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4.5c0-.48-.17-.93-.46-1.27ZM4.24 3h11.52l.81.97H3.44l.8-.97ZM3 17V6h14v11H3Zm8.45-9h-2.9v3H6l4 4 4-4h-2.55V8Z"
                    fill="currentColor"></path>
                </svg>
                `;
            });

            document.querySelectorAll("i.smile").forEach((element) => {
                element.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" class="ekdr8vow dhq51u3o">
                    <path fill="currentColor"
                    d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z">
                    </path>
                </svg>
                `;
            });

            document.querySelectorAll("i.paper-clip").forEach((element) => {
                element.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" class="">
                    <path fill="currentColor"
                    d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z">
                    </path>
                </svg>
                `;
            });

            document.querySelectorAll("i.microphone").forEach((element) => {
                element.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24" class="">
                    <path fill="currentColor"
                    d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z">
                    </path>
                </svg>
                `;
            });

            // document.querySelectorAll("i").forEach((element) => {element.innerHTML = ``;});
        }
    },
    mounted: function () {
        this.applyWindowIcons();
        this.applyChatIcons();
        this.markAsReadAllMessages(this.getSelectedContact());
    },

    updated() {
        this.applyChatIcons();
    }
});