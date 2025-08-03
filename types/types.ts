export interface Credentials {
    Email : string
    Password : string
    Role_code : string
    Name : string
}

export type AuthState = {
    token : string | null
    user : string | null
    setToken : (token : string) => void
    setUser : (user : string) => void
    clearToken : () => void
    logout : () => void
}


export interface Profile {
    userid : string 
	email : string 
	name : string 
	role : string 
	created_at : string 
}