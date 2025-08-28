import './Body.css'
import {Link, LogIn, LogOut,Copy, CopyCheck, Share2,RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LoginForm } from './Login';
import { RegisterForm } from './Register';
import { useAuth } from '../Contexts/AuthContext';
import { baseApi } from '../utils/baseApi';






export const Body = ({setIsOpen}) => {


    const{user:{name,deleteAt,id,token},logout_user,} = useAuth();

    

    const[formType,setFormType] = useState(null);
    const[copied,setCopied] = useState(false);
    const[messages,setMessages]= useState([]);



    const link = `${window.location.origin}/whisper/${id}`;

    const handleCopy = ()=>{
        navigator.clipboard.writeText(link)
        .then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000)})
        .catch(err=>{alert(`Failed to copy`);console.log(`Failed to copy`,err);
        })
    };

  const handleShare = () => {
      if (navigator.share) {
                navigator.share({
                title: "Check this out",
                url: link
        })
          .catch(err => console.log("Share failed:", err));
      } else {
          alert("Web Share API not supported in this browser.");
      }
};

  const veryingToken = async()=>{
    try { 
         const res  =   await fetch(`${baseApi}/user/verify`,{
            method:'GET',
            headers:{
              'Authorization': token,
              'Content-Type': 'application/json' 
            },
           });
           if(!res.ok){
            logout_user();
            setMessages([])
           }else{
            console.log('corect');
            
           }

    } catch (error) {
      console.log(error,'from verifyingtoken in body');

    }
  }



    const fetchMesages = async()=>{
    try {
      await veryingToken()
          const res = await fetch(`${baseApi}/msg/get_msg`,{
            method:'GET',
            headers:{
              'Authorization':token,
              'Content-Type':'application/json',
            }
          });
          const data = await res.json();
          if(res.ok){
            setMessages(data.message)
          }
    } catch (error) {
        console.log(error);
    }
  }


useEffect(()=>{
  (async () => {
      await veryingToken();
      await fetchMesages();
  })()
  },[])




  return (
    <main className='container' onClick={()=>{if(formType)setFormType(null);setIsOpen(false)}}>

      <div className={`content ${formType ? 'blurred': ''}`}>

      
            <h1 style={{textAlign:'center'}}>Send & Receive Secret Messages Like a Spy! </h1>
            <p>Get your own magical link and let people drop anonymous messages into your secret inbox! No names, no traces—just pure mystery and fun. Messages self-destruct 24 hours after the account creation ⏳ 🔥</p>


        <div style={{border: '2px dashed #e2e8f0'}}></div>

        {name && deleteAt && <div className='welcome-user'>
          <p style={{color:'#00e6e6ff',fontSize:"1.5rem" }}>Welcome <b style={{color:'#f57542'}}>{name}</b> !</p>
          <p style={{color:'#69bcffff'}}>Your account and messages are scheduled for auto-deletion on : <b style={{color:'red'}}>{deleteAt}</b>.</p>
        </div>}


{/* msg box */}
      <div className='message-box'>
            <h3>Your secret messages will appear here like magic!📬</h3>   
            {messages.length==0 &&<div>
                          <p>Your anonymous inbox is ready! 🎉</p>
            <p>Someone's probably typing something mysterious for you right now... 👀</p>
            </div>}
            <div className="messages-list">
                {messages.map((e, index) => <p key={index} className='message-item'>📌 {e.text}</p>)}
            </div>

              {name &&<button onClick={fetchMesages} style={{margin:'2rem 0'}}>Refresh <RefreshCcw size={17}/></button>}
        </div>



{/* login signup logout */}
        <div className='btn-container'>

        {!name && <div className='signup'>
                <p>Brand new here? Let's get you started! 🚀</p>
                <button onClick={()=>setFormType('register')}><Link /> Create My Secret Link</button>
            </div>}

        {!name && <div className='login'>
                <p>Got your link already? Jump back in! 🔑</p>
                <button onClick={()=>setFormType('login')}>Login <LogIn /></button>
            </div>}


{/* generated link box */}
    { name && (<div className="user-actions">
    <div className='generated-link-box'>
      <h2>Mission Link Generated! 🕵️‍♂️</h2>
      <div style={{backgroundColor:'#f2edd10c', margin:'0.5rem 0'}}><p className='generated-link' style={{color:"#c1ecffff"}}>{link}</p></div>
      <div className='action-btns'>
        <button onClick={handleCopy} style={{background:'#309898'}}>
          {copied ? <><CopyCheck size={16} /> Copied</> : <><Copy size={15} /> Copy</>}
        </button >
        <button onClick={handleShare} style={{background:'#FF9F00'}}>
          <Share2 size={16} /> Share
          </button>
      </div>
    </div>


{/* logout */}
    <div className='logout'  style={{margin:'1.5rem 0'}}>
      <p>Time to vanish? See you later! 👋</p>
      <button onClick={()=>{logout_user();setMessages([])}}> Logout <LogOut /></button>
    </div>
  </div>
)}


        </div>

{/* description */}
        <div>
          <h4>💡 How the Magic Works: ✨</h4>
          <ul>
                <li> Hit <b>Create My Secret Link</b> and BAM! You get your own special anonymous link! 🎯</li>
                <li> Share it everywhere—social media, group chats, or slip it to your crush! 😉</li>
                <li> Anyone can send you messages without revealing who they are. It's like having superpowers! 🦸‍♀️</li>
                <li>You'll NEVER know who sent what—could be your bestie, your mom, or your colleague ! 🤔</li>
                <li> Your account and all messages self-destruct in 24 hours, keeping your secret world fresh and exciting! 💥 </li>
          </ul>
        </div>
      </div>

      {/* model  */}
              {formType && (
          <div className="model-overlay" onClick={(e)=> e.stopPropagation()} >
              <div className="model-content">

                  {formType=='register'?(
                    <RegisterForm setFormType={setFormType}/>
                  ):(
                    <LoginForm setFormType={setFormType}/>
                  )}
              </div>
          </div>
        )}
    </main>

  )
}
