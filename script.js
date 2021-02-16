(() => {
    class Chat {
        constructor(sender, message) {
            this._sender = sender;
            this._message = message;
        }

        get message() {
            return this._sender + ": " + this._message;
        }

        set message(msg) {
            this._message = msg;
        }
    }
    var bot, user, input, output, randomGreet, ulist, chat, list, countUser, countBot, lenArr, count = 0,
        greetings = ["Hello my Friend!", "Hi darling!", "Hey you!", "Hello there!", "Hello dear friend!"],
        yesAnswers = ["That's fine, because it means that you have a pretty good starting point for tomorrow.", "That's fine: we'll offer you plenty of tips, expertise, and advice, provide you with a hiking rucksack and of course make your time unforgettable.", "And that's fine: Passion for good mood is not something that can be forced on anyone.", "Super, we have great suggestions for you!", "Perfect, it means you would like to follow our tips. Great!"],
        noAnswers = ["But it was as if God said, No, you aren't going to do that.", "So, you are not my friend neither my best friend, you are more than…", "Why don’t you trust me… I could change your mood…", "If you are not sure if these categories apply to you or you have any questions, please don’t hesitate to contact us as we would be delighted to assist you!", "Should I stay with someone who really trust me hmm…"],
        image = [];


    //Chatbot loading
    //create unordered list
    ulist = document.createElement("ul");
    //id = messages
    ulist.setAttribute("id", "messages");
    //class
    ulist.setAttribute("class", "list-group list-group-flush");
    //append in ul in chatBox id
    chat = document.getElementById("chatBox");
    chat.appendChild(ulist);
    //random welcome message
    randomGreet = pickRandomMessage(greetings);
    //intantiate
    bot = new Chat("Bot", greetings[randomGreet]);
    createList(bot.message);

    bot.message = "How are you doing? Would you like to talk to me?";
    createList(bot.message);

    document.getElementById("send").addEventListener("click", () => {
        //get value of user input
        input = document.getElementById("inputMessage").value;
        user = new Chat("User", input);
        output = createList(user.message);

        //check answer
        createList(checkAnswer(input));
    });

    //random pick function
    function pickRandomMessage(arr) {
        lenArr = arr.length;
        return Math.floor(Math.random() * lenArr);
    }

    //create list function
    function createList(message) {
        list = document.createElement("li");
        list.setAttribute("class", "list-group-item")
        document.getElementById("messages").appendChild(list);
        list.append(message);
    }

    //check the answer of the user
    function checkAnswer(message) {
        var result;
        var answer = message.toLowerCase();
        //console.log(answer);
        if (answer.search("yes") >= 0) {
            result = pickRandomMessage(yesAnswers);
            count = 0;
            return yesAnswers[result];
        } else if (answer.search("no") >= 0) {
            result = pickRandomMessage(noAnswers);
            count = 0;
            return noAnswers[result];
        } else {
            count++;
            //if tried 3 times  
            if (count > 3) {
                result = "Are you serious that you don't know how to read questions carefully. I do not want to talk to you anymore. You know where you can find me…"
                count = 0;
                return result;
            } else {
                result = "I'm sorry, I didn't catch what you said. Could you say that again, please?"
                return result;
            }
        }
    }
})();