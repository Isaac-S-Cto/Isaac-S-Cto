/* importando radix dialog - instalado atraves das informações do site radix.ui , executando no terminal o comando npm  */
/* criando variavel Dialog para receber a importação  */
import * as Dialog from '@radix-ui/react-dialog'
import {formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface NoteCardProps{ /* criando uma propriedade global*/
  
/*crio 1 propriedade para receber 2 props/ com chaves indico que é um objeto e recebo as duas propriedades */
    note: { 
    date: Date
    content: string
     }
}

/* função Card-Pricipal ADD NOTA  */
export function NewNoteCard(){
  return (
    <div className="rounded-md bg-slate-700 p-5 space-y-6">
      <span className="text-sm font-medium text-slate-200">
        Adicionar nota...
        </span>
      <p className="text-sm leading-6 text-slate-400">
        Grave uma nota em audio e sera convertida automaticamente para texto.
        </p>
    </div>
    

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
            
            <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2  -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none "> 
            {/* -translate >  força o elemento a fixar-se no centro da tela - pois por padrao ele se ajuta ao centro baseando pela ponta superior esquerda do objeto */}
              {/* h-[60vh] vh define medida em relação a tela, quando usamos % ele usa como base o tamanho do elemento pai */}
             
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
               className="w-full bg-slate-800 py-4 text-center text-sm outline-none"
              >
                     Deseja apagar essa nota?
              </button>
             
              </Dialog.Content> {/* .content > determina o que irá aparecer quando eu clicar no modal*/}

              
          
          </Dialog.Portal>
       
       
       </Dialog.Root>                             




    


);

}