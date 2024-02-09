/* importando radix dialog - instalado atraves das informações do site radix.ui , executando no terminal o comando npm  */
/* criando variavel Dialog para receber a importação  */
import * as Dialog from '@radix-ui/react-dialog'
import {formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {X} from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'







interface NoteCardProps{ /* criando uma propriedade global*/
  
/*crio 1 propriedade para receber 2 props/ com chaves indico que é um objeto e recebo as duas propriedades */
    note: { 
    date: Date
    content: string
     }
}

/* função Card-Pricipal ADD NOTA  */    
  export function NewNoteCard(){

  const [ShouldShowOnboarding, setShouldShowOnboarding] = useState(true) /* criando variavel*/
  const [content, setContent] = useState('')
  /* usestate > criando um estado > variavel booleana > o usestate cria um array > que na linha recebe as 2 variaveis criadas que ocupam a 1 e 2 pos do array*/
  
  function HandleStartEdition(){
    /* criando a função que receberá o valor de falso quando o suario clicar no button para inserir informação <input> */
    setShouldShowOnboarding(false)
  }

  /* função do evento criado dentro do modal TEXT AREA/ passando variaveis do tipo boolean  */
  function handleContenChange(event:ChangeEvent<HTMLTextAreaElement>){ /* value(HTML-TEXT-AREA-ELEMENT) > é necessario expecificar pois o evento onchange nao é especifico da text area, pode vir de varios elemento do html */ 

  setContent(event.target.value) /* passando valores do evento submit(Savar notas) atraves das variaveis/ 
content <= recera o valor de submit */
  if (event.target.value === ''){
setShouldShowOnboarding(true)
  }
}

function HandleSaveNote(event:ChangeEvent<HTMLFormElement>){
  event.preventDefault()
toast.success('nota criada com sucesso')
}
  
  return (


    <Dialog.Root>

    <Dialog.Trigger className=" rounded-md bg-slate-700 p-5 gap-6 text-left flex flex-col outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-200">
        Adicionar nota...
        </span>
      <p className="text-sm leading-6 text-slate-400">
         Grave uma nota em audio que será convertida em texto automaticamente.
        </p>

    </Dialog.Trigger>
              

    <Dialog.Portal> {/* permite exibir o elemento fora do conteineir/ exibindo no body, na raiz da minha aplicação/assim sobrepondo a tela  */}
           
           <Dialog.Overlay className="inset-0 fixed bg-black/50 "/> {/* overlay > adiciona o efeito do modal, de estar por cima da aplicação/ inset-0 > para ocupar a tela toda/ fixed para nao ter scroll*/}
            
            <Dialog.Content className="fixed left-1/2 top-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none "> 
            {/* -translate >  força o elemento a fixar-se no centro da tela - pois por padrao ele se ajuta ao centro baseando pela ponta superior esquerda do objeto */}
              {/* h-[60vh] vh define medida em relação a tela, quando usamos % ele usa como base o tamanho do elemento pai */}
             

             <Dialog.Close className=" absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 ">
            <X className="size-5 hover:text-slate-100"/>
             </Dialog.Close>


             <form onSubmit={HandleSaveNote} className=" flex-1 flex flex-col">
             {/* on submit > criando um evendo para salvar as notas */}

              <div className="flex flex-1 flex-col gap-3 p-5 ">
                
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
                </span>




            

               {ShouldShowOnboarding ? (
                 /* se a variaver for (true'?') */
                 
                 <p className="text-sm leading-6 text-slate-400">
              Comece <button className=" font-medium text-lime-500 hover:underline ">gravando uma nota </button> em áudio ou se preferir <button onClick={HandleStartEdition} className= "font-medium text-lime-500 hover:underline"> ultilize apenas texto.</button>
               </p>
               ) : ( 
                 /* se não faça  */
                 <textarea autoFocus className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                 onChange={handleContenChange} /*criando um evento para voltar o modal para 
                 a tela de seleção caso o usuario apague tudo que escreveu/* 
                 
                 obs:
                 ao passar o
                 mouse por cima de onchange voce consegue ver o nome do evento para passar como 
                 paremetro na função que ira executar o evento */
                 />
                 )}

       
                </div> 
               
                <button
               type="submit"
               className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
               >
                    <span className="text-slate-700 font-bold group-hover:underline ">Salvar nota</span> 
                    { /* group > para aplicar um estilo em um elemento e para que ele seja acionado ao interagir
                     a partir do elemento pai e nao somente quando chegar no elemento filho, settamos a propriedade group no elemento pai e no filho*/}
              </button>
                     </form>
             
              </Dialog.Content> {/* .content > determina o que irá aparecer quando eu clicar no modal*/}
           </Dialog.Portal>
       </Dialog.Root>

  );
}


/* função cards-Notes   */

export function Notecard({note}: NoteCardProps){
return (
          /* passando para o root / elemento raiz da nossa aplicação - html */
 <Dialog.Root>
    
    <Dialog.Trigger /* seleciona o elemento no qual eu quero que apareça o modal */
     className="text-left flex flex-col rounded-md bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
             {/* hover:ring > funciona como uma borda porem sem modificar o tamanho do elemento*/}
              <span className="text-sm font-medium text-slate-300">
                {note.date.toISOString()}
              </span>

            <p className="text-sm leading-6 text-slate-400">
              {note.content}
             </p>
             
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"/>
              
          </Dialog.Trigger>

          <Dialog.Portal> {/* permite exibir o elemento fora do conteinei/ exibindo no body, na raiz da minha aplicação/assim sobrepondo a tela  */}
           
           <Dialog.Overlay className="inset-0 fixed bg-black/50"/> {/* overlay > adiciona o efeito do modal, de estar por cima da aplicação/ inset-0 > para ocupar a tela toda/ fixed para nao ter scroll*/}
            
            <Dialog.Content className="fixed left-1/2 top-1/2 overflow-hidden -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none "> 
            {/* -translate >  força o elemento a fixar-se no centro da tela - pois por padrao ele se ajuta ao centro baseando pela ponta superior esquerda do objeto */}
              {/* h-[60vh] vh define medida em relação a tela, quando usamos % ele usa como base o tamanho do elemento pai */}
             
             <Dialog.Close className=" absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 ">
            <X className="size-5 hover:text-slate-100"/>
             </Dialog.Close>

              <div className="flex flex-1 flex-col gap-3 p-5">
                
              <span className="text-sm font-medium text-slate-300">

                {/* formatDistance > lib importada atraves do comando > npm i date-fns */}
                {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})} 
                {/*paçando a lib atraves do nó e exibindo o valor/ add suffix > exibe ago > "atrás"   */}
              
              </span>
           
            <p className="text-sm leading-6 text-slate-400">
              {note.content}
             </p>

          
                
                </div> {/*determina que o elemento pode usar o maximo de espaço que precisar , porem caso ele precise diminuir para acoplar outros elementos não será problema  */}
               
                <button
               type="button"
               className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
              >
                     Deseja <span className="text-red-400 group-hover:underline ">apagar essa nota?</span> 
                    { /* group > para aplicar um estilo em um elemento e para que ele seja acionado ao interagir
                     a partir do elemento pai e nao somente quando chegar no elemento filho, settamos a propriedade group no elemento pai e no filho*/}
              </button>
             
              </Dialog.Content> {/* .content > determina o que irá aparecer quando eu clicar no modal*/}

              
          
          </Dialog.Portal>
       
       
       </Dialog.Root>                             




    


);

}