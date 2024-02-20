const main = ReactDOM.createRoot(document.getElementById('main'));



function Contact(p) {
    const [name,setName] = React.useState(p.name)
    const [phone,setPhone] = React.useState(p.phone)
    const [editMode, setEditMode] = React.useState(false)
    const removeEvent = (id) => {
        p.event(p.clist.filter(i=>i.id!==id))
    };
    const updateEvent = () => {
        let index = p.clist.findIndex(i=>i.id == p.id)
        const updatedClist = p.clist
        updatedClist[index].name=name
        updatedClist[index].phone=phone
        p.event(updatedClist);
        setEditMode(false);
    }
    return (
        <div className="contact-card" onDoubleClick={()=>{setEditMode(true)}}>
        {editMode? 
        (
        <>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); } } />
            <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value); } } />
            <button onClick={()=>updateEvent()}>Save</button>
        </>
        )
        :(
        <>
            <div>{p.id}</div>
            <div>{name}</div>
            <div>{phone}</div>
            <div className="trashbin" onClick={()=>{removeEvent(p.id)}}>🗑️</div>
        </>
        )}
        </div>
    )
}


function SearchField(p) {
    const inputSearchEvent = (query) => {
        let result = p.clist.filter(i=>i.name.startsWith(query))
        query?p.event(result):p.event(backupClist)
    }
    return (
        <input placeholder="search.." onInput={(e)=>{inputSearchEvent(e.target.value)}} />
    )
}


function AddField(p) {
    const [name,setName] = React.useState("")
    const [phone,setPhone] = React.useState("")
    const addClickEvent = () => {
        if (name != "" && phone != ""){
            p.event([...p.clist,{name:name,phone:phone, id:p.clist.length>0?p.clist[p.clist.length-1].id+1:0}]);
            setName("")
            setPhone("")
        }
    }
    return (
        <div id="add-contact">
            <input type="text" value={name} onChange={(e) => { setName(e.target.value); } } />
            <input type="text" value={phone} onChange={(e) => { setPhone(e.target.value); } } />
            <button onClick={()=>addClickEvent()}>Add</button>
        </div>
    )
}


function Contacts(p) {
    const [cList,cListSet] = React.useState(p.clist || [])
    React.useEffect(()=>{
        localStorage.setItem("clist",JSON.stringify(cList))
    },[cList])
    return (
        <>
        <SearchField clist={cList} event={cListSet} />
        <AddField clist={cList} event={cListSet} />
        <div id="contacts">
            {cList.map(contact => <Contact name={contact.name} phone={contact.phone} id={contact.id} event={cListSet} clist={cList} />)}
        </div>
        </>
    )
}




main.render(<Contacts clist={JSON.parse(localStorage.getItem("clist"))} />)

