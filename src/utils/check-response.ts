
type TRes= {
    ok: boolean
    status: number
    redirected: boolean
    statusText: string
    type: string    
    url: string   
    json: ()=>any
}
export const checkResponse = (res: TRes) => {   
    if (res.ok) {
        console.log('все ок')
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`)
}