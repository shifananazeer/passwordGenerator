import React ,{useState , useCallback, useEffect , useRef}  from "react"
import './App.css';

function App() {
 const [length , setlength] = useState(8)
 const [numberAllowed , setNumberAllowed] = useState(false)
 const [charAllowed , setCharAllowed] = useState(false)
 const [password , setPassword] = useState ("")

 const passwordRef = useRef(null)

const generatePassword = useCallback(()=> {
  let pass = ""
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxyz"
  if(numberAllowed) str  += "0123456789"
  if(charAllowed) str += "!@#$%^&*()_+"
  for(let i = 1 ; i < length ; i++) {
 let char =  Math.floor(Math.random() * str.length + 1)
 pass += str.charAt(char)
  }
  setPassword(pass)
},[length , numberAllowed , charAllowed])


useEffect (()=> {
   generatePassword()

}, [length , numberAllowed , charAllowed])


const copyPassword = () => {
  window.navigator.clipboard.writeText(password) 
  passwordRef.current.select()
}
  return (
    <div className="App">
      <div className="pass">
      <div className="heading">
        <h1>Password Generator</h1>
      </div>
      <div className="input">
        <input type="text" value={password} placeholder="password" readOnly ref={passwordRef}/>
      </div>
      <div className="copy-button">
        <button onClick={copyPassword}>Copy</button>
      </div>
      <div className="lower-div">
       <input type="range" min={6} max={100} value={length} onChange={(e) => setlength(e.target.value)} ></input>
       <label length > Length : {length}</label>
       <input type="checkbox" defaultChecked = {numberAllowed} onChange={()=>{
        setNumberAllowed((prev) => !prev )
       }}></input>
       <label>Number</label>
       <input type="checkbox" defaultChecked = {charAllowed} onChange={()=>{
        setCharAllowed((prev) => !prev )
       }}></input>
       <label>Character</label>
      </div>
    </div>
    </div>
  );
}

export default App;
