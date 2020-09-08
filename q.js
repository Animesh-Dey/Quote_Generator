//Get quote from API
const qcontainer=document.getElementById('quote-container');
const quotetext=document.getElementById('quote');
const authortext=document.getElementById('author');
const twitter=document.getElementById('twitter');
const newquote=document.getElementById('newquote');
const loader=document.getElementById('loader');

function loading()
{
  loader.hidden=false;
  qcontainer.hidden=true;
}
function complete(){
  if(!loader.hidden){
      qcontainer.hidden=false;
      loader.hidden=true;
    }
}
async function getQuote(){
  loading();
    const proxyurl='https://cors-anywhere.herokuapp.com/'
    const apiurl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response=await fetch(proxyurl + apiurl);
        const data=await response.json();
      //author
       if(data.quoteAuthor==='')
         {
           quoteauthor.innerText="Unknown";
         }
      else
        {
           authortext.innerText=data.quoteAuthor;
        }
      //quote size
       
      if(data.quoteText.length>120)
        {
          quotetext.classList.add('long-quote');
        }
      else
        {
           quotetext.classList.remove('long-quote');

        }
      quotetext.innerText=data.quoteText;
      complete();
    }catch(error){
      console.log('Whoops, no quote',error);
      
    }

}
function tweetquote(){
  const quote=quotetext.innerText;
  const author=authortext.innerText;
  const twitterurl=`https://twitter.com/intent/tweet?tweet=${quote} - ${author}`;
  window.open(twitterurl,'_blank');
}
//front show
newquote.addEventListener('click',getQuote);
twitter.addEventListener('click',tweetquote);
getQuote();