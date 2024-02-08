interface NoteCardProps{
  
/*crio 1 propriedade para receber 2 props/ com chaves indico que é um objeto e recebo as duas propriedades */
    note: { 
    date: Date
    content: string
     }
}


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




export function Notecard({note}: NoteCardProps){
return (
                                        /* hover:ring > funciona como uma borda porem sem modificar o tamanho do elemento*/
    <button
     className="text-left flex flex-col rounded-md bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
              há 2 dias...
              <span className="text-sm font-medium text-slate-300">
                {note.date.toISOString()}
              
              </span>
            <p className="text-sm leading-6 text-slate-400">
              {note.content}
             
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"/>
              
          </button>




    


);

}