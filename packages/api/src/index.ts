import { Hono, Context } from 'hono'
import { cors } from 'hono/cors'

type AppContext = {
    Bindings: {
        NPMEZDEPSADDR: KVNamespace
    }
}

const app = new Hono<AppContext>()

const generateCode = (length: number) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


app.use(
    cors({
        origin: "*",
        allowMethods: ["GET", "POST", "OPTIONS", "HEAD"],
        maxAge: 86400,
    })
)

app.get('/', async (ctx: Context) => {
    return ctx.text('Hello World!')
})

app.get('/config/:key', async (ctx: Context) => {
    const key = ctx.req.param('key')
    const value = await ctx.env.NPMEZDEPSADDR.get(key)

    if (value) {
        return ctx.json({
            value,
        })
    }
    else {
        return ctx.json({
            error: "No such key!"
        })
    }
})

app.post('/config', async (ctx: Context) => {
    let key = generateCode(7)
    const { data } = await ctx.req.json()

    await ctx.env.NPMEZDEPSADDR.put(key, data)

    return ctx.json({
        key
    })
})

export default app
