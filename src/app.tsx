import logo from './assets/Logo-slw.svg' /* importação da logo */
import { NewNoteCard, Notecard } from './assets/componentes/note-cards'

const note = {
  date: new Date(),
  content: 'hello word'
}

export function App() {
  

  return (
   /* configurando o conteiner*/
    <div className="mx-auto max-w-6xl my-12 space-y-6">
    {/* chamando a imagem dentro da aplição <img src> / 
    ultiliza-se aspas para colocar uma variavel JS dentro do html */}
    <img src={logo} alt='logo-slw'/> 

      <form className="w-full">
<input 
  type="text" placeholder='Busque em suas notas...' 
  /* w-full > tela inteira/ text-3xl > tamanho font/ trancking > diminui os espaçoes entre as letras/outline none> remove o focus */
  className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
/>
      </form>


      <div className="h-px bg-slate-700"></div>

       <div className="grid grid-cols-3 auto-rows-[250px] gap-6">

    {/*elemento criado na pasta componets /* Grids principal*/}
     <NewNoteCard/>


           {/*elemento criado na pasta componets no arquivo Note-cards
           implementando uma função e chamando no App.tsx para não deixar o codigo tão grande*/}
      <Notecard note={note}/>
    
          
          
          
      </div>    
    </div>  
  )


}


