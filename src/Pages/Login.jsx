import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { UseAuth } from "../Contexts/FakeAuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";


export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate=useNavigate();
  const{logIn,isAuthenticated} =UseAuth();
  console.log(isAuthenticated)
 
  function handlesubmit(e){
    e.preventDefault();
  if(password && email) logIn(email,password);
  

  }

  useEffect(function(){
  if(isAuthenticated===true){
   navigate('/app',{replace:true})
  }
  },[isAuthenticated])

 // Empty dependency array means this effect runs once after the initial render
  

  return (
    <main className={styles.login}>
    <PageNav/>
      <form className={styles.form} onSubmit={handlesubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
