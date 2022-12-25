import memesData from "./memesData"
import React from "react"


/*16 August
Ojas Ketkar
Making the first API call 
*/

//function to generate a random meme url
export default function InPut() {
    const [memeImage,setMemeImage] = React.useState({
        topText : "",
        bottomText : "",
        randomImage : "https://i.imgflip.com/1bij.jpg"
    })


    function random_meme(){
        let ran = (Math.random())*allMemes.length
        let ran2 = Math.floor(ran) 
        const url = allMemes[ran2].url
        setMemeImage(prevMeme => ({
            topText : "",
            bottomText : "",
            randomImage : "https://i.imgflip.com/1bij.jpg",
            randomImage: url
        }))
         
    }


    function handleChange(event){
        
        const {name,value} = event.target
        setMemeImage(prevMeme => ({
            ...prevMeme,
            [name] : value
        }))
    }

    const[allMemes,setAllMemes] = React.useState([])

    React.useEffect(()=>{

        // fetch("https://api.imgflip.com/get_memes")
        // .then(res=>res.json())
        // .then(data=>setAllMemes(data.data.memes))
        //Instead of .then fomrat we can use the promises method
        
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
        //cleanup function
        // return () => {
        // }
        
    },[])

    // console.log(allMemes)

    return (
        <main>
            <div className='input--form'>
                <div className="input">
                <input type="text"  className='upper-text' placeholder = "Upper text" onChange={handleChange} name="topText" value={memeImage.topText}/>
                <input type="text"  className='lower-text' placeholder = "Lower text" onChange={handleChange} name="bottomText" value={memeImage.bottomText}/>
                </div>
                <div className="submit-btn">
                <input type="submit" value='Get a new meme image' className='form-submit' onClick={random_meme}/>
                </div>
                <div className="meme">
                <img src={memeImage.randomImage} alt="" className="newmeme"/>
                <h2 className="meme--text top">{memeImage.topText}</h2>
                <h2 className="meme--text bottom">{memeImage.bottomText}</h2>
                </div>
            </div>

        </main>
    )
} 