import openai from './config/open-ai.js'
import readlineSync from 'readline-sync'
import colors from 'colors'


const main = async () => {
    console.log(colors.bold.green('Welcome to the chat bot! Ask me anything.'))
    console.log(colors.bold.green('You can now chat with me'))

    const chatHistory = []

    while(true) {
        const messages = chatHistory.map(([role, content]) => ({ role, content }))
        

        const userInput = readlineSync.question(colors.yellow('You: '))
        messages.push({ role: 'user', content: userInput })
        
        try {
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages
            })

            const completionText = completion.data.choices[0].message.content
            
            if(userInput.toLowerCase() === 'quit') {
                console.log(colors.green('Bot: ') + completionText)
                return
            }

            console.log(colors.green('Bot: ') + completionText)
            chatHistory.push(['user', userInput])
            chatHistory.push(['assistant', completionText])
        } catch(err) {
            console.error(colors.red(err))
        }
    }
}

main()