import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function LoginSignup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [conPassword, setConPassword] = useState("")
    const [first_name, setFirst_name] = useState("")
    const [last_name, setLast_name] = useState("")
    const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(isLogin){
                const res = await axios.post('http://localhost:8000/admin/login',{email,password});
                alert(res.data.message)
                localStorage.setItem('token',res.data.token)
                if(res.data.message === "Login Successful"){
                    navigate('/dashboard')
                }
                
            }else{
                // if(password !== conPassword){
                //     alert("Password Not Match")
                //     return
                // }
                const res = await axios.post('http://localhost:8000/admin/register',{first_name,last_name,email,password})
                alert(res.data.message)
                window.location.reload()
            }

        }catch(error){
            console.error('Error:',error)
        }
    }
  return (
    <div>
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit}>
        {
            !isLogin && (
                <>
                <label htmlFor="">First Name:</label>
                <input type="firstname" value={first_name} onChange={(e)=>setFirst_name(e.target.value)} required />
                <label htmlFor="">Last Name:</label>
                <input type="lastname" value={last_name} onChange={(e)=>setLast_name(e.target.value)} required />
                
                </>
            )
           }
           <label htmlFor="">Email:</label>
           <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
           <label htmlFor="">Password:</label>
           <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  required/>
          
           <button type='submit'>{isLogin ? 'Login' : 'Signup'}</button>
        </form>
        <p>
            {isLogin ? "Dont have an acount click here ==> " : "Already have account click here ==> "}
            <Link onClick={()=> setIsLogin(!isLogin)}>{isLogin ? "Signup" : "Login"}</Link>
        </p>
    </div>
  )
}

export default LoginSignup