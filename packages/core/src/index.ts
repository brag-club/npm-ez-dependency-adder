const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://dep.chirag.codes',
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Max-Age': '86400',
};

export interface Env {
    CONFIGSTORE: KVNamespace,
}

interface CONFIGSTORE_RESPONSE {
    code: string,
    data: string,
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const {headers, url, method} = request;
        const parsedURL = new URL(url);
        const {pathname} = parsedURL;
        const key = pathname.replace("/", "")

        switch (method) {
            case "POST":
                return this.handlePOST(request, env, parsedURL)
            case "GET":
                return this.handleGET(request, env, key)
        }

        return new Response("Hello World!");
    },

    async handlePOST(request: Request, env: Env, parsedURL: URL): Promise<Response> {
        const body: any = await request.json();
        let unique = false;
        let code = "";
        if (body.hasOwnProperty('data')) {
            const { data } = body;
            while (!unique) {
                code = this.generateCode(7);
                const check = await env.CONFIGSTORE.get(code);
                unique = !check;
            }
            await env.CONFIGSTORE.put(code, data)
            const rData: CONFIGSTORE_RESPONSE = {code, data}

            return new Response(JSON.stringify(rData), {headers: corsHeaders});
        }
        return new Response(null, {status: 400})
    },

    async handleGET(request: Request, env: Env, key: string): Promise<Response> {
        let data: string | null = "";

        if(key) {
            data = await env.CONFIGSTORE.get(key)
        }

        if(!data) {
            return new Response("No Such Key!", {status: 404})
        } else {
            return new Response(JSON.stringify({data}), {headers: corsHeaders});
        }
    },

    generateCode(length: number) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
};
