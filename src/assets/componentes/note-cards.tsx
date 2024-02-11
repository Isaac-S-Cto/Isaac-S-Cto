/* importando radix -> lib de componentes >dialog - instalado atraves das informações do site radix.ui , executando no terminal o comando npm  */
/* criando variavel Dialog para receber a importação  */
import * as Dialog from '@radix-ui/react-dialog'
import {formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
/* lucile > lib -> importação de icons */
import {X} from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'

/* lib para msg de alerta na tela */
import { toast } from 'sonner'


interface NoteCardProps{ /* criando uma propriedade global*/
  
/*crio 1 propriedade para receber 2 props/ com chaves indico que é um objeto e recebo as duas propriedades */
    note: { 
      id: string
    date: Date
    content: string
     }
    onNoteDeleted: (id:string) => void
}
interface NewNoteCardProps{
  onNoteCreated: (content: string) => void /* informando que newNotes recebera
   um valor vazia da nossa funçao - onNote created e seu conteudo 
   sera chamado na função handleSaveNotes */
}


let speechRecognition: SpeechRecognition | null = null


export function NewNoteCard({onNoteCreated}: NewNoteCardProps) {
/* função Card-Pricipal ADD NOTA  */    



  const [ShouldShowOnboarding, setShouldShowOnboarding] = useState(true) /* criando variavel*/
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false);
  /* usestate > criando um estado > variavel booleana > o usestate cria um array > que na linha recebe as 2 variaveis criadas que ocupam a 1 e 2 pos do array*/
  
  function HandleStartEdition(){
    /* criando a função que receberá o valor de falso quando o usuario clicar no button para inserir informação <input> */
    setShouldShowOnboarding(false);
  }

  /* função do evento criado dentro do modal TEXT AREA/ passando variaveis do tipo boolean  */
  function handleContentChange(event:ChangeEvent<HTMLTextAreaElement>){ /* value(HTML-TEXT-AREA-ELEMENT) > é necessario expecificar pois o evento onchange nao é especifico da text area, pode vir de varios elemento do html */ 

  setContent(event.target.value) /* passando valores do evento submit(Savar notas) atraves das variaveis/ 
content <= recera o valor de submit */
  if (event.target.value === ''){
setShouldShowOnboarding(false)


  }
}


/* função de criação de notas*/
function HandleSaveNote(event:FormEvent){
  event.preventDefault()

  if ( content === '') {
    return 
  }

 


  onNoteCreated(content)
  setContent('') /*resetando o conteudo da minha text area */
setShouldShowOnboarding(true) /* mostrar a tela de adicionar nota por audio ou texto após salvar uma nota */
toast.success('nota criada com sucesso')


}

  
function handleStartRecording(){


const isSpeechRecognationAPIAvailable = 'isSpeechRecognation' in window
|| 'webkitSpeechRecognition' in window

if(!isSpeechRecognationAPIAvailable ){
alert('browser Not suported API recordin')
return
}
setIsRecording(true)
setShouldShowOnboarding(false)

const SpeechReconitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
 
speechRecognition = new SpeechReconitionAPI()


speechRecognition.lang = 'pt-BR' /* idioma do gravador*/
speechRecognition.continuous = true /* gravá continuamente ate voce interromper a gravação*/
speechRecognition.maxAlternatives = 1 /* só trara uma opção de palavra */
speechRecognition.interimResults = true /*trará resultados em tempo real, e nao apenas quando parar de falar */

speechRecognition.onresult = (event) => {
  const transcription = Array.from (event.results).reduce((text, result) => {
    return text.concat(result[0].transcript)

  },'')
  setContent(transcription)
}
speechRecognition.onerror = (event) => {
  console.error(event)

}
speechRecognition.start()
}

function handleStopRecording(){
  
  setIsRecording(false)
  
  if (speechRecognition != null){
speechRecognition.stop()
  }
  
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
            
            <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 overflow-hidden md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none "> 
            {/* -translate >  força o elemento a fixar-se no centro da tela - pois por padrao ele se ajuta ao centro baseando pela ponta superior esquerda do objeto */}
              {/* h-[60vh] vh define medida em relação a tela, quando usamos % ele usa como base o tamanho do elemento pai */}
             
            
            

             <Dialog.Close 
             className=" absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 ">
            < X className="size-5 hover:text-slate-100"/>
               </Dialog.Close>


             <form className=" flex-1 flex flex-col">
             {/* on submit > criando um evendo para salvar as notas */}

              <div className="flex flex-1 flex-col gap-3 p-5 ">
                
              <span className="text-sm font-medium text-slate-300">
                Adicionar nota
                </span>




            

               {ShouldShowOnboarding ? (
                 /* se a variaver for (true'?') */
                 
                 <p className="text-sm leading-6 text-slate-400">
              Comece <button type="button" onClick={handleStartRecording} className= "font-medium text-lime-500 hover:underline">
                gravando uma nota </button> em áudio ou se preferir <button type="button" onClick={HandleStartEdition} className= "font-medium text-lime-500 hover:underline"> ultilize apenas texto.</button>
               </p>
               ) : ( 
                 /* se não faça  */
                 <textarea 
                 autoFocus className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                 
                 onChange={handleContentChange} 
                 value={content}
                 
                 /*onchance > esta observando toda mudança e salvando dentro do meu content:(useState) na NewNoteCard */ /*criando um evento para voltar o modal para 
                 a tela de seleção caso o usuario apague tudo que escreveu/* 
                 
                 obs:
                 ao passar o
                 mouse por cima de onchange voce consegue ver o nome do evento para passar como 
                 paremetro na função que ira executar o evento */
                 />
                 )}

       
                </div> 

                {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
              >


                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={HandleSaveNote}
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}




/* função cards-Notes   */

export function Notecard({note, onNoteDeleted}: NoteCardProps){
return (
          /* passando para o root / elemento raiz da nossa aplicação - html */
 <Dialog.Root>
    
    <Dialog.Trigger /* seleciona o elemento no qual eu quero que apareça o modal */
     className="text-left flex flex-col rounded-md bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
             {/* hover:ring > funciona como uma borda porem sem modificar o tamanho do elemento*/}
             
              <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, {locale: ptBR, addSuffix: true})} 
              </span>

            <p className="text-sm leading-6 text-slate-400">
              {note.content}
             </p>
             
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"/>
              
          </Dialog.Trigger>

          <Dialog.Portal> {/* permite exibir o elemento fora do conteinei/ exibindo no body, na raiz da minha aplicação/assim sobrepondo a tela  */}
           
           <Dialog.Overlay className="inset-0 fixed bg-black/50"/> {/* overlay > adiciona o efeito do modal, de estar por cima da aplicação/ inset-0 > para ocupar a tela toda/ fixed para nao ter scroll*/}
            
            <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 overflow-hidden md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none "> 
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
               onClick=  {() => onNoteDeleted(note.id)}
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
