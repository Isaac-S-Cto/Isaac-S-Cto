import { ChangeEvent, useState } from 'react'
import logo from './assets/Logo-slw.svg' /* importação da logo */
import { NewNoteCard, Notecard } from './assets/componentes/note-cards' 
/* NewNotecards/Notecards importação dos componentes para fazer comunicação entre elementos*/

interface Note{
/* formato do array*/
  id: string
  date: Date
  content: string
}



 export function App() {

  const [search, setSearch] = useState('') 
  const [notes, setNotes] = useState<Note[]>(() => {  /*iniciando o estado com uma arrow function > return */
  

  /* criando const notesOn/storage para receber os 
  itens do local storage(api-browser. caso haja um item chamado notes: retorne : JASON) no notesOnStorage  */
  const notesOnStorage = localStorage.getItem('notes')
    
    if (notesOnStorage){
      return JSON.parse(notesOnStorage) /* .parce > caminho contrario do stringfy */ 
    }
    return[]

}) /* < informando como sera o formato do meu array > interface note */




function handleSearch(event: ChangeEvent<HTMLInputElement>){ /*função recebe o evento:onchange *//*HTMLImputElement > informa o elemento que esta recendo o evento*/
  const querry = event.target.value /* criando variavel para receber o valor da busca  */
  setSearch(querry) /* e enrão salvamos o valor dentro do estado da busca */
}

const filterNotes = search != '' /* caso meu search seja diferente de uma string vazia*/
? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) /* buscar as notas  onde o conteundo inclui a palavra buscada */
:notes 
 /*caso esteja vazio eu retorno somente o display de notas */
 
  function onNoteCreated(content: string) { 
  
    const NewNote = {
      

    id: crypto.randomUUID(), /* cryptoRamdom gera uma id aleatório do tipo string* > NewNote > id:notes/ date > new Date(),
    content > conteudo virá do parametro content : string */
    date: new Date(),
    content,
    
 }
 /*Salvando as notas no navegador > Local.Storage */
 const notesArray = [NewNote, ...notes] /*separando o array em uma variavel*/
   setNotes(notesArray) /* passando os parametris para a variavel da function app; setNotes > Notes*/
   localStorage.setItem('notes', JSON.stringify(notesArray))
   /* local.stotage > api do browser para guardar infoemações.setItem > enviar informações.
    notes > nomear . Json.stringify: local.store , nao aceita array entao com este comando convertemos em texto > Json.string */
  }
  function onNoteDeleted(id: String){
    const notesArray = notes.filter(note =>{
return note.id != id
    })

 setNotes(notesArray)
 localStorage.setItem('notes', JSON.stringify(notesArray))
  }

return (
   /* configurando o conteiner/ tela pricipal do app*/
    <div className="mx-auto max-w-6xl my-12 space-y-6  px-5">
    {/* chamando a imagem dentro da aplição <img src> / 
    ultiliza-se aspas para colocar uma variavel JS dentro do html */}
    <img src={logo} alt='logo-slw'/> 

      <form className="w-full">
<input 
  type="text" placeholder='Busque em suas notas...' 
  /* w-full > tela inteira/ text-3xl > tamanho font/ trancking > diminui os espaçoes entre as letras/outline none> remove o focus */
  className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
  onChange={handleSearch} /* toda vez que você mudar o seu valor vou chamar a função handleSearch*/
/>
      </form>


<div className="h-px bg-slate-700"/>

<div className="grid grid-col-1 md:grid-col-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
         {/*elemento criado na pasta componets /* Grids principal*/}
    {/* passando a funçao onoNote created para do meu componet criado*/}
      {/* é preciso infomar lá no componetente que ele recebera valor void}

           {/*elemento criado na pasta componets no arquivo Note-cards
           implementando uma função e chamando no App.tsx para não deixar o codigo tão grande*/}
      <NewNoteCard onNoteCreated={onNoteCreated}/>
           {/*o componente newnotecard recebe a função onNoteCreated */}
           
           {filterNotes.map((note) => {   
            
            /* map percorre a array(as notas) */
            return ( <Notecard key={note.id} note={note} onNoteDeleted = {onNoteDeleted} /> /* key > propriedade do react que atribui um valor unico 
            para cada posição do array(notas) Obrigatório
            e irá retornar um notecard passando pra ele as informações da nota */
          );
        })}
          
          
      </div>    
    </div>  
  )


}


