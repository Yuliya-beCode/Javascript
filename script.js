(() => {
    var bot, user, input, randomGreet, ulist, chat, list, lenArr, nextLine, msgList,arr,p
        count = 0,
        imageSrc = document.getElementById("smurfImage"),
        greetings = ["Hello my Friend!", "Hi darling!", "Hey you!", "Hello there!", "Hello dear friend!"],
        yesAnswers = ["That's fine, because it means that you have a pretty good starting point for tomorrow.", "That's fine: we'll offer you plenty of tips, expertise, and advice, provide you with a hiking rucksack and of course make your time unforgettable.", "And that's fine: Passion for good mood is not something that can be forced on anyone.", "Super, we have great suggestions for you!", "Perfect, it means you would like to follow our tips. Great!"],
        noAnswers = ["But it was as if God said, No, you aren't going to do that.", "So, you are not my friend neither my best friend, you are more than…", "Why don’t you trust me… I could change your mood…", "If you are not sure if these categories apply to you or you have any questions, please don’t hesitate to contact us as we would be delighted to assist you!", "Should I stay with someone who really trust me hmm…"];
        //botImages = ["https://assets.stickpng.com/thumbs/5a7b6d93abc3d121aba710a0.png","https://assets.stickpng.com/thumbs/5a7b6dd3abc3d121aba710a3.png","https://assets.stickpng.com/thumbs/58b83c9615d8273a5cab2f94.png","https://assets.stickpng.com/thumbs/58b83cfb15d8273a5cab2f99.png","https://assets.stickpng.com/thumbs/5a7b6d3aabc3d121aba71096.png"];

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

        get sender(){
            return this.sender;
        }
    }

    //create unordered list
    ulist = document.createElement("ul");
    //set attributes
    ulist.setAttribute("id", "messages");
    ulist.setAttribute("class", "list-group list-group-flush");
    //append in element in chatBox id
    chat = document.getElementById("chatBox");
    chat.appendChild(ulist);
    //random welcome message
    randomGreet = pickRandomMessage(greetings);
    //instantiate
    bot = new Chat("Bot", greetings[randomGreet]);
    createList(bot.message);

    bot.message = "How are you doing? Would you like to talk to me?";
    createList(bot.message);

    //eventlistener for clicking button
    document.getElementById("send").addEventListener("click", sendMessage);
    document.getElementById("inputMessage").addEventListener("keypress", function(event){
        if(event.key === "Enter" && event.shiftKey){
            input = document.getElementById("inputMessage").value;
            nextLine ="\n";
            input += nextLine;
        }else if(event.key === "Enter"){
            sendMessage();
        }
    });

    //random pick function
    function pickRandomMessage(arr) {
        lenArr = arr.length;
        return Math.floor(Math.random() * lenArr);
    }

    //create list function
    function createList(message) {
        //set attribute
        list = document.createElement("li");
        list.setAttribute("class", "list-group-item");
        msgList = document.getElementById("messages");
        msgList.appendChild(list);
        
        if(message.search("\n") >= 0){
            arr = message.split("\n");
            arr.forEach(createParagraph);
        }else{
            list.append(message);
        }
    }

    function createParagraph(value){
        p = document.createElement("p");
        msgList.lastElementChild.appendChild(p);
        p.append(value);
    }

    function sendMessage(){
        //get value of user input
        input = document.getElementById("inputMessage").value;
        user = new Chat("User", input);
        createList(user.message);
        createList(checkAnswer(input));
        //clear the text after sending
        document.getElementById("inputMessage").value = "";
    }

    //check the answer of the user
    function checkAnswer(message) {
        var result,
            answer = message.toLowerCase();
        if (answer.search("yes") >= 0) {
            count = 0;
            result = pickRandomMessage(yesAnswers);
            //set attribute for image
            imageSrc.setAttribute("src", "https://assets.stickpng.com/thumbs/5a7b6dd3abc3d121aba710a3.png");
            bot.message = yesAnswers[result];
            return bot.message;
        } else if (answer.search("no") >= 0) {
            count = 0;
            result = pickRandomMessage(noAnswers);
            //set attribute for image
            imageSrc.setAttribute("src", "https://assets.stickpng.com/thumbs/58b83c9615d8273a5cab2f94.png");
            bot.message = noAnswers[result];
            return bot.message;
        } else if(answer === ""){
            count = 0;
            result = "I receive an empty message. Please try again."
            //set attribute for image
            imageSrc.setAttribute("src", "https://assets.stickpng.com/thumbs/58b83cfb15d8273a5cab2f99.png");
            bot.message = result;
            return bot.message;
        }else {
            count++;
            //if tried 3 times  
            if (count > 3) {
                result = "Are you serious that you don't know how to read questions carefully. I do not want to talk to you anymore. You know where you can find me. Bye!"
                //disable the textarea
                document.getElementById("inputMessage").disabled = true;
                //remove event listener
                document.getElementById("send").removeEventListener("click", sendMessage);
                //set attribute for image
                imageSrc.setAttribute("src", "https://assets.stickpng.com/thumbs/5a7b6d3aabc3d121aba71096.png");//botImages[4]
                bot.message = result;
                return bot.message;
            } else {
                result = "I'm sorry, I didn't catch what you said. Could you say that again, please?"
                //set attribute for image
                imageSrc.setAttribute("src", "https://assets.stickpng.com/thumbs/5a7b6d3aabc3d121aba71096.png");//botImages[4]
                bot.message = result;
                return bot.message;
            }
        }
    }
})();