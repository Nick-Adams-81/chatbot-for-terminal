import { Configuration, OpenAIApi } from 'openai'
import dotenv from 'dotenv'

dotenv.config()
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const main = async () => {
    const chatCompletion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'user', content: 'what is the capital of california?' }
        ]
    })
    console.log(chatCompletion)
}

main()